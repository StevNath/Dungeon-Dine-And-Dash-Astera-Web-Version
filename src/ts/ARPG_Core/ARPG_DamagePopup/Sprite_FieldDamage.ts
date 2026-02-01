import { ARPG_CorePluginParams } from "../ARPG_Config";

export class Sprite_FieldDamage extends Sprite_Damage {
    static _initialize = Sprite_Damage.prototype.initialize;
    static _createMiss = Sprite_Damage.prototype.createMiss;
    static _createDigits = Sprite_Damage.prototype.createDigits;
    static _destroy = Sprite_Damage.prototype.destroy;

    protected _damageBitmap?: Bitmap;
    private _actionResult?: Game_ActionResult;

    initialize() {
        super.initialize();
        if (ARPG_CorePluginParams.UseImageDamage) {
            this._damageBitmap = ImageManager.loadSystem("Damage");
        }
    }

    digitWidth() {
        return this._damageBitmap ? this._damageBitmap.width / 10 : 0;
    }

    digitHeight() {
        return this._damageBitmap ? this._damageBitmap.height / 5 : 0;
    }

    setActionResult(actionResult: Game_ActionResult): void {
        this._actionResult = actionResult;
    }

    setup(target: Game_Battler): void {
        const result = this._actionResult;
        if (!result) throw new Error(`actionResult is undefined.`)
        this._actionResult = undefined;
        if (result.missed || result.evaded) {
            this._colorType = 0;
            this.createMiss();
        } else if (result.hpAffected) {
            this._colorType = result.hpDamage >= 0 ? 0 : 1;
            this.createDigits(result.hpDamage);
        } else if (target.isAlive() && result.mpDamage !== 0) {
            this._colorType = result.mpDamage >= 0 ? 2 : 3;
            this.createDigits(result.mpDamage);
        }
        if (result.critical) {
            this.setupCriticalEffect();
        }
    }

    createMiss() {
        if (ARPG_CorePluginParams.UseImageDamage) {
            const w = this.digitWidth();
            const h = this.digitHeight();
            const sprite: any = this.createChildImageSprite();
            sprite.setFrame(0, 4 * h, 4 * w, h);
            sprite.dy = 0;
        } else {
            super.createMiss();
        }
    }

    createDigits(value: number) {
        if (ARPG_CorePluginParams.UseImageDamage) {
            const baseRow = 0; // TODO: colortypeによって設定する

            const string = Math.abs(value).toString();
            const row = baseRow + (value < 0 ? 1 : 0);
            const w = this.digitWidth();
            const h = this.digitHeight();
            for (let i = 0; i < string.length; i++) {
                const sprite: any = this.createChildImageSprite();
                const n = Number(string[i]);
                sprite.setFrame(n * w, row * h, w, h);
                sprite.x = (i - (string.length - 1) / 2) * w;
                sprite.dy = -i;
            }
        } else {
            super.createDigits(value);
        }
    }

    createChildImageSprite() {
        const sprite: any = new Sprite();
        sprite.bitmap = this._damageBitmap;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 1;
        sprite.y = -40;
        sprite.ry = sprite.y;
        this.addChild(sprite);
        return sprite;
    }

    destroy(options: any) {
        if (ARPG_CorePluginParams.UseImageDamage) {
            Sprite.prototype.destroy.call(this, options);
        } else {
            super.destroy(options)
        }
    }
}
