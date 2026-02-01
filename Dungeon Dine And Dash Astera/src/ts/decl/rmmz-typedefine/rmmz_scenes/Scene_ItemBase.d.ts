declare abstract class Scene_ItemBase extends Scene_MenuBase {
    protected _actorWindow: Window_MenuActor;
    protected _itemWindow: Window_ItemList | Window_SkillList;
    abstract playSeForItem(): void;
    initialize(): void;
    create(): void;
    createActorWindow(): void;
    actorWindowRect(): Rectangle;
    item(): any;
    user(): Game_Battler;
    isCursorLeft(): boolean;
    showActorWindow(): void;
    hideActorWindow(): void;
    isActorWindowActive(): boolean;
    onActorOk(): void;
    onActorCancel(): void;
    determineItem(): void;
    useItem(): void;
    activateItemWindow(): void;
    itemTargetActors(): Game_Actor[];
    canUse(): boolean;
    isItemEffectsValid(): boolean;
    applyItem(): void;
    checkCommonEvent(): void;
}
