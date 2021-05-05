import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Trail, Book, Obstacle } from 'objects';
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
        const trail = new Trail();
        const book = new Book();
        const obs1 = new Obstacle(this, {x:1, y:1, z:0.5});
        const obs2 = new Obstacle(this, {x:1, y:2, z:0.5});
        const lights = new BasicLights();
        this.add(lights, trail, book, obs1, obs2);
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
