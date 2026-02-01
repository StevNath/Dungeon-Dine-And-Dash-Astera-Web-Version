declare class Window_BattleItem extends Window_ItemList {
    initialize(rect: Rectangle): void;
    includes(item: RMMZData.Item): boolean;
    show(): void;
    hide(): void;
}
