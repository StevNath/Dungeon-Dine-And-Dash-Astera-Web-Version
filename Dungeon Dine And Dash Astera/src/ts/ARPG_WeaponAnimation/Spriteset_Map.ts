Spriteset_Base.prototype.createAnimationSprite = function(this: Spriteset_Base, targets, animation, mirror, delay) {
    let sprite;
    const matchData = animation.name.match(/\<particle\:\s*(.+?)\>/);
    if (matchData) {
        const className = matchData[1];
        sprite = new (window as any)[className]();
    } else {
        const mv = this.isMVAnimation(animation);
        sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
    }
    const targetSprites = this.makeTargetSprites(targets);
    const baseDelay = this.animationBaseDelay();
    const previous = delay > baseDelay ? this.lastAnimationSprite() : null;
    if (this.animationShouldMirror(targets[0])) {
        mirror = !mirror;
    }
    sprite.targetObjects = targets;
    sprite.setup(targetSprites, animation, mirror, delay, previous);
    this._effectsContainer.addChild(sprite);
    this._animationSprites.push(sprite);
};
