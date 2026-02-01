/**
 * The basic object that is rendered to the game screen.
 *
 * @class
 * @extends PIXI.Sprite
 * @param {Bitmap} bitmap - The image for the sprite.
 */
declare class Sprite extends PIXI.Sprite {
    z?: number;
    spriteId: number;
    protected _bitmap: any;
    protected _frame: Rectangle;
    protected _hue: number;
    protected _blendColor: ColorType;
    protected _colorTone: ToneType;
    protected _colorFilter: ColorFilter | null;
    protected _blendMode: PIXI.BLEND_MODES;
    protected _hidden: boolean;
    protected _refreshFrame: boolean;
    constructor();
    constructor(bitmap: Bitmap);
    initialize(...args: any[]): void;
    static _emptyBaseTexture: PIXI.BaseTexture | null;
    static _counter: number;
    /**
     * The image for the sprite.
     *
     * @type Bitmap
     * @name Sprite#bitmap
     */
    get bitmap(): any;
    set bitmap(value: any);
    /**
     * The width of the sprite without the scale.
     *
     * @type number
     * @name Sprite#width
     */
    get width(): number;
    set width(value: number);
    /**
     * The height of the sprite without the scale.
     *
     * @type number
     * @name Sprite#height
     */
    get height(): number;
    set height(value: number);
    /**
     * The opacity of the sprite (0 to 255).
     *
     * @type number
     * @name Sprite#opacity
     */
    get opacity(): number;
    set opacity(value: number);
    /**
     * The blend mode to be applied to the sprite.
     *
     * @type number
     * @name Sprite#blendMode
     */
    get blendMode(): number | PIXI.BLEND_MODES;
    set blendMode(value: number | PIXI.BLEND_MODES);
    /**
     * Destroys the sprite.
     */
    destroy(options?: {
        children?: boolean;
        texture?: boolean;
        baseTexture?: boolean;
    }): void;
    /**
     * Updates the sprite for each frame.
     */
    update(): void;
    /**
     * Makes the sprite "hidden".
     */
    hide(): void;
    /**
     * Releases the "hidden" state of the sprite.
     */
    show(): void;
    /**
     * Reflects the "hidden" state of the sprite to the visible state.
     */
    updateVisibility(): void;
    /**
     * Sets the x and y at once.
     *
     * @param {number} x - The x coordinate of the sprite.
     * @param {number} y - The y coordinate of the sprite.
     */
    move(x: number, y: number): void;
    /**
     * Sets the rectagle of the bitmap that the sprite displays.
     *
     * @param {number} x - The x coordinate of the frame.
     * @param {number} y - The y coordinate of the frame.
     * @param {number} width - The width of the frame.
     * @param {number} height - The height of the frame.
     */
    setFrame(x: number, y: number, width: number, height: number): void;
    /**
     * Sets the hue rotation value.
     *
     * @param {number} hue - The hue value (-360, 360).
     */
    setHue(hue: number): void;
    /**
     * Gets the blend color for the sprite.
     *
     * @returns {array} The blend color [r, g, b, a].
     */
    getBlendColor(): number[];
    /**
     * Sets the blend color for the sprite.
     *
     * @param {array} color - The blend color [r, g, b, a].
     */
    setBlendColor(color: number[]): void;
    /**
     * Gets the color tone for the sprite.
     *
     * @returns {array} The color tone [r, g, b, gray].
     */
    getColorTone(): number[];
    /**
     * Sets the color tone for the sprite.
     *
     * @param {array} tone - The color tone [r, g, b, gray].
     */
    setColorTone(tone: number[]): void;
    _onBitmapChange(): void;
    _onBitmapLoad(bitmapLoaded: Bitmap): void;
    _refresh(): void;
    _createColorFilter(): void;
    _updateColorFilter(): void;
}
