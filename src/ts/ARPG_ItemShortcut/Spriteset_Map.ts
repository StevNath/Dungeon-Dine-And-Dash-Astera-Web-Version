import { Sprite_Label } from "ARPG_Core/Sprite_Label";

declare global {
    interface Spriteset_Base {
        addShortcutLabel(shortcutLabel: Sprite_Label): void;
    }
}

Spriteset_Map.prototype.addShortcutLabel = function(this: Spriteset_Map, shortcutLabel) {
    this._baseSprite.addChild(shortcutLabel);
};
