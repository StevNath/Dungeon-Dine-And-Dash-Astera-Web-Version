import { Sprite_MapWeapon } from "./Sprite_MapWeapon";

declare global {
    interface Sprite_Character {
        _weaponSprite: Sprite_MapWeapon;

        createMapWeaponSprite(weaponImageId: number): void;
        changeWeaponSprite(weaponImageId: number): void;
        deleteMapWeaponSprite(): void;
    }
}


Sprite_Character.prototype.createMapWeaponSprite = function(weaponImageId) {
    this._weaponSprite = new Sprite_MapWeapon();
    this._weaponSprite.z = 0;
    this.changeWeaponSprite(weaponImageId);
    this.addInnerChild(this._weaponSprite);
};

Sprite_Character.prototype.changeWeaponSprite = function(weaponImageId) {
    this._weaponSprite.setup(weaponImageId);
};

Sprite_Character.prototype.deleteMapWeaponSprite = function() {
    this.removeInnerChild(this._weaponSprite);
};
