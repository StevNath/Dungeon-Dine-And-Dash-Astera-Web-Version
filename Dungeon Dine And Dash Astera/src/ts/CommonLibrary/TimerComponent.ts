import { Component } from "./Component";

export class TimerComponent<T> extends Component<T> {
    private _time: number = 0;
    private _timeoutFlag: boolean = false;
    private _timeoutCallback?: Function;

    constructor(timeoutCallback?: Function) {
        super();
        this._timeoutCallback = timeoutCallback;
    }

    update() {
        super.update();
        if (this._time > 0) {
            this._time--;
            if (this._time === 0) {
                this.timeoutProcess();
            }
        }
    }

    startTimer(time: number): void {
        this.resume();
        if (time > 0) {
            this._time = time;
            this._timeoutFlag = false;
        } else {
            this.forceTimeout();
        }
    }

    checkTimeout(): boolean {
        if (this._timeoutFlag) {
            this._timeoutFlag = false;
            this.stop();
            return true;
        }
        return false;
    }

    isTimerRunning(): boolean {
        if (this.isStopped()) return false;
        if (this._time === 0) return false;
        return true;
    }

    forceTimeout(): void {
        this._time = 0;
        this.timeoutProcess();
    }

    cancel(): void {
        this._time = 0;
        this._timeoutFlag = false;
    }

    private timeoutProcess(): void {
        this._timeoutFlag = true;
        if (this._timeoutCallback) this._timeoutCallback();
    }
}
