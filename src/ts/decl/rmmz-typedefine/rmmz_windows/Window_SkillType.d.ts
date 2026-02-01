declare class Window_SkillType extends Window_Command {
    protected _actor: Game_Actor | null;
    protected _skillWindow: Window_SkillList;
    initialize(rect: Rectangle): void;
    setActor(actor: any): void;
    makeCommandList(): void;
    update(): void;
    setSkillWindow(skillWindow: any): void;
    selectLast(): void;
}
