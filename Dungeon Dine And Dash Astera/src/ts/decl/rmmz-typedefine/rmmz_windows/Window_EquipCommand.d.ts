declare class Window_EquipCommand extends Window_HorzCommand {
    initialize(rect: Rectangle): void;
    maxCols(): number;
    makeCommandList(): void;
}
