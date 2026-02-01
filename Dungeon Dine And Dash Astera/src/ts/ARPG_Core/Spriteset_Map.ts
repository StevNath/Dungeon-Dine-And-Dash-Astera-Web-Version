import { ARPG_Battler } from "./ARPG_Battler";
import { mixin } from "../CommonLibrary/mixin";
import { HitBox } from "./HitBox";
import { Sprite_HitBox } from "./Sprite_HitBox";
import { ARPG_CorePluginParams } from "./ARPG_Config";
import { BossHpGaugeContainer } from "BossHpGaugeContainer";

declare global {
    interface Spriteset_Map {
        _bossHpGaugeContainer: BossHpGaugeContainer;
        _hitBoxSprites: Set<Sprite_HitBox>;

        createBossHpGaugeContainer(): void;
        setupBossHpGauge(battler: ARPG_Battler, hpGaugeColor1?: string, hpGaugeColor2?: string): void;
        updateBossHpGauge(): void;
        findTargetHitBoxSprite(target: HitBox): Sprite_HitBox | undefined;
    }
}

class Spriteset_Map_Mixin extends Spriteset_Map {
    static _initialize = Spriteset_Map.prototype.initialize;
    static _update = Spriteset_Map.prototype.update;
    static _createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    static _findTargetSprite = Spriteset_Map.prototype.findTargetSprite;

    initialize() {
        Spriteset_Map_Mixin._initialize.call(this);
        this._hitBoxSprites = new Set<Sprite_HitBox>();
    }

    update() {
        Spriteset_Map_Mixin._update.call(this);
        if ($gameMap.isStopped()) {
            this._tilemap.stopAnimation();
        } else {
            this._tilemap.resumeAnimation();
        }
        this.updateBossHpGauge();
        this.updateHitBoxSprites();
    }

    updateHitBoxSprites(): void {
        if (ARPG_CorePluginParams.HitBoxSetting.VisibleHitAreaSwitchId > 0 && $gameSwitches.value(ARPG_CorePluginParams.HitBoxSetting.VisibleHitAreaSwitchId)) {
            const hitBoxs = $gameMap.allHitBoxs();
            const hasSpriteHitBoxs = new Set<HitBox>();
            for (const sprite of this._hitBoxSprites) {
                hasSpriteHitBoxs.add(sprite.hitBox());
            }
            for (const hitBox of hitBoxs) {
                if (!hasSpriteHitBoxs.has(hitBox)) this.createHitBoxSprite(hitBox);
            }
            for (const hitBox of hasSpriteHitBoxs) {
                if (!hitBoxs.has(hitBox)) this.deleteHitBoxSprite(hitBox);
            }
        } else {
            for (const sprite of this._hitBoxSprites) {
                this.deleteHitBoxSprite(sprite.hitBox());
            }
        }
    }

    createHitBoxSprite(hitBox: HitBox): void {
        const sprite = new Sprite_HitBox(hitBox);
        this._hitBoxSprites.add(sprite);
        this._tilemap.addChild(sprite);
    }

    deleteHitBoxSprite(hitBox: HitBox): void {
        const sprite = this.findTargetHitBoxSprite(hitBox);
        if (!sprite) return;
        this._hitBoxSprites.delete(sprite);
        this._tilemap.removeChild(sprite);
    }

    findTargetHitBoxSprite(target: HitBox): Sprite_HitBox | undefined {
        return [...this._hitBoxSprites].find(sprite => sprite.checkHitBox(target));
    }

    // TODO: 本当に必要か要検討
    destroy(options: any) {
    }

    createLowerLayer() {
        Spriteset_Map_Mixin._createLowerLayer.call(this);
        this.createBossHpGaugeContainer();
    }

    createBossHpGaugeContainer() {
        this._bossHpGaugeContainer = new BossHpGaugeContainer();
        this._bossHpGaugeContainer.hide();
        this.addChild(this._bossHpGaugeContainer);
    }

    setupBossHpGauge(battler: ARPG_Battler): void {
        this._bossHpGaugeContainer.setupBossHpGauge(battler);
        this._bossHpGaugeContainer.show();
    }

    updateBossHpGauge() {
        const enemy = $gameTemp.arpgGlobalTempData().bossHpGaugeTargetEnemy;
        if (enemy && enemy.isCharacterHpGaugeVisibled()) {
            this._bossHpGaugeContainer.show();
        } else {
            this._bossHpGaugeContainer.hide();
        }
    }
}

mixin(Spriteset_Map, Spriteset_Map_Mixin);
