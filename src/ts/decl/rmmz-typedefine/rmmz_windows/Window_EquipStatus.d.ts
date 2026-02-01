declare class Window_EquipStatus extends Window_StatusBase {
    protected _actor: Game_Actor | null;
    protected _tempActor: Game_Actor | null;
    initialize(rect: Rectangle): void;
    setActor(actor: Game_Actor): void;
    colSpacing(): number;
    refresh(): void;
    setTempActor(tempActor: Game_Actor | null): void;
    drawAllParams(): void;
    drawItem(x: number, y: number, paramId: number): void;
    drawParamName(x: number, y: number, paramId: number): void;
    drawCurrentParam(x: number, y: number, paramId: number): void;
    drawRightArrow(x: number, y: number): void;
    drawNewParam(x: number, y: number, paramId: number): void;
    rightArrowWidth(): number;
    paramWidth(): number;
    paramX(): number;
    paramY(index: number): number;
}
