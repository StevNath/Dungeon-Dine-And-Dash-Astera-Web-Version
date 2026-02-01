declare class Game_Unit<T extends Game_Battler> {
    protected _inBattle: boolean;
    constructor(...args: []);
    initialize(): void;
    inBattle(): boolean;
    members(): T[];
    aliveMembers(): T[];
    deadMembers(): T[];
    movableMembers(): T[];
    clearActions(): void;
    agility(): number;
    tgrSum(): number;
    randomTarget(): Game_Battler;
    randomDeadTarget(): T | null;
    smoothTarget(index: number): T;
    smoothDeadTarget(index: number): T;
    clearResults(): void;
    onBattleStart(advantageous: boolean): void;
    onBattleEnd(): void;
    makeActions(): void;
    select(activeMember: Game_Battler | null): void;
    isAllDead(): boolean;
    substituteBattler(): T | null;
    tpbBaseSpeed(): number;
    tpbReferenceTime(): 240 | 60;
    updateTpb(): void;
}
