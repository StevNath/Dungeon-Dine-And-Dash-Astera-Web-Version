declare class Game_Actors {
    protected _data: Game_Actor[];
    constructor(...args: []);
    initialize(): void;
    actor(actorId: number): Game_Actor | null;
}
