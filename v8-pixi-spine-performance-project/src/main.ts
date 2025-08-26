import { Application, Assets } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

const bunnsies_x = 10;
const bunnsies_y = 10;

(async () => {
    const app = new Application();
    await app.init({ background: 0xaa4444, resizeTo: window });
    document.getElementById("pixi-container")!.appendChild(app.canvas);
    Assets.add({ alias: "skeletonData", src: "/skeleton.json" });
    Assets.add({ alias: "skeletonAtlas", src: "/skeleton.atlas" });
    await Assets.load(["skeletonData", "skeletonAtlas"]);
    let bunnies = new Array<Spine>();

    for (let i = 0; i < bunnsies_x; i++) {
        for (let j = 0; j < bunnsies_y; j++) {
            bunnies.push(
                app.stage.addChild(
                    Spine.from({
                        skeleton: "skeletonData",
                        atlas: "skeletonAtlas",
                    }),
                ),
            );
            bunnies
                .at(-1)!
                .position.set(
                    app.screen.width / 2 + (i - bunnsies_x / 2) * 40,
                    app.screen.height / 2 + (j - bunnsies_y / 2) * 40,
                );
        }
    }
})();
