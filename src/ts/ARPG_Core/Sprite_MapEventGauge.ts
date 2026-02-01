import { ICommonGaugeConfig, Sprite_CommonGauge } from "./Sprite_CommonGauge";

export class Sprite_MapEventGauge extends Sprite_CommonGauge {
    static _update = Sprite_CommonGauge.prototype.update;
    static _createBitmap = Sprite_CommonGauge.prototype.createBitmap;

    inner!: Point;
    private _characterSprite!: Sprite_Character;
    private _position!: "up" | "down";
    private _yOffset!: number;
    private _currentBitmapWidth!: number;

    constructor(characterSprite: Sprite_Character, position: "up" | "down", yOffset: number, height: number, config: ICommonGaugeConfig);

    constructor(...args: any[]) {
        super(...args as [number, number, ICommonGaugeConfig]);
    }

    initialize(...args: any[]): void {
        const [characterSprite, position, yOffset, height, config] = args as [Sprite_Character, "up" | "down", number, number, ICommonGaugeConfig];
        this._characterSprite = characterSprite;
        this._position = position;
        this._yOffset = yOffset;
        let width = this._characterSprite.spriteWidth();
        width = width > 48 ? this._characterSprite.spriteWidth() : 48;
        super.initialize(width, height, config);
    }

    initMembers() {
        super.initMembers();
        this.anchor.x = 0.5;
        if (this._position === "up") {
            this.anchor.y = 1;
        } else {
            this.anchor.y = 0;
        }
        this.inner = new Point();
        this.inner.x = 0;
        if (this._position === "up") {
            let height = this._characterSprite.spriteHeight();
            height = height > 48 ? this._characterSprite.spriteHeight() : 48;
            this.inner.y = -height + this._yOffset;
        } else {
            this.inner.y = this._yOffset;
        }
        this._currentBitmapWidth = 0;
    }

    redraw() {
        this.bitmap.clear();
        const currentValue = this.currentValue();
        if (!isNaN(currentValue)) {
            this.drawGauge();
        }
    }

    update(): void {
        Sprite_MapEventGauge._update.call(this);
        if (this._currentBitmapWidth !== this.bitmapWidth()) {
            this.bitmap?.destroy();
            this.createBitmap();
        }
        if (this._position === "up") {
            let height = this._characterSprite.spriteHeight();
            height = height > 48 ? this._characterSprite.spriteHeight() : 48;
            this.inner.y = -height + this._yOffset;
        } else {
            this.inner.y = this._yOffset;
        }
    }

    createBitmap(): void {
        Sprite_MapEventGauge._createBitmap.call(this);
        this._currentBitmapWidth = this.bitmapWidth();
    }
}
