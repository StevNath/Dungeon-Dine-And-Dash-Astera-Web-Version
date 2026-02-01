import { HitBox } from "./HitBox";

export class Sprite_HitBox extends Sprite {
    protected _hitBox!: HitBox;

    constructor(hitBox: HitBox);

    constructor(...args: []) {
        super(...args);
    }

    initialize(hitBox: HitBox) {
        super.initialize();
        this.initMembers();
        this._hitBox = hitBox;
        this.bitmap = this.createBitmap();
        this.update();
    }

    initMembers() {
        this.anchor.x = 0;
        this.anchor.y = 0;
    }

    createBitmap(): Bitmap {
        const width = this._hitBox.width() * $gameMap.tileWidth();
        const height = this._hitBox.height() * $gameMap.tileHeight();
        const bitmap = new Bitmap(width, height);
        bitmap.fillRect(0, 0, width, height, this._hitBox.hitBoxColor);
        return bitmap;
    }

    hitBox(): HitBox {
        return this._hitBox;
    }

    checkHitBox(hitBox: HitBox): boolean {
        return this._hitBox === hitBox;
    }

    update() {
        super.update();
        this.updatePosition();
        this.updateVisibility();
    }

    updatePosition() {
        this.x = this._hitBox!.screenX();
        this.y = this._hitBox!.screenY();
        this.z = this._hitBox!.screenZ();
    }

    updateVisibility(): void {
        this.visible = this._hitBox.isEnabled();
    }
}
