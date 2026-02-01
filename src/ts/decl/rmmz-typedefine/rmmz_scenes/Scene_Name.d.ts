declare class Scene_Name extends Scene_MenuBase {
    protected _actorId: number;
    protected _maxLength: number;
    protected _editWindow: Window_NameEdit;
    protected _inputWindow: Window_NameInput;
    initialize(): void;
    prepare(actorId: number, maxLength: number): void;
    create(): void;
    start(): void;
    createEditWindow(): void;
    editWindowRect(): Rectangle;
    createInputWindow(): void;
    inputWindowRect(): Rectangle;
    onInputOk(): void;
}
