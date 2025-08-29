import { Application, Assets, Container, EventEmitter } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

const bunnsies_x = 10;
const bunnsies_y = 10;
const app = new Application();
const emitter = new EventEmitter();

document.querySelectorAll(".debug-button").forEach((btn) => {
    btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        if (action) {
            emitter.emit(action);
        }
    });
});

(async () => {
    await app.init({ background: 0xaa4444, resizeTo: window });
    document.getElementById("pixi-container")!.appendChild(app.canvas);
    Assets.add({ alias: "skeletonData", src: "/skeleton.json" });
    Assets.add({ alias: "skeletonAtlas", src: "/skeleton.atlas" });
    await Assets.load(["skeletonData", "skeletonAtlas"]);
    let bunnies: Array<Spine> = [];

    for (let i = 0; i < bunnsies_x; i++) {
        for (let j = 0; j < bunnsies_y; j++) {
            const topBunny = app.stage.addChild(
                Spine.from({
                    skeleton: "skeletonData",
                    atlas: "skeletonAtlas",
                }),
            );
            topBunny.label = `top-bunny-${i}-${j}`;
            topBunny.position.set(
                app.screen.width / 2 + (i - bunnsies_x / 2) * 40,
                app.screen.height / 2 + (j - bunnsies_y / 2) * 40,
            );
            topBunny.state.setAnimation(0, "default", true);
            bunnies.push(topBunny);
        }
    }

    const nestedBunnies: Array<Spine> = [];
    for (const bunny of bunnies) {
        const container = new Container();
        container.label = `container-in-${bunny.label}`;
        const nestedBunny = container.addChild(
            Spine.from({
                skeleton: "skeletonData",
                atlas: "skeletonAtlas",
            }),
        );
        nestedBunny.label = `nested-bunny-in-${bunny.label}`;
        nestedBunny.position.set(-10, -10);
        bunny.addSlotObject("main", container);
        nestedBunnies.push(nestedBunny);
    }

    emitter.on("make-cheap", () => {
        for (const bunny of nestedBunnies) {
            bunny.state.setAnimation(0, "makeCheap", true);
        }
    });

    emitter.on("make-expensive", () => {
        for (const bunny of nestedBunnies) {
            bunny.state.setAnimation(0, "makeExpensive", true);
        }
    });

    emitter.on("show-and-hide", () => {
        // Needs renderable revalidation to take effect
        // if spine nested in container
        bunnies[0].visible = !bunnies[0].visible;
        bunnies[0].visible = !bunnies[0].visible;
    });
})();
