import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Trail } from 'objects';
import { BasicLights } from 'lights';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0xFFFFFF);

        // Add meshes to scene
        // const land = new Land();
        const trail = new Trail();
        const flower = new Flower(this);
        const lights = new BasicLights();
        this.add(flower, lights, trail);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { updateList } = this.state;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;
