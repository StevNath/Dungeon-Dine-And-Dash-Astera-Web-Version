declare class Window_Status extends Window_StatusBase {
    protected _actor: Game_Actor | null;
    initialize(rect: Rectangle): void;
    setActor(actor: Game_Actor): void;
    refresh(): void;
    drawBlock1(): void;
    block1Y(): number;
    drawBlock2(): void;
    block2Y(): number;
    drawBasicInfo(x: number, y: number): void;
    drawExpInfo(x: number, y: number): void;
    expTotalValue(): number | "-------";
    expNextValue(): number | "-------";
}
