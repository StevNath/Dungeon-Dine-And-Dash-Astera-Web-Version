declare class Window_NameEdit extends Window_StatusBase {
    protected _actor: Game_Actor | null;
    protected _maxLength: number;
    protected _name: string;
    protected _defaultName: string;
    initialize(rect: Rectangle): void;
    setup(actor: Game_Actor, maxLength: number): void;
    name(): string;
    restoreDefault(): boolean;
    add(ch: string): boolean;
    back(): boolean;
    faceWidth(): number;
    charWidth(): number;
    left(): number;
    itemRect(index: number): Rectangle;
    underlineRect(index: any): Rectangle;
    underlineColor(): string;
    drawUnderline(index: number): void;
    drawChar(index: number): void;
    refresh(): void;
}
