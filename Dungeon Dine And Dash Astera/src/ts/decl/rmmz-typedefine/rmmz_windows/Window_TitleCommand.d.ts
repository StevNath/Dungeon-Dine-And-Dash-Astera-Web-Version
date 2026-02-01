declare class Window_TitleCommand extends Window_Command {
    initialize(...args: any[]): void;
    static _lastCommandSymbol: string | null;
    static initCommandPosition(): void;
    makeCommandList(): void;
    isContinueEnabled(): boolean;
    processOk(): void;
    selectLast(): void;
}
