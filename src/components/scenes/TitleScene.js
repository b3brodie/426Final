import * as Dat from 'dat.gui';
import { Scene, Color, TextureLoader } from 'three';
import { TitleText, Magician } from 'objects';
import { BasicLights } from 'lights';
import texture1 from './textures/2.jpg';

class TitleScene extends Scene {

    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            updateList: [],
            sound: false,
        };

        // Set background to a nice color
        //this.background = new Color(0xFFFFFF);
        const loader = new TextureLoader();
        const bgTexture = loader.load(texture1);
        this.background = bgTexture;

        // Add meshes to scene
        const lights = new BasicLights();
        const header = new TitleText(this);
        this.add(lights, header);
        // this.add(lights);
        // Magician
        const angle = -Math.PI / 1.5;
        const mag = new Magician(this, 11, -14, 10, 0, false, angle);
        this.add(mag);
        
        this.state.gui.add(this.state, 'sound');
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