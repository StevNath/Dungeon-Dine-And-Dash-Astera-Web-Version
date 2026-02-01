/**
 * This section contains some methods that will be added to the standard
 * Javascript objects.
 *
 * @namespace JsExtensions
 */
interface Array<T> {
    clone(): Array<T>;
    equals(array: Array<any>): boolean;
    remove(element: T): void;
    contains(element: T): boolean;
}
interface Math {
    randomInt(max: number): number;
}
interface Number {
    clamp(min: number, max: number): number;
    mod(n: number): number;
    padZero(length: number): string;
}
interface String {
    format(...args: any): string;
    padZero(length: number): string;
    contains(string: string): boolean;
}
