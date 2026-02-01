const { exec } = require("child_process");
const { build } = require("esbuild");

const banner = `
var __tmp__require = require;

var simpleExported;
if (typeof simpleExported === "undefined") {
    simpleExported = {};
}

function simpleImport(path) {
    const pathArray = path.split("/");
    let module = simpleExported;
    for (const key of pathArray) {
        module = module[key];
    }
    return module;
}

function simpleExport(path, obj) {
    const pathArray = path.split("/");
    let module = simpleExported;
    for (const key of pathArray.slice(0, pathArray.length - 1)) {
        if (module[key] == null) {
            module[key] = {};
        }
        module = module[key];
    }
    module[pathArray[pathArray.length - 1]] = obj;
}

var require = (path) => {
    return simpleImport(path);
};
`;

const footer = `
require = __tmp__require;
`;

async function tscNoEmit(path) {
    await exec(`cd ${path} && tsc --noemit`, (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
    });
}

async function main() {
    if (process.argv.length >= 3 && process.argv[2] === "-t") {
        await tscNoEmit("ts/ARPG_Core");
        await tscNoEmit("ts/CharacterCollisionEx");
        await tscNoEmit("ts/CharacterImageEx");
        await tscNoEmit("ts/MapActorStatus");
    }

    const buildOpt = {
        entryPoints: ["./ts/ARPG_Core/Main.ts"],
        bundle: true,
        platform: "browser",
        outfile: "./js/plugins/build/ARPG_Core.js",
        external: ["fs", "DotMoveSystem"],
        logLevel: "error",
        tsconfig: "./ts/ARPG_Core/tsconfig.json",
        banner: { js: banner },
        footer: { js: footer },
    };
    await build(buildOpt);

    const buildOpt2 = {
        entryPoints: ["./ts/ARPG_WeaponAnimation/Main.ts"],
        bundle: true,
        platform: "browser",
        outfile: "./js/plugins/build/ARPG_WeaponAnimation.js",
        external: ["fs", "DotMoveSystem", "ARPG_Core", "CommonLibrary"],
        logLevel: "error",
        tsconfig: "./ts/ARPG_WeaponAnimation/tsconfig.json",
        banner: { js: banner },
        footer: { js: footer },
    };
    await build(buildOpt2);

    const buildOpt3 = {
        entryPoints: ["./ts/ARPG_ItemShortcut/Main.ts"],
        bundle: true,
        platform: "browser",
        outfile: "./js/plugins/build/ARPG_ItemShortcut.js",
        external: ["fs", "DotMoveSystem", "ARPG_Core", "CommonLibrary"],
        logLevel: "error",
        tsconfig: "./ts/ARPG_ItemShortcut/tsconfig.json",
        banner: { js: banner },
        footer: { js: footer },
    };
    await build(buildOpt3);

    const buildOpt4 = {
        entryPoints: ["./ts/CharacterImageEx/CharacterImageEx.ts"],
        bundle: true,
        platform: "browser",
        outfile: "./js/plugins/build/CharacterImageEx.js",
        external: ["fs"],
        logLevel: "error",
        tsconfig: "./ts/CharacterImageEx/tsconfig.json",
        banner: { js: banner },
        footer: { js: footer },
    };
    await build(buildOpt4);

    const buildOpt5 = {
        entryPoints: ["./ts/MapActorStatus/MapActorStatus.ts"],
        bundle: true,
        platform: "browser",
        outfile: "./js/plugins/build/MapActorStatus.js",
        external: ["fs"],
        logLevel: "error",
        tsconfig: "./ts/MapActorStatus/tsconfig.json",
        banner: { js: banner },
        footer: { js: footer },
    };
    await build(buildOpt5);

    const buildOpt6 = {
        entryPoints: ["./ts/CharacterCollisionEx/CharacterCollisionEx.ts"],
        bundle: true,
        platform: "browser",
        outfile: "./js/plugins/build/CharacterCollisionEx.js",
        external: ["fs", "DotMoveSystem"],
        logLevel: "error",
        tsconfig: "./ts/CharacterCollisionEx/tsconfig.json",
        banner: { js: banner },
        footer: { js: footer },
    };
    await build(buildOpt6);
}

main();
