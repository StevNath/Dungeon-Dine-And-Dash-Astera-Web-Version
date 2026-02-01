export class Sprite_MapWeapon extends Sprite_Weapon {
    inner!: Point;

    initialize() {
        super.initialize();
        this.inner = new Point();
    }

    initMembers() {
        super.initMembers();
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.hide();
    }

    update() {
        Sprite.prototype.update.call(this);
    }
}
