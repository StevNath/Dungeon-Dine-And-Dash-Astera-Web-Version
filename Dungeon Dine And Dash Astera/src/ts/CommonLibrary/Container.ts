export class Container extends PIXI.Container {
    protected _hidden!: boolean;

    constructor(...args: any[]) {
        super();
        this.initialize(...args as [])
    }

    initialize(...args: any[]): void {
        this._hidden = false;
    }

    update(): void {
        for (const child of this.children as { update?: any }[]) {
            if (child.update) {
                child.update();
            }
        }
    }

    hide(): void {
        this._hidden = true;
        this.updateVisibility();
    }

    show(): void {
        this._hidden = false;
        this.updateVisibility();
    }

    updateVisibility(): void {
        this.visible = !this._hidden;
    }

    move(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}
