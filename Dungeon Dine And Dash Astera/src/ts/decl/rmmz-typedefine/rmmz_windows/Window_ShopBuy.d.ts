declare class Window_ShopBuy extends Window_Selectable {
    protected _money: number;
    protected _shopGoods: number[][];
    protected _data: ItemObject[];
    protected _price: number[];
    protected _statusWindow: Window_ShopStatus;
    initialize(rect: Rectangle): void;
    setupGoods(shopGoods: number[][]): void;
    maxItems(): number;
    item(): ItemObject | null;
    itemAt(index: number): ItemObject | null;
    setMoney(money: number): void;
    isCurrentItemEnabled(): boolean | null;
    price(item: ItemObject | null): number;
    isEnabled(item: ItemObject | null): boolean | null;
    refresh(): void;
    makeItemList(): void;
    goodsToItem(goods: number[]): RMMZData.Armor | RMMZData.Item | RMMZData.Weapon | null;
    drawItem(index: number): void;
    priceWidth(): number;
    setStatusWindow(statusWindow: Window_ShopStatus): void;
    updateHelp(): void;
}
