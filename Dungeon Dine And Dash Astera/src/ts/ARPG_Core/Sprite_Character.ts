import { Sprite_MapEventGauge } from "./Sprite_MapEventGauge";
import { mixin } from "../CommonLibrary/mixin";

interface IInnerChild extends Sprite {
    inner?: Point;
    innerVisible?: boolean;
}

declare global {
    interface Sprite_Character {
        _hpGauge: Sprite_MapEventGauge;
        _innerChildren: IInnerChild[];
        _pressed: boolean;

        character(): Game_CharacterBase;
        addInnerChild(child: Sprite): void;
        removeInnerChild(child: Sprite): void;
        updateInnerChildren(): void;
        updateHpGauge(): void;
        createHpGauge(): void;
        processTouch(): void;
        isPressed(): boolean;
        isClickEnabled(): boolean;
        isBeingTouched(): boolean;
        hitTest(x: number, y: number): boolean;
        spriteWidth(): number;
        spriteHeight(): number;
        onPress(): void;
        onClick(): void;
    }
}


class Sprite_Character_Mixin extends Sprite_Character {
    private static _initMembers = Sprite_Character.prototype.initMembers;
    private static _update = Sprite_Character.prototype.update;

    initMembers(): void {
        Sprite_Character_Mixin._initMembers.call(this);
        this._innerChildren = [];
        this._pressed = false;
    }

    update(): void {
        Sprite_Character_Mixin._update.call(this);
        this.updateHpGauge();
        this.updateInnerChildren();
        this.processTouch();
    }

    character(): Game_CharacterBase {
        return this._character!;
    }

    addInnerChild(child: Sprite): void {
        this._innerChildren.push(child);
        const tilemap = (SceneManager as any)._scene._spriteset._tilemap;
        tilemap.addChild(child);
        tilemap._sortChildren();
    }

    removeInnerChild(child: Sprite): void {
        this._innerChildren = this._innerChildren.filter(cld => cld !== child);
        const tilemap = (SceneManager as any)._scene._spriteset._tilemap;
        tilemap.removeChild(child);
    }

    updateInnerChildren(): void {
        for (const child of this._innerChildren) {
            if (!child.inner) continue;
            child.x = this.x + child.inner.x;
            child.y = this.y + child.inner.y;
            if (child.innerVisible == null) {
                // child.visible = this.visible;
            } else {
                child.visible = child.innerVisible;
            }
        }
    }

    updateHpGauge(): void {
        if ((this._character as Game_Character).isNeedCharacterHpGauge()) {
            if (!this._hpGauge) {
                this.createHpGauge();
            }
            this._hpGauge.visible = (this._character as Game_Character).isCharacterHpGaugeVisibled();
        }
    }

    createHpGauge(): void {
        const position = this._character!.hpGaugePosition();
        const yOfs = this._character!.hpGaugeYOffset();
        const hpGaugeColor1 = this._character!.hpGaugeColor1();
        const hpGaugeColor2 = this._character!.hpGaugeColor2();
        const hpGaugeHeight = this._character!.hpGaugeHeight();
        this._hpGauge = new Sprite_MapEventGauge(this, position, yOfs, hpGaugeHeight, { hpGaugeColor1, hpGaugeColor2 });
        this.addInnerChild(this._hpGauge);
        this._hpGauge.setup(this._character!.battler().battler(), "hp");
    }

    processTouch(): void {
        if (this.isClickEnabled()) {
            if (this.isBeingTouched()) {
                if (TouchInput.isTriggered()) {
                    this._pressed = true;
                    this.onPress();
                }
            } else {
                this._pressed = false;
            }
            if (this._pressed && TouchInput.isReleased()) {
                this._pressed = false;
                this.onClick();
            }
        } else {
            this._pressed = false;
        }
    }

    isPressed(): boolean {
        return this._pressed;
    }

    isClickEnabled(): boolean {
        return this.worldVisible;
    }

    isBeingTouched(): boolean {
        const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = this.worldTransform.applyInverse(touchPos);
        return this.hitTest(localPos.x, localPos.y);
    }

    hitTest(x: number, y: number): boolean {
        const width = this.spriteWidth();
        const height = this.spriteHeight();
        const rect = new Rectangle(
            -this.anchor.x * width,
            -this.anchor.y * height,
            width,
            height
        );
        return rect.contains(x, y);
    }

    spriteWidth(): number {
        let baseWidth;
        if (this._bushDepth > 0 && this._upperBody && this._lowerBody) {
            baseWidth = this._upperBody.width;
        } else {
            baseWidth = this.width;
        }
        return baseWidth * this.scale.x;
    }

    spriteHeight(): number {
        let baseHeight;
        if (this._bushDepth > 0 && this._upperBody && this._lowerBody) {
            baseHeight = this._upperBody.height + this._lowerBody.height;
        } else {
            baseHeight = this.height;
        }
        return baseHeight * this.scale.y;
    }

    onPress(): void {
        this._character!.onPress();
    }

    onClick(): void {
        this._character!.onClick();
    }
}

mixin(Sprite_Character, Sprite_Character_Mixin);
