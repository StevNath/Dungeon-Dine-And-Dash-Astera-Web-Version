import { Component } from "./Component";

export class ComponentRunner<T> {
    private _components: Set<Component<T>> = new Set<Component<T>>();
    private _user: T;
    private _end: boolean = false;

    constructor(user: T) {
        this._user = user;
    }

    prepareUpdate() {
        for (const component of this._components) {
            component.prepareUpdateComponent();
        }
    }

    update() {
        if (this._end) return;
        const components = [...this._components];
        for (const component of components) {
            component.updateComponent();
            if (component.isTerminated()) {
                this.removeComponent(component);
            }
        }
    }

    addComponent(component: Component<T>): void {
        this._components.add(component);
        component.setUser(this._user);
    }

    removeComponent(component: Component<T>): void {
        this._components.delete(component);
    }

    hasComponent(component: Component<T> | undefined): boolean {
        if (component == null) return false;
        return this._components.has(component);
    }

    hasComponentByClass(componentClass: Function): boolean {
        return !!([...this._components].find(c => c instanceof componentClass));
    }

    end(): void {
        for (const component of this._components) {
            component.end(true);
        }
    }

    isEnd(): boolean {
        return this._end;
    }
}
