declare class Window_Command extends Window_Selectable {
    protected _list: IWindowCommand[];
    initialize(...args: any[]): void;
    maxItems(): number;
    clearCommandList(): void;
    makeCommandList(): void;
    addCommand(name: string, symbol: string, enabled?: boolean, ext?: any): void;
    commandName(index: number): string;
    commandSymbol(index: number): string;
    isCommandEnabled(index: number): boolean;
    currentData(): IWindowCommand | null;
    isCurrentItemEnabled(): boolean;
    currentSymbol(): string | null;
    currentExt(): any;
    findSymbol(symbol: any): number;
    selectSymbol(symbol: string | null): void;
    findExt(ext: any): number;
    selectExt(ext: any): void;
    drawItem(index: number): void;
    itemTextAlign(): CanvasTextAlign;
    isOkEnabled(): boolean;
    callOkHandler(): void;
    refresh(): void;
}
interface IWindowCommand {
    name: string;
    symbol: string;
    enabled: boolean;
    ext: any;
}
