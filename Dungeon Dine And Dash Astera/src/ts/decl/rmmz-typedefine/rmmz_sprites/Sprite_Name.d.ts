declare class Sprite_Name extends Sprite {
    protected _battler: Game_Battler | null;
    protected _name: string;
    protected _textColor: string;
    initialize(): void;
    initMembers(): void;
    destroy(options: any): void;
    createBitmap(): void;
    bitmapWidth(): number;
    bitmapHeight(): number;
    fontFace(): string;
    fontSize(): number;
    setup(battler: Game_Battler): void;
    update(): void;
    updateBitmap(): void;
    name(): string;
    textColor(): string;
    outlineColor(): string;
    outlineWidth(): number;
    redraw(): void;
    setupFont(): void;
}
