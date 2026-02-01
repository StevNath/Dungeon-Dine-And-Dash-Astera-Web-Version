export class Degree {
    private _value!: number;

    get value() {
        return this._value;
    }

    static UP = new Degree(0);
    static UP_RIGHT = new Degree(45);
    static RIGHT = new Degree(90);
    static RIGHT_DOWN = new Degree(135);
    static DOWN = new Degree(180);
    static DOWN_LEFT = new Degree(225);
    static LEFT = new Degree(270);
    static LEFT_UP = new Degree(315);

    static fromDirection(direction: number): Degree {
        switch (direction) {
            case 8:
                return Degree.UP;
            case 9:
                return Degree.UP_RIGHT;
            case 6:
                return Degree.RIGHT;
            case 3:
                return Degree.RIGHT_DOWN;
            case 2:
                return Degree.DOWN;
            case 1:
                return Degree.DOWN_LEFT;
            case 4:
                return Degree.LEFT;
            case 7:
                return Degree.LEFT_UP;
            default:
                throw new Error(`${direction} is not found`);
        }
    }

    static fromRad(rad: number): Degree {
        return new Degree((rad * 180 / Math.PI) + 90);
    }

    constructor(...args: [number]) {
        this.initialize(...args);
    }

    initialize(value: number): void {
        value %= 360;
        if (value < 0) value = 360 + value;
        this._value = value;
    }

    toRad(): number {
        return (this._value - 90) * Math.PI / 180;
    }

    toDirection8(): number {
        const t = Math.round(this._value / 45);
        if (t === 0 || t === 8) {
            return 8;
        } else if (t === 1) {
            return 9;
        } else if (t === 2) {
            return 6;
        } else if (t === 3) {
            return 3;
        } else if (t === 4) {
            return 2;
        } else if (t === 5) {
            return 1;
        } else if (t === 6) {
            return 4;
        } else if (t === 7) {
            return 7;
        } else {
            throw new Error(`${this._value} is not found`);
        }
    }

    toDirection4(lastDirection: number): number {
        const t = Math.round(this._value / 45);
        if (t === 0 || t === 8) {
            return 8;
        } else if (t === 1) {
            if (lastDirection === 8) return 8;
            return 6;
        } else if (t === 2) {
            return 6;
        } else if (t === 3) {
            if (lastDirection === 6) return 6;
            return 2;
        } else if (t === 4) {
            return 2;
        } else if (t === 5) {
            if (lastDirection === 2) return 2;
            return 4;
        } else if (t === 6) {
            return 4;
        } else if (t === 7) {
            if (lastDirection === 4) return 4;
            return 8;
        } else {
            throw new Error(`${this._value} is not found`);
        }
    }

    isInRange(min: Degree | number, max: Degree | number): boolean {
        const minVal = (typeof min === "number") ? min : min.value;
        const maxVal = (typeof max === "number") ? max : max.value;
        if (minVal <= maxVal) {
            return minVal <= this.value && this.value <= maxVal;
        } else {
            if (minVal <= this.value && this.value < 360) return true;
            if (this.value <= maxVal) return true;
            return false;
        }
    }

    add(degree: Degree | number): Degree {
        if (typeof degree === "number") {
            return new Degree(this.value + degree);
        } else {
            return new Degree(this.value + degree.value);
        }
    }

    sub(degree: Degree | number): Degree {
        if (typeof degree === "number") {
            return new Degree(this.value - degree);
        } else {
            return new Degree(this.value - degree.value);
        }
    }
}
