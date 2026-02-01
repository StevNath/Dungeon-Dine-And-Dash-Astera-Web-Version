declare class Sprite_Animation extends Sprite {
    targetObjects: any[];
    z: number;
    protected _targets: Sprite[];
    protected _animation: any;
    protected _mirror: boolean;
    protected _delay: number;
    protected _previous: any;
    protected _effect: any;
    protected _handle: any;
    protected _playing: boolean;
    protected _started: boolean;
    protected _frameIndex: number;
    protected _maxTimingFrames: number;
    protected _flashColor: number[];
    protected _flashDuration: number;
    protected _viewportSize: number;
    initialize(): void;
    initMembers(): void;
    destroy(options?: any): void;
    setup(targets: Sprite[], animation: Sprite_Animation | Sprite_AnimationMV, mirror: boolean, delay: number, previous: Sprite_Animation | Sprite_AnimationMV | null): void;
    update(): void;
    canStart(): boolean;
    shouldWaitForPrevious(): boolean;
    updateEffectGeometry(): void;
    updateMain(): void;
    processSoundTimings(): void;
    processFlashTimings(): void;
    checkEnd(): void;
    updateFlash(): void;
    isPlaying(): boolean;
    setRotation(x: any, y: any, z: any): void;
    _render(renderer: PIXI.Renderer): void;
    setProjectionMatrix(renderer: {
        view: {
            height: number;
        };
    }): void;
    setCameraMatrix(renderer: PIXI.Renderer): void;
    setViewport(renderer: PIXI.Renderer): void;
    targetPosition(renderer: PIXI.Renderer): Point;
    targetSpritePosition(sprite: Sprite): PIXI.Point;
    resetViewport(renderer: {
        gl: {
            viewport: (arg0: number, arg1: number, arg2: any, arg3: any) => void;
        };
        view: {
            width: any;
            height: any;
        };
    }): void;
    onBeforeRender(renderer: any): void;
    onAfterRender(renderer: any): void;
}
