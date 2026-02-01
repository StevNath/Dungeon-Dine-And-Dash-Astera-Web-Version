declare class Sprite_Balloon extends Sprite {
    targetObject: any;
    protected _target: Sprite | null;
    protected _balloonId: number;
    protected _duration: number;
    initialize(): void;
    initMembers(): void;
    loadBitmap(): void;
    setup(targetSprite: Sprite, balloonId: number): void;
    update(): void;
    updatePosition(): void;
    updateFrame(): void;
    speed(): number;
    waitTime(): number;
    frameIndex(): number;
    isPlaying(): boolean;
}
