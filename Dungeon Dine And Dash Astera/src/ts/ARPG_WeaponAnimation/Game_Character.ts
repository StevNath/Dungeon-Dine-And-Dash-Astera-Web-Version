import { SwordAttackProcessor } from "./SwordAttackProcessor";

declare global {
    interface Game_Character {
        _weaponMotionPlaying: boolean;
        _weaponMotionComponent?: SwordAttackProcessor;

        isWeaponMotionPlaying(): boolean;
        showWeaponMotion(weaponImageId: number, se: IAudioObject): void;
    }
}

Game_Character.prototype.showWeaponMotion = function(weaponImageId, se) {
    this._weaponMotionPlaying = true;
    AudioManager.playSe(se);
    if (this._weaponMotionComponent) {
        this._weaponMotionComponent.end(true);
    }
    this._weaponMotionComponent = new SwordAttackProcessor(weaponImageId);
    this.addComponent(this._weaponMotionComponent);
};

Game_Character.prototype.isWeaponMotionPlaying = function() {
    return this._weaponMotionPlaying;
};

const _Game_Character_update = Game_Character.prototype.update;
Game_Character.prototype.update = function() {
    _Game_Character_update.call(this);
    if (!this._weaponMotionComponent) return;
    if (this._weaponMotionComponent.isTerminated()) {
        this._weaponMotionPlaying = false;
        this._weaponMotionComponent = undefined;
    }
};
