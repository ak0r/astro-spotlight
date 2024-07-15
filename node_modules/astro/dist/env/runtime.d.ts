import { AstroError, AstroErrorData } from '../core/errors/index.js';
export { validateEnvVariable } from './validators.js';
export type GetEnv = (key: string) => string | undefined;
export declare function setGetEnv(fn: GetEnv, reset?: boolean): void;
declare let _onSetGetEnv: (reset: boolean) => void;
export declare function setOnSetGetEnv(fn: typeof _onSetGetEnv): void;
export declare function getEnv(...args: Parameters<GetEnv>): string | undefined;
export declare function createInvalidVariableError(...args: Parameters<typeof AstroErrorData.EnvInvalidVariable.message>): AstroError;
