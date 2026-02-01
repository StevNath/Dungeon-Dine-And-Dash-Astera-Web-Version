declare class Game_Variables {
    protected _data: number[];
    constructor();
    initialize(): void;
    clear(): void;
    value(variableId: number): number;
    setValue(variableId: number, value: number): void;
    onChange(): void;
}
