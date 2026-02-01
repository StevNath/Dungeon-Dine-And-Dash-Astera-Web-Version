import { ARPG_Battler } from "ARPG_Battler";
import { ARPG_CorePluginParams } from "ARPG_Config";
import { Sprite_CommonGauge } from "Sprite_CommonGauge";
import { Sprite_Label } from "Sprite_Label";
import { Container } from "../CommonLibrary/Container";

export class BossHpGaugeContainer extends Container {
    private _bossHpGauge!: Sprite_CommonGauge;
    private _bossHpGaugeLabel!: Sprite_Label;

    initialize(): void {
        super.initialize();
        this._bossHpGauge = this.createBossHpGauge();
        this.addChild(this._bossHpGauge);
        this._bossHpGaugeLabel = this.createBossHpGaugeLabel();
        this.addChild(this._bossHpGaugeLabel);
    }

    setupBossHpGauge(battler: ARPG_Battler): void {
        this._bossHpGauge.setup(battler.battler(), "hp");
    }

    private createBossHpGauge(): Sprite_CommonGauge {
        const hpGaugeColor1 = ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeColor1;
        const hpGaugeColor2 = ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeColor2;
        const hpGaugeYOffset = ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeYOffset == null ? 16 : ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeYOffset;
        const hpGaugeWidth = ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeWidth == null ? 500 : ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeWidth;
        const hpGaugeHeight = ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeHeight == null ? 12 : ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeHeight;
        const bossHpGauge = new Sprite_CommonGauge(hpGaugeWidth, hpGaugeHeight, { hpGaugeColor1, hpGaugeColor2 });
        bossHpGauge.x = (Graphics.boxWidth - bossHpGauge.gaugeWidth()) / 2;
        bossHpGauge.y = hpGaugeYOffset;
        bossHpGauge.anchor.y = 0.5;
        return bossHpGauge;
    }

    private createBossHpGaugeLabel(): Sprite_Label {
        const bossHpGaugeLabel = new Sprite_Label(64, Math.floor($gameSystem.mainFontSize() * 1.5));
        bossHpGaugeLabel.anchor.x = 1;
        bossHpGaugeLabel.x = this._bossHpGauge.x;
        bossHpGaugeLabel.anchor.y = 0.5;
        bossHpGaugeLabel.y = this._bossHpGauge.y + this._bossHpGauge.bitmapHeight() / 2;
        bossHpGaugeLabel.text = ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeLabel;
        return bossHpGaugeLabel;
    }
}
