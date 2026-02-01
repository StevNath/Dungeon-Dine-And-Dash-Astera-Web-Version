import { mixin } from "../CommonLibrary/mixin";

declare global {
    interface Game_Party {
        changeNextActor(currentActorId: number): boolean;
    }
}

class Game_Party_Mixin extends Game_Party {
    changeNextActor(currentActorId: number): boolean {
        let currentIndex = -1;
        let nextIndex = -1;
        for (let i = 0; i < this._actors.length - 1; i++) {
            if (this.allMembers()[i].actorId() === currentActorId) {
                currentIndex = i;
                break;
            }
        }
        if (currentIndex < 0) return false;
        for (let i = currentIndex + 1; i < this._actors.length; i++) {
            if (this.allMembers()[i].isAlive()) {
                nextIndex = i;
                break;
            }
        }
        if (nextIndex < 0) return false;
        const currentId = this._actors[currentIndex];
        const nextId = this._actors[nextIndex];
        this._actors = this._actors.filter(id => id !== currentId && id !== nextId);
        this._actors.push(currentId);
        this._actors.unshift(nextId);
        $gamePlayer.refresh();
        return true;
    }

    leader(): Game_Actor {
        for (const member of this.allMembers()) {
            if (member.isAlive()) return member;
        }
        return this.battleMembers()[0];
    }
}

mixin(Game_Party, Game_Party_Mixin);
