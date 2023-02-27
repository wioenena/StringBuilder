// deno-lint-ignore valid-typeof
const isType = (value: unknown, type: Types) => typeof value === type;

export const isString = (value: unknown): value is string =>
  isType(value, "string");
export const isNumber = (value: unknown): value is number =>
  isType(value, "number");
export const isObject = (
  value: unknown,
): value is ObjectTypes => isType(value, "object");
export const isByte = (value: unknown): value is number =>
  isNumber(value) && value >= 0 && value <= 255;
export const isFunction = (value: unknown): value is Func =>
  isType(value, "function");
export const isUndefined = (value: unknown): value is undefined =>
  isType(value, "undefined");
export const isNull = (value: unknown): value is null => value === null;

type Types =
  | "bigint"
  | "boolean"
  | "function"
  | "number"
  | "object"
  | "string"
  | "symbol"
  | "undefined";

export type ObjectTypes =
  | Array<unknown>
  | { new (): unknown }
  | Record<PropertyKey, unknown>;

export type Func = (...args: unknown[]) => unknown;
