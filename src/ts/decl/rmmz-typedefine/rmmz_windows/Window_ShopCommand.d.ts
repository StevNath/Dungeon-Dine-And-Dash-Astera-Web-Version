declare class Window_ShopCommand extends Window_HorzCommand {
    private _purchaseOnly;
    initialize(rect: Rectangle): void;
    setPurchaseOnly(purchaseOnly: boolean): void;
    maxCols(): number;
    makeCommandList(): void;
}
