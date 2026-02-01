declare class Scene_Status extends Scene_MenuBase {
    protected _profileWindow: Window_Help;
    protected _statusWindow: Window_Status;
    protected _statusParamsWindow: Window_StatusParams;
    protected _statusEquipWindow: Window_StatusEquip;
    initialize(): void;
    create(): void;
    helpAreaHeight(): number;
    createProfileWindow(): void;
    profileWindowRect(): Rectangle;
    createStatusWindow(): void;
    statusWindowRect(): Rectangle;
    createStatusParamsWindow(): void;
    statusParamsWindowRect(): Rectangle;
    createStatusEquipWindow(): void;
    statusEquipWindowRect(): Rectangle;
    statusParamsWidth(): number;
    statusParamsHeight(): number;
    profileHeight(): number;
    start(): void;
    needsPageButtons(): boolean;
    refreshActor(): void;
    onActorChange(): void;
}
