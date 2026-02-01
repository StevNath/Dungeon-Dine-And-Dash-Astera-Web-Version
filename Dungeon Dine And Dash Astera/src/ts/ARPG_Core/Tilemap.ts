import { mixin } from "../CommonLibrary/mixin";

declare global {
    interface Tilemap {
        stopAnimation(): void;
        resumeAnimation(): void;
    }
}

class Tilemap_Mixin extends Tilemap {
    static _initialize = Tilemap.prototype.initialize;
    static _update = Tilemap.prototype.update;

    private _stoppedAnimation!: boolean;

    initialize(): void {
        Tilemap_Mixin._initialize.call(this);
        this._stoppedAnimation = false;
    }

    update(): void {
        if (!this._stoppedAnimation) {
            this.animationCount++;
            this.animationFrame = Math.floor(this.animationCount / 30);
        }
        for (const child of this.children as Sprite[]) {
            if (child.update) {
                child.update();
            }
        }
    }

    stopAnimation(): void {
        this._stoppedAnimation = true;
    }

    resumeAnimation(): void {
        this._stoppedAnimation = false;
    }
}

mixin(Tilemap, Tilemap_Mixin);
