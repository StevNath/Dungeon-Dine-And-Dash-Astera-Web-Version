export interface ILabelOption {
    fontSize?: number;
    fontFace?: string;
    align?: CanvasTextAlign;
}

export class Sprite_Label extends Sprite {
    private _text!: string;
    private _align!: CanvasTextAlign;

    constructor(width: number, height: number, opt?: ILabelOption);

    constructor(...args: []) {
        super(...args);
    }

    initialize(width: number, height: number, opt?: ILabelOption): void;

    initialize(...args: any[]): void {
        super.initialize();
        let width: number;
        let height: number;
        let opt: ILabelOption;
        if (args.length === 2) {
            [width, height] = args;
            opt = {};
        } else {
            [width, height, opt] = args;
        }
        this._text = "";
        this._align = opt.align ?? "left";
        this.bitmap = new Bitmap(width, height);
        this.bitmap.fontFace = opt.fontFace ?? $gameSystem.mainFontFace();
        this.bitmap.fontSize = opt.fontSize ?? $gameSystem.mainFontSize();
    }

    get text() {
        return this._text;
    }

    set text(_text) {
        this._text = _text;
        this.redrawText();
    }

    get fontSize() {
        return this.bitmap.fontSize;
    }

    set fontSize(_fontSize) {
        this.bitmap.fontSize = _fontSize;
        this.redrawText();
    }

    get fontFace() {
        return this.bitmap.fontFace;
    }

    set fontFace(_fontFace) {
        this.bitmap.fontFace = _fontFace;
        this.redrawText();
    }

    get align() {
        return this.bitmap.fontFace;
    }

    set align(_align) {
        this._align = _align
        this.redrawText();
    }

    private redrawText() {
        if (this._text === "") {
            this.hide();
        } else {
            this.show();
            this.bitmap.clear();
            this.bitmap.drawText(this._text, 0, 0, this.bitmap.width, this.bitmap.fontSize, this._align);
        }
    }
}
