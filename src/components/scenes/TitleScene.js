import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { TitleText } from 'objects';
import { BasicLights } from 'lights';

class TitleScene extends Scene {

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
        const lights = new BasicLights();
        // const header = new TitleText(this);
        // this.add(lights, header);
        this.add(lights);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }
    
    update(timeStamp) {
        const {updateList} = this.state;
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default TitleScene;