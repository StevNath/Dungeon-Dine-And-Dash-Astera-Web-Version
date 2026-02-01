declare interface Game_CharacterBase {
    _needShadowByShowShadowList: boolean;
    _needShadowByApi?: boolean;
    isNeedShadow(): boolean;
    showShadow(): void;
    hideShadow(): void;
    shadowScreenX(): number;
    shadowScreenY(): number;
    shadowScreenZ(): number;
}
declare interface Game_Event {
    _needShadowByMeta?: boolean;
}
declare interface Sprite_Character {
    character(): Game_CharacterBase;
}
declare const SimpleShadowPluginName: string;
declare namespace SimpleShadow {
    class Sprite_Shadow extends Sprite {
        z: number;
        private _character;
        constructor(character: Game_CharacterBase);
        initialize(character: Game_CharacterBase): void;
        update(): void;
        character(): Game_CharacterBase;
        updatePosition(): void;
        updateVisible(): void;
    }
}
