import { NSStringFunc } from "../declaration/ns-str";
/**
 * Splits `string` into an array of its words.
 *
 * @since 1.1.0
 */
export declare function getWords(str?: string, pattern?: RegExp): RegExpMatchArray;
/**
 *
 * @since 1.1.0
 */
export declare function stringify(value: unknown): string;
/**
 *
 * @since 1.1.0
 */
export declare function getTag(value: unknown): string;
/**
 *
 * @since 1.1.0
 */
export declare function kebabCase(str: string, sep?: string): string;
/**
 *
 * @since 1.1.0
 */
export declare function camelCase(str: string, params?: Partial<NSStringFunc.IParamCamelCase>): string;
/**
 *
 * @since 1.1.0
 */
export declare function upperFirstLetter(str: string): string;
