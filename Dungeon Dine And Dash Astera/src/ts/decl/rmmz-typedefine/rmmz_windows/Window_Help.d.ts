declare class Window_Help extends Window_Base {
    protected _text: string;
    initialize(rect: Rectangle): void;
    setText(text: string): void;
    clear(): void;
    setItem(item: {
        description: string;
    }): void;
    refresh(): void;
}
