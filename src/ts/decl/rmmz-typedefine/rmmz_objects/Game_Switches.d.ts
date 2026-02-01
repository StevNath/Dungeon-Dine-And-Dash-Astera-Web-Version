declare class Game_Switches {
    protected _data: boolean[];
    constructor();
    initialize(): void;
    clear(): void;
    value(switchId: number): boolean;
    setValue(switchId: number, value: boolean): void;
    onChange(): void;
}
