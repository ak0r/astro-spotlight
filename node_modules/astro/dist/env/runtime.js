import { AstroError, AstroErrorData } from "../core/errors/index.js";
import { validateEnvVariable } from "./validators.js";
let _getEnv = (key) => process.env[key];
function setGetEnv(fn, reset = false) {
  _getEnv = fn;
  _onSetGetEnv(reset);
}
let _onSetGetEnv = (reset) => {
};
function setOnSetGetEnv(fn) {
  _onSetGetEnv = fn;
}
function getEnv(...args) {
  return _getEnv(...args);
}
function createInvalidVariableError(...args) {
  return new AstroError({
    ...AstroErrorData.EnvInvalidVariable,
    message: AstroErrorData.EnvInvalidVariable.message(...args)
  });
}
export {
  createInvalidVariableError,
  getEnv,
  setGetEnv,
  setOnSetGetEnv,
  validateEnvVariable
};
