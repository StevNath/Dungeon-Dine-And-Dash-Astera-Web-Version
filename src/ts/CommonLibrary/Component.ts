import { ComponentRunner } from "./ComponentRunner";

export abstract class Component<T> {
    private _user!: T;
    private _end: boolean = false;
    private _terminated: boolean = false;
    private _started: boolean = false;
    private _componentRunner!: ComponentRunner<T>;
    private _stopped: boolean = false;
    private _calledSuperMethodNames: string[] = [];

    user(): T {
        return this._user;
    }

    setUser(user: T) {
        this._user = user;
        this._componentRunner = new ComponentRunner<T>(user);
        this.setup();
    }

    isStarted(): boolean {
        return this._started;
    }

    isStopped() {
        if (this._end) return true;
        return this._stopped;
    }

    isBusy(): boolean {
        return !this.isStopped();
    }

    stop(): void {
        this._stopped = true;
    }

    resume(): void {
        this._stopped = false;
    }

    isEnd(): boolean {
        return this._end;
    }

    isTerminated(): boolean {
        return this._terminated;
    }

    end(fastTerminate = false): void {
        this._end = true;
        if (fastTerminate) {
            this.updateComponent();
        }
    }

    prepareUpdateComponent(): void {
        if (this._end) return;
        if (this._stopped) return;
        if (this._started) {
            this._componentRunner.prepareUpdate();
            this._calledSuperMethodNames = [];
            this.prepareUpdate();
            this.checkSuperMethodCalled("prepareUpdate");
        }
    }

    updateComponent(): void {
        if (!this._end && !this._stopped) {
            this._componentRunner.update();
            if (this._started) {
                this._calledSuperMethodNames = [];
                this.update();
                this.checkSuperMethodCalled("update");
            } else {
                this._started = true;
                this._calledSuperMethodNames = [];
                this.start();
                this.checkSuperMethodCalled("start");
            }
        }
        if (this._end && !this._terminated) {
            this._terminated = true;
            this._calledSuperMethodNames = [];
            this.terminate();
            this.checkSuperMethodCalled("terminate");
            this._componentRunner.end();
        }
    }

    addComponent(component: Component<T>): void {
        this._componentRunner.addComponent(component);
    }

    removeComponent(component: Component<T>): void {
        this._componentRunner.removeComponent(component);
    }

    hasComponent(component: Component<T> | undefined): boolean {
        return this._componentRunner.hasComponent(component);
    }

    hasComponentByClass(componentClass: Function): boolean {
        return this._componentRunner.hasComponentByClass(componentClass);
    }

    protected setup(): void {
        this._calledSuperMethodNames.push("setup");
    }

    protected start(): void {
        this._calledSuperMethodNames.push("start");
    }

    protected prepareUpdate(): void {
        this._calledSuperMethodNames.push("prepareUpdate");
    }

    protected update(): void {
        this._calledSuperMethodNames.push("update");
    }

    protected terminate(): void {
        this._calledSuperMethodNames.push("terminate");
    }

    private checkSuperMethodCalled(methodName: string): void {
        if (!this._calledSuperMethodNames.includes(methodName)) {
            throw new Error(`${this.constructor.name}: super.${methodName}() is not called.`);
        }
    }
}
