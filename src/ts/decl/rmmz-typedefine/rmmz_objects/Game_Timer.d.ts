declare class Game_Timer {
    protected _frames: number;
    protected _working: boolean;
    constructor(...args: any[]);
    initialize(): void;
    update(sceneActive: boolean): void;
    start(count: number): void;
    stop(): void;
    isWorking(): boolean;
    seconds(): number;
    frames(): number;
    onExpire(): void;
}
