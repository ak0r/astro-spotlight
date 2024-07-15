import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import { AstroError, AstroErrorData } from "../core/errors/index.js";
import {
  ENV_TYPES_FILE,
  MODULE_TEMPLATE_URL,
  TYPES_TEMPLATE_URL,
  VIRTUAL_MODULES_IDS,
  VIRTUAL_MODULES_IDS_VALUES
} from "./constants.js";
import { getEnvFieldType, validateEnvVariable } from "./validators.js";
function astroEnv({
  settings,
  mode,
  fs
}) {
  if (!settings.config.experimental.env) {
    return;
  }
  const schema = settings.config.experimental.env.schema ?? {};
  let templates = null;
  return {
    name: "astro-env-plugin",
    enforce: "pre",
    buildStart() {
      const loadedEnv = loadEnv(
        mode === "dev" ? "development" : "production",
        fileURLToPath(settings.config.root),
        ""
      );
      for (const [key, value] of Object.entries(loadedEnv)) {
        if (value !== void 0) {
          process.env[key] = value;
        }
      }
      const validatedVariables = validatePublicVariables({ schema, loadedEnv });
      const clientTemplates = getClientTemplates({ validatedVariables });
      const serverTemplates = getServerTemplates({ validatedVariables, schema, fs });
      templates = {
        client: clientTemplates.module,
        server: serverTemplates.module,
        internal: `export const schema = ${JSON.stringify(schema)};`
      };
      generateDts({
        settings,
        fs,
        content: getDts({
          fs,
          client: clientTemplates.types,
          server: serverTemplates.types
        })
      });
    },
    buildEnd() {
      templates = null;
    },
    resolveId(id) {
      if (VIRTUAL_MODULES_IDS_VALUES.has(id)) {
        return resolveVirtualModuleId(id);
      }
    },
    load(id, options) {
      if (id === resolveVirtualModuleId(VIRTUAL_MODULES_IDS.client)) {
        return templates.client;
      }
      if (id === resolveVirtualModuleId(VIRTUAL_MODULES_IDS.server)) {
        if (options?.ssr) {
          return templates.server;
        }
        throw new AstroError({
          ...AstroErrorData.ServerOnlyModule,
          message: AstroErrorData.ServerOnlyModule.message(VIRTUAL_MODULES_IDS.server)
        });
      }
      if (id === resolveVirtualModuleId(VIRTUAL_MODULES_IDS.internal)) {
        return templates.internal;
      }
    }
  };
}
function resolveVirtualModuleId(id) {
  return `\0${id}`;
}
function generateDts({
  content,
  settings,
  fs
}) {
  fs.mkdirSync(settings.dotAstroDir, { recursive: true });
  fs.writeFileSync(new URL(ENV_TYPES_FILE, settings.dotAstroDir), content, "utf-8");
}
function validatePublicVariables({
  schema,
  loadedEnv
}) {
  const valid = [];
  const invalid = [];
  for (const [key, options] of Object.entries(schema)) {
    if (options.access !== "public") {
      continue;
    }
    const variable = loadedEnv[key];
    const result = validateEnvVariable(variable === "" ? void 0 : variable, options);
    if (result.ok) {
      valid.push({ key, value: result.value, type: result.type, context: options.context });
    } else {
      invalid.push({ key, type: result.type });
    }
  }
  if (invalid.length > 0) {
    throw new AstroError({
      ...AstroErrorData.EnvInvalidVariables,
      message: AstroErrorData.EnvInvalidVariables.message(
        invalid.map(({ key, type }) => `Variable ${key} is not of type: ${type}.`).join("\n")
      )
    });
  }
  return valid;
}
function getDts({
  client,
  server,
  fs
}) {
  const template = fs.readFileSync(TYPES_TEMPLATE_URL, "utf-8");
  return template.replace("// @@CLIENT@@", client).replace("// @@SERVER@@", server);
}
function getClientTemplates({
  validatedVariables
}) {
  let module = "";
  let types = "";
  for (const { key, type, value } of validatedVariables.filter((e) => e.context === "client")) {
    module += `export const ${key} = ${JSON.stringify(value)};`;
    types += `export const ${key}: ${type};	
`;
  }
  return {
    module,
    types
  };
}
function getServerTemplates({
  validatedVariables,
  schema,
  fs
}) {
  let module = fs.readFileSync(MODULE_TEMPLATE_URL, "utf-8");
  let types = "";
  let onSetGetEnv = "";
  for (const { key, type, value } of validatedVariables.filter((e) => e.context === "server")) {
    module += `export const ${key} = ${JSON.stringify(value)};`;
    types += `export const ${key}: ${type};	
`;
  }
  for (const [key, options] of Object.entries(schema)) {
    if (!(options.context === "server" && options.access === "secret")) {
      continue;
    }
    types += `export const ${key}: ${getEnvFieldType(options)};		
`;
    module += `export let ${key} = _internalGetSecret(${JSON.stringify(key)});
`;
    onSetGetEnv += `${key} = reset ? undefined : _internalGetSecret(${JSON.stringify(key)});
`;
  }
  module = module.replace("// @@ON_SET_GET_ENV@@", onSetGetEnv);
  return {
    module,
    types
  };
}
export {
  astroEnv
};
