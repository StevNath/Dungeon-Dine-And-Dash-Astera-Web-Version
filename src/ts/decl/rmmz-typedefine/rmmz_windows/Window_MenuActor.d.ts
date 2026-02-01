declare class Window_MenuActor extends Window_MenuStatus {
    initialize(rect: Rectangle): void;
    processOk(): void;
    selectLast(): void;
    selectForItem(item: RMMZData.Item): void;
}
