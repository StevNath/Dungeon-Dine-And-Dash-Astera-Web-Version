declare class Scene_Skill extends Scene_ItemBase {
    protected _skillTypeWindow: Window_SkillType;
    protected _statusWindow: Window_SkillStatus;
    protected _itemWindow: Window_SkillList;
    initialize(): void;
    create(): void;
    start(): void;
    createSkillTypeWindow(): void;
    skillTypeWindowRect(): Rectangle;
    createStatusWindow(): void;
    statusWindowRect(): Rectangle;
    createItemWindow(): void;
    itemWindowRect(): Rectangle;
    needsPageButtons(): boolean;
    arePageButtonsEnabled(): boolean;
    refreshActor(): void;
    user(): any;
    commandSkill(): void;
    onItemOk(): void;
    onItemCancel(): void;
    playSeForItem(): void;
    useItem(): void;
    onActorChange(): void;
}
