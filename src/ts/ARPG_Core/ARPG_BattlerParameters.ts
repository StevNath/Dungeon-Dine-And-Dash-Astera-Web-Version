export class ARPG_BattlerParameters {
    private _skillCancelDamageRate: number = 0;
    private _justGuardFrame?: number;
    private _noDamageFlag: boolean = false;
    private _noAttackFlag: boolean = false;

    get skillCancelDamageRate() { return this._skillCancelDamageRate; }
    set skillCancelDamageRate(value) { this._skillCancelDamageRate = value; }
    get justGuardFrame() { return this._justGuardFrame; }
    set justGuardFrame(value) { this._justGuardFrame = value; }
    get noDamageFlag() { return this._noDamageFlag; }
    set noDamageFlag(_noDamageFlag) { this._noDamageFlag = _noDamageFlag; }
    get noAttackFlag() { return this._noAttackFlag; }
    set noAttackFlag(_noAttackFlag) { this._noAttackFlag = _noAttackFlag; }
}
