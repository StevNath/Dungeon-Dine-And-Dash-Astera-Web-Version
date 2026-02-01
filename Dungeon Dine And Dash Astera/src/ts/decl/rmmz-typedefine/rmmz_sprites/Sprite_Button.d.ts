declare class Sprite_Button extends Sprite_Clickable {
    protected _buttonType: string;
    protected _clickHandler: Function | null;
    protected _coldFrame: Rectangle | null;
    protected _hotFrame: Rectangle | null;
    constructor(buttonType: string);
    initialize(buttonType: string): void;
    setupFrames(): void;
    blockWidth(): number;
    blockHeight(): number;
    loadButtonImage(): void;
    buttonData(): {
        x: number;
        w: number;
    };
    update(): void;
    checkBitmap(): void;
    updateFrame(): void;
    updateOpacity(): void;
    setColdFrame(x: number, y: number, width: number, height: number): void;
    setHotFrame(x: number, y: number, width: number, height: number): void;
    setClickHandler(method: Function): void;
    onClick(): void;
}
