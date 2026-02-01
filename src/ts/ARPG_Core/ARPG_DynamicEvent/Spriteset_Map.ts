import { mixin } from "../../CommonLibrary/mixin";

declare global {
    interface Spriteset_Map {
        updateCreateCharacterSprites(): void;
        createCharacterSprite(character: Game_Character): void;
    }
}

class Spriteset_Map_Mixin extends Spriteset_Map {
    static _update = Spriteset_Map.prototype.update;

    update(): void {
        Spriteset_Map_Mixin._update.call(this);
        this.updateCreateCharacterSprites();
    }

    updateCreateCharacterSprites(): void {
        const mapEvents = new Set([...$gameMap.events()]);
        const hasSpriteEvents = new Set<Game_Event>();
        for (const sprite of this._characterSprites) {
            const character = sprite.character();
            if (character instanceof Game_Event) {
                hasSpriteEvents.add(character);
            }
        }
        for (const event of mapEvents) {
            if (!hasSpriteEvents.has(event)) this.createCharacterSprite(event);
        }
        for (const event of hasSpriteEvents) {
            if (!mapEvents.has(event)) this.deleteCharacterSprite(event);
        }
    }

    createCharacterSprite(character: Game_Character): void {
        const sprite = new Sprite_Character(character);
        this._characterSprites.push(sprite);
        this._tilemap.addChild(sprite);
    }

    deleteCharacterSprite(character: Game_Character): void {
        const sprite = this.findTargetSprite(character);
        if (!sprite) return;
        if (character.isAnimationPlaying()) return;
        this._characterSprites = this._characterSprites.filter(characterSprite => characterSprite !== sprite);
        this._tilemap.removeChild(sprite);
    }
}

mixin(Spriteset_Map, Spriteset_Map_Mixin);
