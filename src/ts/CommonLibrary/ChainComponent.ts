import { Component } from "./Component";

export class ChainComponent<T> extends Component<T> {
    private _componentIndex: number = 0;
    private _components: (Component<T> | Function | undefined)[];
    private _running?: boolean;

    constructor(components: (Component<T> | Function | undefined)[]) {
        super();
        this._components = components;
    }

    protected start(): void {
        super.start();
        this.updateChain();
    }

    protected update(): void {
        super.update();
        this.updateChain();
    }

    private updateChain(): void {
        while (this._componentIndex < this._components.length) {
            const component = this._components[this._componentIndex];

            if (component == null) {
                this._componentIndex++;
                continue;
            }

            if (component instanceof Component) {
                if (this._running) {
                    if (component.isBusy()) {
                        break;
                    } else {
                        this._running = false;
                        this._componentIndex++;
                    }
                } else {
                    this._running = true;
                    this.addComponent(component);
                    break;
                }
            } else {
                component();
                this._componentIndex++;
            }
        }
        if (this._componentIndex >= this._components.length) {
            this.end();
        }
    }
}
