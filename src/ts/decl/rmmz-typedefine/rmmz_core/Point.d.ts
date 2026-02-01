/**
 * The point class.
 *
 * @class
 * @extends PIXI.Point
 * @param {number} x - The x coordinate.
 * @param {number} y - The y coordinate.
 */
declare class Point extends PIXI.Point {
    constructor(x?: number, y?: number);
    initialize(x: number, y: number): void;
}
