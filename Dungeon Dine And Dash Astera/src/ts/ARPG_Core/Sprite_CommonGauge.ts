export interface ICommonGaugeConfig {
    hpGaugeColor1?: string;
    mpGaugeColor1?: string;
    tpGaugeColor1?: string;
    ctGaugeColor1?: string;
    hpGaugeColor2?: string;
    mpGaugeColor2?: string;
    tpGaugeColor2?: string;
    ctGaugeColor2?: string;
    normalColor?: string;
}

export class Sprite_CommonGauge extends Sprite_Gauge {
    private _config!: ICommonGaugeConfig;
    private _gaugeWidth!: number;
    private _gaugeHeight!: number;

    constructor(width: number, height: number, config: ICommonGaugeConfig);

    constructor(...args: any[]) {
        super(...args as []);
    }

    initialize(...args: any[]): void {
        const [width, height, config] = args as [number, number, ICommonGaugeConfig];
        this._config = Object.assign({}, config);
        this._gaugeWidth = width;
        this._gaugeHeight = height;
        super.initialize();
    }

    gaugeWidth(): number {
        return this._gaugeWidth;
    }

    gaugeHeight(): number {
        return this._gaugeHeight;
    }

    bitmapWidth(): number {
        return this.gaugeWidth();
    }

    bitmapHeight(): number {
        return this.gaugeHeight();
    }

    gaugeColor1(): string {
        switch (this._statusType) {
            case "hp":
                if (this._config.hpGaugeColor1) return this._config.hpGaugeColor1;
                return ColorManager.hpGaugeColor1();
            case "mp":
                if (this._config.mpGaugeColor1) return this._config.mpGaugeColor1;
                return ColorManager.mpGaugeColor1();
            case "tp":
                if (this._config.tpGaugeColor1) return this._config.tpGaugeColor1;
                return ColorManager.tpGaugeColor1();
            case "time":
                if (this._config.ctGaugeColor1) return this._config.ctGaugeColor1;
                return ColorManager.ctGaugeColor1();
            default:
                if (this._config.normalColor) return this._config.normalColor;
                return ColorManager.normalColor();
        }
    }

    gaugeColor2(): string {
        switch (this._statusType) {
            case "hp":
                if (this._config.hpGaugeColor2) return this._config.hpGaugeColor2;
                return ColorManager.hpGaugeColor2();
            case "mp":
                if (this._config.mpGaugeColor2) return this._config.mpGaugeColor2;
                return ColorManager.mpGaugeColor2();
            case "tp":
                if (this._config.tpGaugeColor2) return this._config.tpGaugeColor2;
                return ColorManager.tpGaugeColor2();
            case "time":
                if (this._config.ctGaugeColor2) return this._config.ctGaugeColor2;
                return ColorManager.ctGaugeColor2();
            default:
                return ColorManager.normalColor();
        }
    }

    drawGauge(): void {
        const gaugeX = this.gaugeX();
        const gaugeY = 0;
        const gaugewidth = this.gaugeWidth();
        const gaugeHeight = this.gaugeHeight();
        this.drawGaugeRect(gaugeX, gaugeY, gaugewidth, gaugeHeight);
    }

    gaugeX(): number {
        return 0;
    }

    textHeight(): number {
        return 0;
    }

    redraw() {
        this.bitmap.clear();
        const currentValue = this.currentValue();
        if (!isNaN(currentValue)) {
            this.drawGauge();
        }
    }
}
