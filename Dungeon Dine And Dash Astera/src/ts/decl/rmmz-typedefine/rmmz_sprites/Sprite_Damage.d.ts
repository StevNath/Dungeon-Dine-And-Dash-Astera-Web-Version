declare class Sprite_Damage extends Sprite {
    protected _duration: number;
    protected _flashColor: number[];
    protected _flashDuration: number;
    protected _colorType: number;
    initialize(): void;
    destroy(options?: any): void;
    setup(target: Game_Battler): void;
    setupCriticalEffect(): void;
    fontFace(): string;
    fontSize(): number;
    damageColor(): "#ffffff" | "#b9ffb5" | "#ffff90" | "#80b0ff" | "#808080";
    outlineColor(): string;
    outlineWidth(): number;
    createMiss(): void;
    createDigits(value: number): void;
    createChildSprite(width: number, height: number): IDamageSprite;
    createBitmap(width: number, height: number): Bitmap;
    update(): void;
    updateChild(sprite: IDamageSprite): void;
    updateFlash(): void;
    updateOpacity(): void;
    isPlaying(): boolean;
}
interface IDamageSprite extends Sprite {
    dy: number;
    ry: number;
}
