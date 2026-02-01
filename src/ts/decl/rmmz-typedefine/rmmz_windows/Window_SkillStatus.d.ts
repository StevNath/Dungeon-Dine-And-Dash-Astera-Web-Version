declare class Window_SkillStatus extends Window_StatusBase {
    protected _actor: Game_Actor | null;
    initialize(rect: Rectangle): void;
    setActor(actor: Game_Actor): void;
    refresh(): void;
}
