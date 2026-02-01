declare class Sprite_Picture extends Sprite_Clickable {
    protected _pictureId: number;
    protected _pictureName: string;
    constructor(pictureId: number);
    initialize(...args: any[]): void;
    picture(): any;
    update(): void;
    updateBitmap(): void;
    updateOrigin(): void;
    updatePosition(): void;
    updateScale(): void;
    updateTone(): void;
    updateOther(): void;
    loadBitmap(): void;
}
