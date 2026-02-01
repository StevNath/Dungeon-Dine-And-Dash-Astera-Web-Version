export {}

declare global {
    interface Game_CharacterBase {
        getSprite(): Sprite_Character | undefined;
    }
}

// キャラクターからスプライトを取得する。
Game_CharacterBase.prototype.getSprite = function() {
    if (!(SceneManager._scene instanceof Scene_Map)) return undefined;
    const spriteset = (SceneManager._scene as any)._spriteset;
    return spriteset.findTargetSprite(this);
};
