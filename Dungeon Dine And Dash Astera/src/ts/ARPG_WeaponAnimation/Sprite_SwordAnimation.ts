import { Sprite_ParticleAnimation } from "./Sprite_ParticleAnimation";

export class Sprite_SwordAnimation extends Sprite_ParticleAnimation {
    _end!: boolean;
    _time!: number;
    _count!: number;
    _maxCount!: number;
    _sprites!: Array<SlashSprite>;

    initialize() {
        super.initialize();
        this._end = false;
        this._time = 0;
        this._count = 0;
        this._maxCount = 48 * 2;
        this._sprites = new Array(this._maxCount);
        for (let i = 0; i < this._maxCount; i++) {
            const rate = i / this._maxCount;
            const x = -Math.sin(rate * Math.PI) * 64;
            const y = i;
            const len = Math.sin(rate * Math.PI) * 32;
            const lifespan = 16;
            const sprite = new SlashSprite(len, lifespan);
            this._sprites[i] = sprite;

            sprite.x = x;
            sprite.y = y - 64;
            sprite.hide();

            this.addParticle(sprite);
        }
    }

    update() {
        super.update();
        if (this._sprites.every(s => s.isEnd())) {
            this.end();
            return;
        }
        for (let i = 0; i < 10; i++) {
            this.updateAnimation();
        }
        this._time++;
    }

    updateAnimation() {
        if (this._count >= this._maxCount) return;
        const sprite = this._sprites[this._count];
        sprite.show();
        this._count++;
    }
}

class SlashSprite extends Sprite {
    private _len!: number;
    private _lifespan!: number;
    private _time!: number;

    constructor(len: number, lifespan: number);

    constructor(...args: any[]) {
        super(...args as []);
    }

    initialize(...args: any) {
        super.initialize();
        const [len, lifespan] = args;
        this._len = len;
        this._lifespan = lifespan;
        this._time = 0;
        const bitmap = new Bitmap(len, 1);

        const ctx = bitmap.context;
        const grd = ctx.createLinearGradient(0, 0, len, 1);
        grd.addColorStop(0, "#8888ff");
        grd.addColorStop(0.05, "#ffffff");
        grd.addColorStop(0.75, "#8888ff");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, len, 1);

        this.bitmap = bitmap;
    }

    update() {
        super.update();
        this.opacity = Math.floor((1 - this._time / this._lifespan) * 255);
        this._time++;
        if (this.isEnd()) this.hide();
    }

    isEnd() {
        return this._time >= this._lifespan;
    }
}
