import { Group, BoxGeometry, MeshPhongMaterial, Mesh, Path } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Merlin.glb';


class Magician extends Group {
    constructor(parent, z) {
        // Call parent Group() constructor
        super();

        this.name = 'magician';

        this.position.z = z;
        this.position.y = -5;
        //this.position.x = 0;
        // Load object
        let loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            let scene1 = gltf.scene;
            scene1.scale.multiplyScalar(1.0 / 1.5);
            scene1.position.x = 12;
            scene1.rotateY(- Math.PI / 1.5);
            this.add(scene1);
        }); 
                        
        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp, speed) {
        this.position.z -= speed;    
        if (this.position.z < -10) {
            this.resetZ();
            
        }    
        // Advance tween animations, if any exist
        TWEEN.update();
    }
    resetZ() {
        //let variance = Math.random() * 150;
        this.position.z = 300;
    }


}

export default Magician;
