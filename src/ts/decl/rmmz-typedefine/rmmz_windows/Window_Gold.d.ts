declare class Window_Gold extends Window_Selectable {
    initialize(rect: Rectangle): void;
    colSpacing(): number;
    refresh(): void;
    value(): number;
    currencyUnit(): string;
    open(): void;
}
