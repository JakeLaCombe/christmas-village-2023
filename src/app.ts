import {
  Engine,
  HemisphericLight,
  Scene,
  SceneLoader,
  UniversalCamera,
  Vector3,
} from "@babylonjs/core";

import "@babylonjs/loaders/glTF";

import ChristmasVillage from "./assets/christmas_village.glb";

class App {
  constructor() {
    // create the canvas html element and attach it to the webpage
    var canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);
  }

  async loadScene() {
    // initialize babylon scene and engine
    var canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    var engine = new Engine(canvas, true);
    var scene = new Scene(engine);

    var camera: UniversalCamera = new UniversalCamera(
      "Camera",
      new Vector3(-86, 0, -52),
      scene
    );

    camera.attachControl(canvas, true);
    var light1: HemisphericLight = new HemisphericLight(
      "light1",
      new Vector3(1, 1, 0),
      scene
    );

    let village = await SceneLoader.ImportMeshAsync(
      "",
      ChristmasVillage,
      "",
      scene
    );

    window.addEventListener("keydown", (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "i") {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }
    });

    // run the main render loop

    let xr = await scene.createDefaultXRExperienceAsync({
      floorMeshes: village.meshes.filter((mesh) =>
        mesh.name.includes("RoadTop")
      ),
      optionalFeatures: true,
    });

    engine.runRenderLoop(() => {
      scene.render();
      console.log(camera.position);
    });

    // xr.baseExperience.onStateChangedObservable = () => {};
  }
}
let scene = new App();
scene.loadScene();
