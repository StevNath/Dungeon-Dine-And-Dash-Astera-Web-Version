declare class Game_SelfSwitches {
    protected _data: any;
    constructor(...args: any[]);
    initialize(): void;
    clear(): void;
    value(key: [number, number, string]): boolean;
    setValue(key: [number, number, string], value: boolean): void;
    onChange(): void;
}
