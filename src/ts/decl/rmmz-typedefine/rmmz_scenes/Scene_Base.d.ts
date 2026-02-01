declare class Scene_Base extends Stage {
    protected _started: boolean;
    protected _active: boolean;
    protected _fadeSign: number;
    protected _fadeDuration: number;
    protected _fadeWhite: boolean | number;
    protected _fadeOpacity: number;
    protected _windowLayer: WindowLayer;
    protected _colorFilter: ColorFilter;
    initialize(): void;
    create(): void;
    isActive(): boolean;
    isReady(): boolean;
    start(): void;
    update(): void;
    stop(): void;
    isStarted(): boolean;
    isBusy(): boolean;
    isFading(): boolean;
    terminate(): void;
    createWindowLayer(): void;
    addWindow(window: _Window | Sprite_Button): void;
    startFadeIn(duration: number, white: number | boolean): void;
    startFadeOut(duration: number, white?: number | boolean): void;
    createColorFilter(): void;
    updateColorFilter(): void;
    updateFade(): void;
    updateChildren(): void;
    popScene(): void;
    checkGameover(): void;
    fadeOutAll(): void;
    fadeSpeed(): number;
    slowFadeSpeed(): number;
    scaleSprite(sprite: {
        bitmap: {
            width: number;
            height: number;
        };
        scale: {
            x: number;
            y: number;
        };
    }): void;
    centerSprite(sprite: {
        x: number;
        y: number;
        anchor: {
            x: number;
            y: number;
        };
    }): void;
    isBottomHelpMode(): boolean;
    isBottomButtonMode(): boolean;
    isRightInputMode(): boolean;
    mainCommandWidth(): number;
    buttonAreaTop(): number;
    buttonAreaBottom(): number;
    buttonAreaHeight(): number;
    buttonY(): number;
    calcWindowHeight(numLines: number, selectable: boolean): number;
    requestAutosave(): void;
    isAutosaveEnabled(): boolean;
    executeAutosave(): void;
    onAutosaveSuccess(): void;
    onAutosaveFailure(): void;
}
