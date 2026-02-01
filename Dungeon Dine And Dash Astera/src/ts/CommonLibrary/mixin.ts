export function mixin(dest: { prototype: any }, src: { prototype: any }) {
    for (const name of Object.getOwnPropertyNames(src.prototype)) {
        if (name === "constructor") continue;
        const value = Object.getOwnPropertyDescriptor(src.prototype, name) || Object.create(null);
        Object.defineProperty(dest.prototype, name, value);
    }
}
