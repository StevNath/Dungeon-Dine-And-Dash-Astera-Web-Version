declare type ItemObject = RMMZData.Item | RMMZData.Weapon | RMMZData.Armor;
declare class Game_Item {
    protected _dataClass: string;
    protected _itemId: number;
    constructor(item?: RMMZData.Item);
    initialize(item?: RMMZData.Item): void;
    isSkill(): boolean;
    isItem(): boolean;
    isUsableItem(): boolean;
    isWeapon(): boolean;
    isArmor(): boolean;
    isEquipItem(): boolean;
    isNull(): boolean;
    itemId(): number;
    object(): ItemObject | null;
    setObject(item: ItemObject | null): void;
    setEquip(isWeapon: boolean, itemId: number): void;
}
