export abstract class Sprite_ParticleAnimation extends Sprite {
    private _container!: PIXI.Container;
    private _playing!: boolean;
    private _targets!: Array<any>;
    private _animation!: any;
    private _mirror!: boolean;
    private _delay!: number;
    private _previous!: any;
    private _maxTimingFrames!: number;
    private _frameIndex!: number;
    private _flashColor!: Array<number>;
    private _flashDuration!: number;

    get container() { return this._container; }

    initialize() {
        super.initialize();
        this._playing = false;
        this._frameIndex = 0;
        this._maxTimingFrames = 0;
        this._flashColor = [0, 0, 0, 0];
        this._flashDuration = 0;
        this._container = new PIXI.Container();
        // this._container = new PIXI.ParticleContainer();
        this.addChild(this._container);
    }

    setup(targets: Array<any>, animation: any, mirror: boolean, delay: number, previous: any) {
        this._targets = targets;
        this._animation = animation;
        this._mirror = mirror;
        this._delay = delay;
        this._previous = previous;
        if (mirror) this.scale.x *= -1;
        this._playing = true;

        const timings = animation.soundTimings.concat(animation.flashTimings);
        for (const timing of timings) {
            if (timing.frame > this._maxTimingFrames) {
                this._maxTimingFrames = timing.frame;
            }
        }
    }

    update() {
        if (this._delay > 0) {
            this._delay--;
        } else {
            if (!this._playing) return;
            if (this._targets.length > 0) {
                const target = this._targets[0];
                this.x = target.x;
                this.y = target.y;
                if (this._animation.offsetX != null) this.x += this._animation.offsetX;
                if (this._animation.offsetY != null) this.y += this._animation.offsetY;
            }
            this.updateMain();
            this.updateFlash();
            if (this._animation.angle != null) this.rotation = this._animation.angle * Math.PI / 180;
            for (const child of this._container.children) {
                if ((child as any).update) (child as any).update();
            }
        }
    }

    addParticle(particle: Sprite) {
        this._container.addChild(particle);
    }

    removeParticle(particle: Sprite) {
        this._container.removeChild(particle);
    }

    end() {
        this._playing = false;
    }

    isPlaying() {
        return this._playing;
    }

    updateMain() {
        this.processSoundTimings();
        this.processFlashTimings();
        this._frameIndex++;
    }

    processSoundTimings() {
        for (const timing of this._animation.soundTimings) {
            if (timing.frame === this._frameIndex) {
                AudioManager.playSe(timing.se);
            }
        }
    }

    processFlashTimings() {
        for (const timing of this._animation.flashTimings) {
            if (timing.frame === this._frameIndex) {
                this._flashColor = timing.color.clone();
                this._flashDuration = timing.duration;
            }
        }
    }

    updateFlash() {
        if (this._flashDuration > 0) {
            const d = this._flashDuration--;
            this._flashColor[3] *= (d - 1) / d;
            for (const target of this._targets) {
                target.setBlendColor(this._flashColor);
            }
        }
    }

    // TODO: 暫定対応
    restoreBackupInfo(backupInfo: any) {
    }
}
