declare class Sprite_Battleback extends TilingSprite {
    constructor(type: number);
    initialize(type: number): void;
    adjustPosition(): void;
    battleback1Bitmap(): Bitmap;
    battleback2Bitmap(): Bitmap;
    battleback1Name(): string;
    battleback2Name(): string;
    overworldBattleback1Name(): string;
    overworldBattleback2Name(): string;
    normalBattleback1Name(): string;
    normalBattleback2Name(): string;
    terrainBattleback1Name(type: number): "Wasteland" | "DirtField" | "Desert" | "Lava1" | "Lava2" | "Snowfield" | "Clouds" | "PoisonSwamp" | null;
    terrainBattleback2Name(type: number): "Wasteland" | "Desert" | "Snowfield" | "Clouds" | "PoisonSwamp" | "Forest" | "Cliff" | "Lava" | undefined;
    defaultBattleback1Name(): string;
    defaultBattleback2Name(): string;
    shipBattleback1Name(): string;
    shipBattleback2Name(): string;
    autotileType(z: number): number;
}
