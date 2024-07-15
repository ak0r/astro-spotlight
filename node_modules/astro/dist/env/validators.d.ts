import type { EnvFieldType } from './schema.js';
export type ValidationResultValue = EnvFieldType['default'];
type ValidationResult = {
    ok: true;
    type: string;
    value: ValidationResultValue;
} | {
    ok: false;
    type: string;
};
export declare function getEnvFieldType(options: EnvFieldType): string;
export declare function validateEnvVariable(value: string | undefined, options: EnvFieldType): ValidationResult;
export {};
