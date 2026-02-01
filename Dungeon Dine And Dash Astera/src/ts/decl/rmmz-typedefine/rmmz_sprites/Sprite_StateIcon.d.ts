declare class Sprite_StateIcon extends Sprite {
    protected _battler: Game_Battler | null;
    protected _iconIndex: number;
    protected _animationCount: number;
    protected _animationIndex: number;
    initialize(): void;
    initMembers(): void;
    loadBitmap(): void;
    setup(battler: Game_Battler): void;
    update(): void;
    animationWait(): number;
    updateIcon(): void;
    shouldDisplay(): boolean | null;
    updateFrame(): void;
}
