import { Degree } from "CommonLibrary/Degree";
import { Processor } from "CommonLibrary/Processor";
import { Sprite_MapWeapon } from "./Sprite_MapWeapon";

export class SwordAttackProcessor extends Processor<Game_Character> {
    private _weaponImageId: number;
    private _weaponSprite?: Sprite_MapWeapon;

    constructor(weaponImageId: number) {
        super();
        this._weaponImageId = weaponImageId;
    }

    protected start(): void {
        super.start();
        const sprite = this.user().getSprite()!;
        sprite.createMapWeaponSprite(this._weaponImageId);
        this._weaponSprite = sprite._weaponSprite;
    }

    *process() {
        this._weaponSprite!.show();
        switch (this.user().direction()) {
            case 8:
                yield* this.upAttack();
                break;
            case 6:
                yield* this.rightAttack();
                break;
            case 2:
                yield* this.downAttack();
                break;
            case 4:
                yield* this.leftAttack();
                break;
            default:
                throw new Error(`${this.user().direction()} is not found.`);
        }
    }

    protected terminate(): void {
        super.terminate();
        const sprite = this.user().getSprite()!;
        sprite.deleteMapWeaponSprite();
    }

    *upAttack() {
        const req = { id: -1, offsetX: -20, offsetY: -20, angle: 90 };
        this.showAnimation(req);

        this._weaponSprite!.inner.x = 4;
        this._weaponSprite!.inner.y = -40;

        for (let angle = 360 + 90; angle >= 270; angle -= 16) {
            this._weaponSprite!.rotation = (new Degree(angle - 45)).toRad();
            yield;
        }
    }

    *rightAttack() {
        const req = { id: -1, mirror: true };
        this.showAnimation(req);

        this._weaponSprite!.inner.x = 0;
        this._weaponSprite!.inner.y = -10;

        for (let angle = 0; angle <= 180; angle += 16) {
            this._weaponSprite!.rotation = (new Degree(angle - 45)).toRad();
            yield;
        }
    }

    *downAttack() {
        const req = { id: -1, offsetX: 20, offsetY: -20, angle: 270 };
        this.showAnimation(req);

        this._weaponSprite!.inner.x = 0;
        this._weaponSprite!.inner.y = -10;

        for (let angle = 270; angle >= 90; angle -= 16) {
            this._weaponSprite!.rotation = (new Degree(angle - 45)).toRad();
            yield;
        }
    }

    *leftAttack() {
        const req = { id: -1 };
        this.showAnimation(req);

        this._weaponSprite!.inner.x = 0;
        this._weaponSprite!.inner.y = -10;

        for (let angle = 360; angle >= 180; angle -= 16) {
            this._weaponSprite!.rotation = (new Degree(angle - 45)).toRad();
            yield;
        }
    }

    showAnimation(request: any) {
        const mirror = request.mirror;

        const animation: any = {
            displayType: 0,
            effectName: "SlashPhysical",
            flashTimings: [],
            name: "Slash<particle: Sprite_SwordAnimation>",
            offsetX: 0,
            offsetY: 0,
            rotation: {
                x: 0,
                y: 0,
                z: 90,
            },
            scale: 50,
            soundTimings: [],
            speed: 200,
            timings: [],
        };

        if (request.x != null) {
            animation.rotation.x = request.x;
        }
        if (request.y != null) {
            animation.rotation.y = request.y;
        }
        if (request.z != null) {
            animation.rotation.z = request.z;
        }
        if (request.scale != null) {
            animation.scale = request.scale;
        }
        if (request.offsetX != null) {
            animation.offsetX = request.offsetX;
        }
        if (request.offsetY != null) {
            animation.offsetY = request.offsetY;
        }
        if (request.angle != null) {
            animation.angle = request.angle;
        }

        (SceneManager as any)._scene._spriteset.createAnimationSprite([this.user()], animation, mirror, 0);
    }
}
