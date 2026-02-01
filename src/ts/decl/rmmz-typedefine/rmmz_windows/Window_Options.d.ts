declare class Window_Options extends Window_Command {
    initialize(rect: Rectangle): void;
    makeCommandList(): void;
    addGeneralOptions(): void;
    addVolumeOptions(): void;
    drawItem(index: number): void;
    statusWidth(): number;
    statusText(index: number): string;
    isVolumeSymbol(symbol: string): boolean;
    booleanStatusText(value: any): "ON" | "OFF";
    volumeStatusText(value: any): string;
    processOk(): void;
    cursorRight(): void;
    cursorLeft(): void;
    changeVolume(symbol: keyof ConfigManager, forward: boolean, wrap: boolean): void;
    volumeOffset(): number;
    changeValue(symbol: keyof ConfigManager, value: any): void;
    getConfigValue(symbol: keyof ConfigManager): any;
    setConfigValue(symbol: keyof ConfigManager, volume: number): void;
}
