import { Degree } from "../CommonLibrary/Degree";

export class TransparentObject extends Game_Character {
    private _remainFar!: number;

    constructor();

    constructor(...args: any[]) {
        super(...args as []);
    }

    initialize(...args: any): void {
        super.initialize();
        this.setNoCheckMapValid(true);
        this.setEnableWallSlide(false);
        this._remainFar = 0;
        this._slideLengthX = 0;
        this._slideLengthY = 0;
    }

    castTo(deg: Degree, far: number): boolean {
        let loopCount = 0;
        this._remainFar = far;
        while (true) {
            if (++loopCount > 255) throw new Error("endless loop error");
            const pos = this.positionPoint();
            if (!$gameMap.isValid(pos.x, pos.y)) {
                return false;
            }
            this.dotMoveByDeg(deg.value);
            if (!this.isMovementSucceeded()) {
                return true;
            }
            if (this._remainFar <= 0) {
                this.dotMoveByDeg(deg.value);
                if (!this.isMovementSucceeded()) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    distancePerFrame(): number {
        return 1.0;
    }

    moveCallback(moved: boolean, dpf: number) {
        super.moveCallback(moved, dpf);
        if (moved) {
            this._remainFar -= dpf;
        }
    }

    checkCollisionTargetCharacter(x: number, y: number, d: number, character: Game_CharacterBase): boolean {
        if (character instanceof Game_Player) {
            return this.checkCollisionTargetPlayer(x, y, d, character);
        } else if (character instanceof Game_Follower) {
            if ($gamePlayer.followers().isVisible()) {
                return this.checkCollisionTargetFollower(x, y, d, character);
            }
        } else if (character instanceof Game_Event) {
            return this.checkCollisionTargetEvent(x, y, d, character);
        } else if (character instanceof Game_Vehicle) {
            return this.checkCollisionTargetVehicle(x, y, d, character);
        }
        return false;
    }
}
