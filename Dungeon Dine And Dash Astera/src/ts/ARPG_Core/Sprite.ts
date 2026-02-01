import { Component } from "../CommonLibrary/Component";
import { ComponentRunner } from "../CommonLibrary/ComponentRunner";
import { mixin } from "../CommonLibrary/mixin";

declare global {
    interface Sprite {
        _componentRunner: ComponentRunner<Sprite>;

        addComponent(component: Component<Sprite>): void;
        removeComponent(component: Component<Sprite>): void;
        hasComponent(component: Component<Sprite> | undefined): boolean;
        hasComponentByClass(componentClass: Function): boolean;
    }
}

class Sprite_Mixin extends Sprite {
    static _initialize = Sprite.prototype.initialize;
    initialize(...args: any[]): void {
        Sprite_Mixin._initialize.call(this, ...args);
        this._componentRunner = new ComponentRunner(this);
    }

    static _update = Sprite.prototype.update;
    update(): void {
        Sprite_Mixin._update.call(this);
        this._componentRunner.update();
    }

    addComponent(component: Component<Sprite>): void {
        this._componentRunner.addComponent(component);
    }

    removeComponent(component: Component<Sprite>): void {
        this._componentRunner.removeComponent(component);
    }

    hasComponent(component: Component<Sprite> | undefined): boolean {
        return this._componentRunner.hasComponent(component);
    }

    hasComponentByClass(componentClass: Function): boolean {
        return this._componentRunner.hasComponentByClass(componentClass);
    }
}

mixin(Sprite, Sprite_Mixin);
