import { ARPG_CorePluginParams } from "../ARPG_Config";

const _Scene_Map_isReady = Scene_Map.prototype.isReady;
Scene_Map.prototype.isReady = function(this: Scene_Map) {
    let ready = true;
    const result = _Scene_Map_isReady.call(this);
    if (!result) ready = false;
    if (ARPG_CorePluginParams.UseImageDamage) {
        const damageBitmap = ImageManager.loadSystem("Damage");
        if (!damageBitmap.isReady()) ready = false;
    }
    return ready;
};
