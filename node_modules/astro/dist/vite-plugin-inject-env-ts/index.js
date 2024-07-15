import path from "node:path";
import { fileURLToPath } from "node:url";
import { bold } from "kleur/colors";
import { normalizePath } from "vite";
import { ACTIONS_TYPES_FILE } from "../actions/consts.js";
import { CONTENT_TYPES_FILE } from "../content/consts.js";
import {} from "../core/logger/core.js";
import { ENV_TYPES_FILE } from "../env/constants.js";
function getEnvTsPath({ srcDir }) {
  return new URL("env.d.ts", srcDir);
}
function astroInjectEnvTsPlugin({
  settings,
  logger,
  fs
}) {
  return {
    name: "astro-inject-env-ts",
    // Use `post` to ensure project setup is complete
    // Ex. `.astro` types have been written
    enforce: "post",
    async config() {
      await setUpEnvTs({ settings, logger, fs });
    }
  };
}
function getDotAstroTypeReference({
  settings,
  filename
}) {
  const relativePath = normalizePath(
    path.relative(
      fileURLToPath(settings.config.srcDir),
      fileURLToPath(new URL(filename, settings.dotAstroDir))
    )
  );
  return `/// <reference path=${JSON.stringify(relativePath)} />`;
}
async function setUpEnvTs({
  settings,
  logger,
  fs
}) {
  const envTsPath = getEnvTsPath(settings.config);
  const envTsPathRelativetoRoot = normalizePath(
    path.relative(fileURLToPath(settings.config.root), fileURLToPath(envTsPath))
  );
  const injectedTypes = [
    {
      filename: CONTENT_TYPES_FILE,
      meetsCondition: () => fs.existsSync(new URL(CONTENT_TYPES_FILE, settings.dotAstroDir))
    },
    {
      filename: ACTIONS_TYPES_FILE,
      meetsCondition: () => fs.existsSync(new URL(ACTIONS_TYPES_FILE, settings.dotAstroDir))
    }
  ];
  if (settings.config.experimental.env) {
    injectedTypes.push({
      filename: ENV_TYPES_FILE
    });
  }
  if (fs.existsSync(envTsPath)) {
    let typesEnvContents = await fs.promises.readFile(envTsPath, "utf-8");
    for (const injectedType of injectedTypes) {
      if (!injectedType.meetsCondition || await injectedType.meetsCondition?.()) {
        const expectedTypeReference = getDotAstroTypeReference({
          settings,
          filename: injectedType.filename
        });
        if (!typesEnvContents.includes(expectedTypeReference)) {
          typesEnvContents = `${expectedTypeReference}
${typesEnvContents}`;
        }
      }
    }
    logger.info("types", `Added ${bold(envTsPathRelativetoRoot)} type declarations.`);
    await fs.promises.writeFile(envTsPath, typesEnvContents, "utf-8");
  } else {
    let referenceDefs = [];
    referenceDefs.push('/// <reference types="astro/client" />');
    for (const injectedType of injectedTypes) {
      if (!injectedType.meetsCondition || await injectedType.meetsCondition?.()) {
        referenceDefs.push(getDotAstroTypeReference({ settings, filename: injectedType.filename }));
      }
    }
    await fs.promises.mkdir(settings.config.srcDir, { recursive: true });
    await fs.promises.writeFile(envTsPath, referenceDefs.join("\n"), "utf-8");
    logger.info("types", `Added ${bold(envTsPathRelativetoRoot)} type declarations`);
  }
}
export {
  astroInjectEnvTsPlugin,
  getEnvTsPath,
  setUpEnvTs
};
