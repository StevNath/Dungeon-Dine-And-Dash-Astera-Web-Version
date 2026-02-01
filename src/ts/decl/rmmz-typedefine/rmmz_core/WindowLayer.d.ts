/**
 * The layer which contains game windows.
 *
 * @class
 * @extends PIXI.Container
 */
declare class WindowLayer extends PIXI.Container {
    constructor();
    initialize(): void;
    /**
     * Updates the window layer for each frame.
     */
    update(): void;
    /**
     * Renders the object using the WebGL renderer.
     *
     * @param {PIXI.Renderer} renderer - The renderer.
     */
    render(renderer: PIXI.Renderer): void;
}
