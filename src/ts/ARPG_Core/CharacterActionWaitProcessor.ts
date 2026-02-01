import { Processor } from "../CommonLibrary/Processor";

export class CharacterActionWaitProcessor extends Processor<Game_Character> {
    private _duration: number;

    constructor(duration: number) {
        super();
        this._duration = duration;
    }

    protected start() {
        super.start();
        const character = this.user();
        if (character instanceof Game_Event) {
            character.interpreter()?.lock("stop");
            character.stopSelfMovement("stop");
        } else if (character instanceof Game_Player) {
            character.stopMoveByInput("stop");
        }
        character.cancelAcceleration();
        character.cancelMove();
        if ((character as any)._moveRoute) {
            character.processRouteEnd();
        }
    }

    protected *process() {
        yield* this.waitProcess(this._duration);
    }

    protected terminate(): void {
        super.terminate();
        const character = this.user();
        if (character instanceof Game_Event) {
            character.interpreter()?.unlock("stop");
            character.resumeSelfMovement("stop");
        } else if (character instanceof Game_Player) {
            character.resumeMoveByInput("stop");
        }
    }
}
