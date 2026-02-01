/**
 * The tilemap which displays 2D tile-based game map.
 *
 * @class
 * @extends PIXI.Container
 */
declare class Tilemap extends PIXI.Container {
    tileWidth: number;
    tileHeight: number;
    horizontalWrap: boolean;
    verticalWrap: boolean;
    protected _width: number;
    protected _height: number;
    protected _margin: number;
    protected _mapWidth: number;
    protected _mapHeight: number;
    protected _mapData: number[] | null;
    protected _bitmaps: Bitmap[];
    origin: Point;
    flags: number[];
    animationCount: number;
    animationFrame: number;
    protected _needsBitmapsUpdate: boolean;
    protected _needsRepaint: boolean;
    protected _lowerLayer: Tilemap.Layer;
    protected _upperLayer: Tilemap.Layer;
    protected _lastAnimationFrame: number;
    protected _lastStartX: number;
    protected _lastStartY: number;
    constructor(...args: any[]);
    initialize(): void;
    /**
     * The width of the tilemap.
     *
     * @type number
     * @name Tilemap#width
     */
    get width(): number;
    set width(value: number);
    /**
     * The height of the tilemap.
     *
     * @type number
     * @name Tilemap#height
     */
    get height(): number;
    set height(value: number);
    /**
     * Destroys the tilemap.
     */
    destroy(): void;
    /**
     * Sets the tilemap data.
     *
     * @param {number} width - The width of the map in number of tiles.
     * @param {number} height - The height of the map in number of tiles.
     * @param {array} data - The one dimensional array for the map data.
     */
    setData(width: number, height: number, data: number[]): void;
    /**
     * Checks whether the tileset is ready to render.
     *
     * @type boolean
     * @returns {boolean} True if the tilemap is ready.
     */
    isReady(): boolean;
    /**
     * Updates the tilemap for each frame.
     */
    update(): void;
    /**
     * Sets the bitmaps used as a tileset.
     *
     * @param {array} bitmaps - The array of the tileset bitmaps.
     */
    setBitmaps(bitmaps: Bitmap[]): void;
    /**
     * Forces to repaint the entire tilemap.
     */
    refresh(): void;
    /**
     * Updates the transform on all children of this container for rendering.
     */
    updateTransform(): void;
    _createLayers(): void;
    _updateBitmaps(): void;
    _addAllSpots(startX: number, startY: number): void;
    _addSpot(startX: number, startY: number, x: number, y: number): void;
    _addSpotTile(tileId: number, dx: number, dy: number): void;
    _addTile(layer: Tilemap.Layer, tileId: number, dx: number, dy: number): void;
    _addNormalTile(layer: Tilemap.Layer, tileId: number, dx: number, dy: number): void;
    _addAutotile(layer: Tilemap.Layer, tileId: number, dx: number, dy: number): void;
    _addTableEdge(layer: Tilemap.Layer, tileId: number, dx: number, dy: number): void;
    _addShadow(layer: Tilemap.Layer, shadowBits: number, dx: number, dy: number): void;
    _readMapData(x: number, y: number, z: number): number;
    _isHigherTile(tileId: number): number;
    _isTableTile(tileId: number): number | false;
    _isOverpassPosition(mx: number, my: number): boolean;
    _sortChildren(): void;
    _compareChildOrder(a: {
        y: number;
        z: number;
        spriteId: number;
    }, b: {
        y: number;
        z: number;
        spriteId: number;
    }): number;
    static TILE_ID_B: number;
    static TILE_ID_C: number;
    static TILE_ID_D: number;
    static TILE_ID_E: number;
    static TILE_ID_A5: number;
    static TILE_ID_A1: number;
    static TILE_ID_A2: number;
    static TILE_ID_A3: number;
    static TILE_ID_A4: number;
    static TILE_ID_MAX: number;
    static isVisibleTile(tileId: number): boolean;
    static isAutotile(tileId: number): boolean;
    static getAutotileKind(tileId: number): number;
    static getAutotileShape(tileId: number): number;
    static makeAutotileId(kind: number, shape: number): number;
    static isSameKindTile(tileID1: number, tileID2: number): boolean;
    static isTileA1(tileId: number): boolean;
    static isTileA2(tileId: number): boolean;
    static isTileA3(tileId: number): boolean;
    static isTileA4(tileId: number): boolean;
    static isTileA5(tileId: number): boolean;
    static isWaterTile(tileId: number): boolean;
    static isWaterfallTile(tileId: number): boolean;
    static isGroundTile(tileId: number): boolean;
    static isShadowingTile(tileId: number): boolean;
    static isRoofTile(tileId: number): boolean;
    static isWallTopTile(tileId: number): boolean;
    static isWallSideTile(tileId: number): boolean;
    static isWallTile(tileId: number): boolean;
    static isFloorTypeAutotile(tileId: number): boolean;
    static isWallTypeAutotile(tileId: number): boolean;
    static isWaterfallTypeAutotile(tileId: number): boolean;
    static FLOOR_AUTOTILE_TABLE: number[][][];
    static WALL_AUTOTILE_TABLE: number[][][];
    static WATERFALL_AUTOTILE_TABLE: number[][][];
}
declare namespace Tilemap {
    class Layer extends PIXI.Container {
        static MAX_GL_TEXTURES: number;
        static VERTEX_STRIDE: number;
        z?: number;
        protected _elements: [number, number, number, number, number, number, number][];
        protected _indexBuffer: any;
        protected _indexArray: Uint16Array | Uint32Array | Float32Array;
        protected _vertexBuffer: any;
        protected _vertexArray: Float32Array;
        protected _vao: any;
        protected _needsTexturesUpdate: boolean;
        protected _needsVertexUpdate: boolean;
        protected _images: (HTMLCanvasElement | HTMLImageElement)[];
        protected _state: any;
        constructor(...args: any[]);
        initialize(): void;
        destroy(): void;
        setBitmaps(bitmaps: Bitmap[]): void;
        clear(): void;
        addRect(setNumber: number, sx: number, sy: number, dx: number, dy: number, w: number, h: number): void;
        render(renderer: PIXI.Renderer): void;
        isReady(): boolean;
        _createVao(): void;
        _updateIndexBuffer(): void;
        _updateVertexBuffer(): void;
    }
    class Renderer extends PIXI.ObjectRenderer {
        protected _shader: any;
        protected _images: never[];
        protected _internalTextures: PIXI.BaseTexture[];
        protected _clearBuffer: Uint8Array;
        constructor(...args: any[]);
        initialize(renderer: PIXI.Renderer): void;
        destroy(): void;
        getShader(): any;
        contextChange(): void;
        _createShader(): PIXI.Shader;
        _createInternalTextures(): void;
        _destroyInternalTextures(): void;
        updateTextures(renderer: PIXI.Renderer, images: any): void;
        bindTextures(renderer: PIXI.Renderer): void;
    }
}
