declare class Sprite_StateOverlay extends Sprite {
    protected _battler: Game_Battler | null;
    protected _overlayIndex: number;
    protected _animationCount: number;
    protected _pattern: number;
    initialize(): void;
    initMembers(): void;
    loadBitmap(): void;
    setup(battler: Game_Battler): void;
    update(): void;
    animationWait(): number;
    updatePattern(): void;
    updateFrame(): void;
}
