import { mixin } from "../../CommonLibrary/mixin";
import { Sprite_FieldDamage } from "./Sprite_FieldDamage";

export { }

declare global {
    interface Sprite_Character {
        _damages: Sprite_FieldDamage[];
    }
}

class Sprite_Character_Mixin extends Sprite_Character {
    static _initMembers = Sprite_Character.prototype.initMembers;
    static _update = Sprite_Character.prototype.update;

    private _battler?: Game_Battler;

    initMembers(): void {
        Sprite_Character_Mixin._initMembers.call(this);
        this._damages = [];
    }

    update(): void {
        Sprite_Character_Mixin._update.call(this);
        const character = this._character as Game_Character;
        if (character.isBattler()) {
            this.setBattler(character.battler().battler());
        } else {
            this.setBattler(undefined);
        }
        this.updateDamagePopup();
    }

    setBattler(battler?: Game_Battler): void {
        this._battler = battler;
    }

    updateDamagePopup(): void {
        if (!this._battler) return;
        this.setupDamagePopup();
        if (this._damages.length > 0) {
            for (const damage of this._damages) {
                damage.update();
            }
            if (!this._damages[0].isPlaying()) {
                this.destroyDamageSprite(this._damages[0]);
            }
        }
    }

    setupDamagePopup(): void {
        const actionResult = $gameTemp.checkRequestedFieldDamagePopup(this._character!);
        if (actionResult) {
            this.createDamageSprite(actionResult);
        }
    }

    createDamageSprite(actionResult: Game_ActionResult): void {
        const last = this._damages[this._damages.length - 1];
        const sprite = new Sprite_FieldDamage();
        if (last) {
            sprite.x = last.x + 8;
            sprite.y = last.y - 16;
        } else {
            sprite.x = this.x + this.damageOffsetX();
            sprite.y = this.y + this.damageOffsetY();
        }
        sprite.setActionResult(actionResult);
        sprite.setup(this._battler!);
        this._damages.push(sprite);
        this.parent.addChild(sprite as any);
    }

    destroyDamageSprite(sprite: Sprite): void {
        this.parent.removeChild(sprite);
        this._damages.remove(sprite as any);
        sprite.destroy();
    }

    damageOffsetX(): number {
        return 0;
    }

    damageOffsetY(): number {
        return 0;
    }
}

mixin(Sprite_Character, Sprite_Character_Mixin);
