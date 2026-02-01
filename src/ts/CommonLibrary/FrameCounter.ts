import { Component } from "./Component";

export class FrameCounter<T> extends Component<T> {
    private _frame: number = 0;

    get frame() { return this._frame; }

    update() {
        super.update();
        this._frame++;
    }

    reset(): void {
        this._frame = 0;
    }
}
