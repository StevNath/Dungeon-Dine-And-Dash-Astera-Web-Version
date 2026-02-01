import { Component } from "../CommonLibrary/Component";

export class BattlerDeadComponent extends Component<Game_Character> {
    private _deadProcessComponent: Component<Game_Character> | undefined;

    constructor(deadProcessComponent: Component<Game_Character> | undefined) {
        super();
        this._deadProcessComponent = deadProcessComponent;
    }

    protected start(): void {
        super.start();
        const character = this.user();
        if (character instanceof Game_Player) {
            character.stopMoveByInput("dead");
        } else if (character instanceof Game_Event) {
            character.interpreter()?.lock("dead");
            character.stopSelfMovement("dead");
        }
        character.cancelAcceleration();
        character.cancelMove();
        if ((character as any)._moveRoute) {
            character.processRouteEnd();
        }
        if (this._deadProcessComponent) this.addComponent(this._deadProcessComponent);
    }

    protected update(): void {
        super.update();
        if (!this._deadProcessComponent || this._deadProcessComponent.isTerminated()) {
            this.end();
        }
    }

    protected terminate(): void {
        super.terminate();
        const character = this.user();
        if (character instanceof Game_Player) {
            character.resumeMoveByInput("dead");
        } else if (character instanceof Game_Event) {
            character.interpreter()?.unlock("dead");
            character.resumeSelfMovement("dead");
        }
    }
}
