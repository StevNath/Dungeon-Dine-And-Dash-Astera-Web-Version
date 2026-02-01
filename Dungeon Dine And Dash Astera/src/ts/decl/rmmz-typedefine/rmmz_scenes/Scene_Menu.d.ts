declare class Scene_Menu extends Scene_MenuBase {
    protected _statusWindow: any;
    protected _commandWindow: Window_MenuCommand;
    protected _goldWindow: Window_Gold;
    alchemy: any;
    battleFormation: any;
    initialize(): void;
    helpAreaHeight(): number;
    create(): void;
    start(): void;
    createCommandWindow(): void;
    commandWindowRect(): Rectangle;
    createGoldWindow(): void;
    goldWindowRect(): Rectangle;
    createStatusWindow(): void;
    statusWindowRect(): Rectangle;
    commandItem(): void;
    commandPersonal(): void;
    commandFormation(): void;
    commandOptions(): void;
    commandSave(): void;
    commandGameEnd(): void;
    onPersonalOk(): void;
    onPersonalCancel(): void;
    onFormationOk(): void;
    onFormationCancel(): void;
}
