function getEnvFieldType(options) {
  const optional = options.optional ? options.default !== void 0 ? false : true : false;
  let type;
  if (options.type === "enum") {
    type = options.values.map((v) => `'${v}'`).join(" | ");
  } else {
    type = options.type;
  }
  return `${type}${optional ? " | undefined" : ""}`;
}
const stringValidator = ({ max, min, length, url, includes, startsWith, endsWith }) => (input) => {
  let valid = typeof input === "string";
  if (valid && max !== void 0) {
    valid = input.length <= max;
  }
  if (valid && min !== void 0) {
    valid = input.length >= min;
  }
  if (valid && length !== void 0) {
    valid = input.length === length;
  }
  if (valid && url !== void 0) {
    try {
      new URL(input);
    } catch (_) {
      valid = false;
    }
  }
  if (valid && includes !== void 0) {
    valid = input.includes(includes);
  }
  if (valid && startsWith !== void 0) {
    valid = input.startsWith(startsWith);
  }
  if (valid && endsWith !== void 0) {
    valid = input.endsWith(endsWith);
  }
  return {
    valid,
    parsed: input
  };
};
const numberValidator = ({ gt, min, lt, max, int }) => (input) => {
  const num = parseFloat(input ?? "");
  let valid = !isNaN(num);
  if (valid && gt !== void 0) {
    valid = num > gt;
  }
  if (valid && min !== void 0) {
    valid = num >= min;
  }
  if (valid && lt !== void 0) {
    valid = num < lt;
  }
  if (valid && max !== void 0) {
    valid = num <= max;
  }
  if (valid && int !== void 0) {
    const isInt = Number.isInteger(num);
    valid = int ? isInt : !isInt;
  }
  return {
    valid,
    parsed: num
  };
};
const booleanValidator = (input) => {
  const bool = input === "true" ? true : input === "false" ? false : void 0;
  return {
    valid: typeof bool === "boolean",
    parsed: bool
  };
};
const enumValidator = ({ values }) => (input) => {
  return {
    valid: typeof input === "string" ? values.includes(input) : false,
    parsed: input
  };
};
function selectValidator(options) {
  switch (options.type) {
    case "string":
      return stringValidator(options);
    case "number":
      return numberValidator(options);
    case "boolean":
      return booleanValidator;
    case "enum":
      return enumValidator(options);
  }
}
function validateEnvVariable(value, options) {
  const validator = selectValidator(options);
  const type = getEnvFieldType(options);
  if (options.optional || options.default !== void 0) {
    if (value === void 0) {
      return {
        ok: true,
        value: options.default,
        type
      };
    }
  }
  const { valid, parsed } = validator(value);
  if (valid) {
    return {
      ok: true,
      value: parsed,
      type
    };
  }
  return {
    ok: false,
    type
  };
}
export {
  getEnvFieldType,
  validateEnvVariable
};
