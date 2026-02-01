declare class Sprite_Timer extends Sprite {
    protected _seconds: number;
    initialize(): void;
    destroy(options?: any): void;
    createBitmap(): void;
    fontFace(): string;
    fontSize(): number;
    update(): void;
    updateBitmap(): void;
    redraw(): void;
    timerText(): string;
    updatePosition(): void;
    updateVisibility(): void;
}
