export class Window_CommonMessage extends Window_Base {
    private _text: string = "";

    get text() {
        return this._text;
    }

    set text(_text) {
        this._text = _text;
        this.refresh();
    }

    protected refresh(): void {
        this.drawText(this.text, 0, 0, this.width - this.padding * 2, "center");
    }
}
