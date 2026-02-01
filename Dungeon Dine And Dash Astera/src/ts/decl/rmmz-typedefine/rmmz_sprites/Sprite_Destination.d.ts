declare class Sprite_Destination extends Sprite {
    protected _frameCount: number;
    initialize(): void;
    destroy(options?: any): void;
    update(): void;
    createBitmap(): void;
    updatePosition(): void;
    updateAnimation(): void;
}
