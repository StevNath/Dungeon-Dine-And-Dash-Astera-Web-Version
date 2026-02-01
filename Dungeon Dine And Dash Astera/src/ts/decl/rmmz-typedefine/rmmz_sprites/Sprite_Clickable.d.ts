declare class Sprite_Clickable extends Sprite {
    protected _pressed: boolean;
    protected _hovered: boolean;
    initialize(...args: any[]): void;
    update(): void;
    processTouch(): void;
    isPressed(): boolean;
    isClickEnabled(): boolean;
    isBeingTouched(): boolean;
    hitTest(x: number, y: number): boolean;
    onMouseEnter(): void;
    onMouseExit(): void;
    onPress(): void;
    onClick(): void;
}
