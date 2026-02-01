/**
 * The static class that carries out graphics processing.
 *
 * @namespace
 */
declare class Graphics {
    static _width: number;
    static _height: number;
    static _defaultScale: number;
    static _realScale: number;
    static _errorPrinter: any;
    static _tickHandler: any;
    static _canvas: any;
    static _fpsCounter: any;
    static _loadingSpinner: any;
    static _stretchEnabled: boolean;
    static _app: any;
    static _effekseer: any;
    static _wasLoading: boolean;
    static frameCount: number;
    static boxWidth: number;
    static boxHeight: number;
    constructor();
    /**
     * Initializes the graphics system.
     *
     * @returns {boolean} True if the graphics system is available.
     */
    static initialize(): boolean;
    /**
     * The PIXI.Application object.
     *
     * @readonly
     * @type PIXI.Application
     * @name Graphics.app
     */
    static get app(): any;
    /**
     * The context object of Effekseer.
     *
     * @readonly
     * @type EffekseerContext
     * @name Graphics.effekseer
     */
    static get effekseer(): any;
    /**
     * Register a handler for tick events.
     *
     * @param {function} handler - The listener function to be added for updates.
     */
    static setTickHandler(handler: (deltaTime: any) => void): void;
    /**
     * Starts the game loop.
     */
    static startGameLoop(): void;
    /**
     * Stops the game loop.
     */
    static stopGameLoop(): void;
    /**
     * Sets the stage to be rendered.
     *
     * @param {Stage} stage - The stage object to be rendered.
     */
    static setStage(stage: Stage | null): void;
    /**
     * Shows the loading spinner.
     */
    static startLoading(): void;
    /**
     * Erases the loading spinner.
     *
     * @returns {boolean} True if the loading spinner was active.
     */
    static endLoading(): boolean;
    /**
     * Displays the error text to the screen.
     *
     * @param {string} name - The name of the error.
     * @param {string} message - The message of the error.
     * @param {Error} [error] - The error object.
     */
    static printError(name: string, message: string, error?: string | null): void;
    /**
     * Displays a button to try to reload resources.
     *
     * @param {function} retry - The callback function to be called when the button
     *                           is pressed.
     */
    static showRetryButton(retry: {
        (): void;
        (): void;
    }): void;
    /**
     * Erases the loading error text.
     */
    static eraseError(): void;
    /**
     * Converts an x coordinate on the page to the corresponding
     * x coordinate on the canvas area.
     *
     * @param {number} x - The x coordinate on the page to be converted.
     * @returns {number} The x coordinate on the canvas area.
     */
    static pageToCanvasX(x: number): number;
    /**
     * Converts a y coordinate on the page to the corresponding
     * y coordinate on the canvas area.
     *
     * @param {number} y - The y coordinate on the page to be converted.
     * @returns {number} The y coordinate on the canvas area.
     */
    static pageToCanvasY(y: number): number;
    /**
     * Checks whether the specified point is inside the game canvas area.
     *
     * @param {number} x - The x coordinate on the canvas area.
     * @param {number} y - The y coordinate on the canvas area.
     * @returns {boolean} True if the specified point is inside the game canvas area.
     */
    static isInsideCanvas(x: number, y: number): boolean;
    /**
     * Shows the game screen.
     */
    static showScreen(): void;
    /**
     * Hides the game screen.
     */
    static hideScreen(): void;
    /**
     * Changes the size of the game screen.
     *
     * @param {number} width - The width of the game screen.
     * @param {number} height - The height of the game screen.
     */
    static resize(width: number, height: number): void;
    /**
     * The width of the game screen.
     *
     * @type number
     * @name Graphics.width
     */
    static get width(): number;
    static set width(value: number);
    /**
     * The height of the game screen.
     *
     * @type number
     * @name Graphics.height
     */
    static get height(): number;
    static set height(value: number);
    /**
     * The default zoom scale of the game screen.
     *
     * @type number
     * @name Graphics.defaultScale
     */
    static get defaultScale(): number;
    static set defaultScale(value: number);
    static _createAllElements(): void;
    static _updateAllElements(): void;
    static _onTick(deltaTime: any): void;
    static _canRender(): boolean;
    static _updateRealScale(): void;
    static _stretchWidth(): number;
    static _stretchHeight(): number;
    static _makeErrorHtml(name?: string | undefined | null, message?: string | undefined | null, error?: string | undefined | null): string;
    static _defaultStretchMode(): boolean;
    static _createErrorPrinter(): void;
    static _updateErrorPrinter(): void;
    static _createCanvas(): void;
    static _updateCanvas(): void;
    static _updateVideo(): void;
    static _createLoadingSpinner(): void;
    static _createFPSCounter(): void;
    static _centerElement(element: any): void;
    static _disableContextMenu(): void;
    static _applyCanvasFilter(): void;
    static _clearCanvasFilter(): void;
    static _setupEventHandlers(): void;
    static _onWindowResize(): void;
    static _onKeyDown(event: {
        ctrlKey: any;
        altKey: any;
        keyCode: any;
        preventDefault: () => void;
    }): void;
    static _switchFPSCounter(): void;
    static _switchStretchMode(): void;
    static _switchFullScreen(): void;
    static _isFullScreen(): any;
    static _requestFullScreen(): void;
    static _cancelFullScreen(): void;
    static _createPixiApp(): void;
    static _setupPixi(): void;
    static _createEffekseerContext(): void;
    static FPSCounter: {
        new (...args: any[]): {
            _tickCount: number;
            _frameTime: number;
            _frameStart: number;
            _lastLoop: number;
            _showFps: boolean;
            fps: number;
            duration: number;
            _boxDiv: any;
            _labelDiv: HTMLDivElement;
            _numberDiv: HTMLDivElement;
            initialize(): void;
            startTick(): void;
            endTick(): void;
            switchMode(): void;
            _createElements(): void;
            _update(): void;
        };
    };
}
