import { Component } from "./Component";

export class CommonEventComponent<T extends Game_Character> extends Component<T> {
    protected _commonEventId: number;
    protected _interpreter: Game_Interpreter = new Game_Interpreter();

    constructor(commonEventId: number) {
        super();
        this._commonEventId = commonEventId;
    }

    interpreter(): Game_Interpreter {
        return this._interpreter;
    }

    protected start(): void {
        super.start();
        const commonEventData = $dataCommonEvents[this._commonEventId];
        if (!commonEventData) {
            this.end();
            return;
        }
        const user = this.user();
        if (user instanceof Game_Event) {
            this._interpreter.setup(commonEventData.list, user.eventId());
        } else {
            this._interpreter.setup(commonEventData.list);
        }
    }

    protected update(): void {
        super.update();
        if (this._interpreter.isRunning()) {
            this._interpreter.update();
        } else {
            if (!$gameMessage.isBusy()) {
                this.end();
            }
        }
    }

    protected terminate(): void {
        super.terminate();
        this._interpreter.clear();
    }
}
