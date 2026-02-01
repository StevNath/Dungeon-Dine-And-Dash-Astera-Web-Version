declare class Window_ItemCategory extends Window_HorzCommand {
    protected _itemWindow: Window_ItemList;
    initialize(rect: Rectangle): void;
    maxCols(): number;
    update(): void;
    makeCommandList(): void;
    needsCommand(name: string): boolean;
    setItemWindow(itemWindow: Window_ItemList): void;
    needsSelection(): boolean;
}
