declare class Window_StatusEquip extends Window_StatusBase {
    protected _actor: Game_Actor | null;
    initialize(rect: Rectangle): void;
    setActor(actor: Game_Actor): void;
    maxItems(): number;
    itemHeight(): number;
    drawItem(index: number): void;
    drawItemBackground(): void;
}
