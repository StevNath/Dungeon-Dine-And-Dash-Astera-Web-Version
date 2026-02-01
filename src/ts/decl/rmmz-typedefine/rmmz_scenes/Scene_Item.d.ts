declare class Scene_Item extends Scene_ItemBase {
    protected _categoryWindow: Window_ItemCategory;
    initialize(): void;
    create(): void;
    createCategoryWindow(): void;
    categoryWindowRect(): Rectangle;
    createItemWindow(): void;
    itemWindowRect(): Rectangle;
    user(): Game_Battler;
    onCategoryOk(): void;
    onItemOk(): void;
    onItemCancel(): void;
    playSeForItem(): void;
    useItem(): void;
}
