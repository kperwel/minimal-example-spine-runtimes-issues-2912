import { Application, Assets } from "pixi.js";
import { Spine } from "pixi-spine";

const bunnsies_x = 10;
const bunnsies_y = 10;

(async () => {
    const app = new Application({
        background: 0xaa4444,
        resizeTo: window,
    });
    document.getElementById("pixi-container")!.appendChild(app.view as HTMLCanvasElement);
    Assets.add({ alias: "skeletonData", src: "/skeleton.json" });
    Assets.add({ alias: "skeletonAtlas", src: "/skeleton.atlas" });
    await Assets.load(["skeletonData", "skeletonAtlas"]);
    const skeletonData = Assets.get("skeletonData");
    let bunnies = new Array<Spine>();

    for (let i = 0; i < bunnsies_x; i++) {
        for (let j = 0; j < bunnsies_y; j++) {
            bunnies.push(
                app.stage.addChild(
                    new Spine(skeletonData.spineData),
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
