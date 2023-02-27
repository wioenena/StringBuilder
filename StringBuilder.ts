import {
  isByte,
  isFunction,
  isNull,
  isNumber,
  isString,
  isUndefined,
  ObjectTypes,
} from "./Utils.ts";

export class StringBuilder implements IToString {
  private value: string;
  public readonly maxCapacity?: number | null;

  /**
   * Creates a new instance of the StringBuilder class with empty string.
   */
  public constructor();
  /**
   * Creates a new instance of the StringBuilder class with the initial value.
   * @param value The initial value.
   */
  public constructor(value: string);
  /**
   * Creates a new instance of the StringBuilder class with the maximum capacity.
   * @param maxCapacity The maximum capacity.
   */
  public constructor(maxCapacity: number);
  /**
   * Creates a new instance of the StringBuilder class with the initial value and the maximum capacity.
   * @param value The initial value.
   * @param maxCapacity The maximum capacity.
   */
  public constructor(value: string, maxCapacity: number);
  public constructor(value?: unknown, maxCapacity?: number) {
    if (isString(value) && isNumber(maxCapacity)) {
      if (value.length > maxCapacity) throw new RangeError("Invalid capacity");
      this.value = value;
      this.maxCapacity = maxCapacity;
    } else {
      this.value = isString(value) ? value : "";
      this.maxCapacity = isNumber(value) ? value : null;
    }
  }

  /**
   * Append a string to the end of the StringBuilder.
   * @param value The string to append.
   */
  public append(value: string): this;
  /**
   * Append a boolean to the end of the StringBuilder.
   * @param value The boolean to append.
   */
  public append(value: boolean): this;
  /**
   * Append a number to the end of the StringBuilder.
   * @param value The number to append.
   * @param valueIsByte Whether the number is a byte.
   */
  public append(value: number, valueIsByte?: boolean): this;
  /**
   * Add an object string to the end of the StringBuilder.
   * @param value The object to append.
   */
  public append(value: ObjectTypes): this;
  /**
   * Add a StringBuilder string to the end of the StringBuilder.
   * @param value The StringBuilder to append.
   */
  public append(value: StringBuilder): this;
  /**
   * Append a value to the end of the StringBuilder.
   * @param value The value to append.
   * @param valueIsByte Whether the value is a byte.
   */
  public append(value: unknown, valueIsByte?: boolean): this;
  public append(value: unknown, valueIsByte = false) {
    const stringValue = this.getString(value, valueIsByte);
    this.validateCapacity(stringValue.length);
    this.value += stringValue;
    return this;
  }

  /**
   * Append a string to the end of the StringBuilder and a new line.
   * @param value The string to append.
   */
  public appendLine(value: string): this;
  /**
   * Append a boolean to the end of the StringBuilder and a new line.
   * @param value The boolean to append.
   */
  public appendLine(value: boolean): this;
  /**
   * Append a number to the end of the StringBuilder and a new line.
   * @param value The number to append.
   * @param valueIsByte Whether the number is a byte.
   */
  public appendLine(value: number, valueIsByte?: boolean): this;
  /**
   * Add an object string to the end of the StringBuilder and a new line.
   * @param value The object to append.
   */
  public appendLine(value: ObjectTypes): this;
  /**
   * Add a StringBuilder string to the end of the StringBuilder and a new line.
   * @param value The StringBuilder to append.
   */
  public appendLine(value: StringBuilder): this;

  /**
   * Append a value to the end of the StringBuilder and a new line.
   * @param value The value to append.
   * @param valueIsByte Whether the value is a byte.
   */
  public appendLine(value: unknown, valueIsByte?: boolean): this;
  public appendLine(value: unknown, valueIsByte = false) {
    this.append(value, valueIsByte);
    return this.append("\n");
  }

  /**
   * Append a string array to the end of the StringBuilder with separator.
   * @param values The string array to append.
   * @param separator The separator.
   */
  public appendJoin(values: string[], separator?: string): this;
  /**
   * Append a boolean array to the end of the StringBuilder with separator.
   * @param values The boolean array to append.
   * @param separator The separator.
   */
  public appendJoin(values: boolean[], separator?: string): this;
  /**
   * Append a number array to the end of the StringBuilder with separator.
   * @param values The number array to append.
   * @param separator The separator.
   * @param valueIsByte Whether the number is a byte.
   */
  public appendJoin(
    values: number[],
    separator?: string,
    valueIsByte?: boolean,
  ): this;
  public appendJoin(values: ObjectTypes[], separator?: string): this;
  /**
   * Append a StringBuilder array to the end of the StringBuilder with separator.
   * @param values The StringBuilder array to append.
   * @param separator The separator.
   */
  public appendJoin(values: StringBuilder[], separator?: string): this;
  /**
   * Append a value array to the end of the StringBuilder with separator.
   * @param values The value array to append.
   * @param separator The separator.
   * @param valueIsByte Whether the value is a byte.
   */
  public appendJoin(
    values: unknown[],
    separator?: string,
    valueIsByte?: boolean,
  ): this;
  public appendJoin(
    values: unknown[],
    separator: string = "," as string,
    valueIsByte = false,
  ) {
    if (values.length === 0) return this;
    this.append(values.shift(), valueIsByte);
    values.forEach((value) => {
      this.append(separator);
      this.append(value, valueIsByte);
    });
    return this;
  }

  /**
   * Insert a string at the specified index.
   * @param index The index to insert at.
   * @param value The string to insert.
   */
  public insert(index: number, value: string): this;
  /**
   * Insert a boolean at the specified index.
   * @param index The index to insert at.
   * @param value The boolean to insert.
   */
  public insert(index: number, value: boolean): this;
  /**
   * Insert a number at the specified index.
   * @param index The index to insert at.
   * @param value The number to insert.
   * @param valueIsByte Whether the number is a byte.
   */
  public insert(index: number, value: number, valueIsByte?: boolean): this;
  /**
   * Insert an object string at the specified index.
   * @param index The index to insert at.
   * @param value The object to insert.
   */
  public insert(index: number, value: ObjectTypes): this;
  /**
   * Insert a StringBuilder string at the specified index.
   * @param index The index to insert at.
   * @param value The StringBuilder to insert.
   */
  public insert(index: number, value: StringBuilder): this;
  /**
   * Insert a value at the specified index.
   * @param index The index to insert at.
   * @param value The value to insert.
   * @param valueIsByte Whether the value is a byte.
   */
  public insert(index: number, value: unknown, valueIsByte?: boolean): this;
  /**
   * Insert a string at the specified index.
   * @param index The index to insert at.
   * @param value The string to insert.
   * @param valueIsByte Whether the value is a byte.
   */
  public insert(index: number, value: unknown, valueIsByte?: boolean): this;
  public insert(index: number, value: unknown, valueIsByte = false) {
    const stringValue = this.getString(value, valueIsByte);
    this.validateCapacity(stringValue.length);
    this.value = this.value.slice(0, index) + stringValue +
      this.value.slice(index);
    return this;
  }

  /**
   * Remove a string at the specified index.
   * @param startIndex The index to start removing at.
   * @param length The length of the string to remove.
   */
  public remove(startIndex: number, length: number): this;
  public remove(startIndex: number, length: number) {
    if (startIndex < 0) throw new Error("Invalid startIndex");
    if (length < 0 || (startIndex + length) > this.length) {
      throw new Error("Invalid length");
    }

    this.value = this.value.slice(0, startIndex) +
      this.value.slice(startIndex + length);
    return this;
  }

  private validateCapacity(targetLength: number) {
    if (this.maxCapacity === null) return;

    if ((this.length + targetLength) > this.maxCapacity!) {
      throw new RangeError("Capacity exceeded");
    }
  }

  private getString(value: unknown, valueIsByte?: boolean) {
    if (isString(value)) return value;
    if (isByte(value) && valueIsByte === true) {
      return String.fromCharCode(value);
    } else {
      if (isUndefined(value)) return "undefined";
      if (isNull(value)) return "null";
      if (
        isFunction((value as ObjectTypes).toString)
      ) {
        return (value as IToString).toString();
      }
      throw new Error("Invalid value");
    }
  }

  /**
   * Convert the StringBuilder to a string.
   * @returns The string.
   */
  public toString() {
    return this.value;
  }

  /**
   * @returns Get the length of the StringBuilder.
   */
  public get length() {
    return this.value.length;
  }
}

export interface IToString {
  toString(): string;
}
