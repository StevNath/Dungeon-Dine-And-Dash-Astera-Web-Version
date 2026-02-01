import { Component } from "./Component";

export abstract class Processor<T> extends Component<T> {
    private _generator?: Generator;

    protected update() {
        super.update();
        if (!this._generator) this._generator = this.process();
        const res = this._generator.next();
        if (res.done) {
            this._generator = undefined;
            this.end();
        }
    }

    protected abstract process(): Generator;

    protected *waitProcess(waitTime: number, exitCheckFunc: any = null) {
        while (waitTime > 0) {
            if (exitCheckFunc) {
                if (exitCheckFunc()) break;
            }
            waitTime--;
            yield;
        }
    }

    protected *waitComponent(component: Component<T>) {
        while (!component.isStopped()) yield;
    }
}
