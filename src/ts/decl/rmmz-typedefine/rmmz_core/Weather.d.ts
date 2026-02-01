/**
 * The weather effect which displays rain, storm, or snow.
 *
 * @class
 * @extends PIXI.Container
 */
declare class Weather extends PIXI.Container {
    type: string;
    power: number;
    origin: Point;
    viewport: Bitmap;
    protected _width: number;
    protected _height: number;
    protected _sprites: IWeatherSprite[];
    protected _rainBitmap: Bitmap;
    protected _stormBitmap: Bitmap;
    protected _snowBitmap: Bitmap;
    protected _dimmerSprite: ScreenSprite;
    constructor(...args: any[]);
    initialize(): void;
    /**
     * Destroys the weather.
     */
    destroy(): void;
    /**
     * Updates the weather for each frame.
     */
    update(): void;
    _createBitmaps(): void;
    _createDimmer(): void;
    _updateDimmer(): void;
    _updateAllSprites(): void;
    _addSprite(): void;
    _removeSprite(): void;
    _updateSprite(sprite: IWeatherSprite): void;
    _updateRainSprite(sprite: IWeatherSprite): void;
    _updateStormSprite(sprite: IWeatherSprite): void;
    _updateSnowSprite(sprite: IWeatherSprite): void;
    _rebornSprite(sprite: IWeatherSprite): void;
}
interface IWeatherSprite extends Sprite {
    ax: number;
    ay: number;
}
