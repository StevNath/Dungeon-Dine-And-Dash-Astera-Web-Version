/**
 * The root object of the display tree.
 *
 * @class
 * @extends PIXI.Container
 */
declare class Stage extends PIXI.Container {
    constructor();
    initialize(...args: any[]): void;
    /**
     * Destroys the stage.
     */
    destroy(): void;
}
