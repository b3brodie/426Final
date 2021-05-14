import { Group, BoxGeometry, MeshPhongMaterial, Mesh, Path } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './chair.glb';


class Chair extends Group {
    constructor(parent, x, z, angle) {
        // Call parent Group() constructor
        super();

        this.name = 'chair';
        this.z = z;
        this.position.z = z;
        this.position.y = -5;
        //this.position.x = 0;
        // Load object
        let loader = new GLTFLoader();

        
        loader.load(MODEL, (gltf) => {
            let scene1 = gltf.scene;
            scene1.scale.multiplyScalar(800.0);
            scene1.position.x = x;
            scene1.rotateY(angle);
            this.add(scene1);
        });     
                 
        parent.addToUpdateList(this);
    }

    update(timeStamp, speed) {
        this.position.z -= speed;    
        if (this.position.z < -10) {
            this.position.z = 400;
            
        }    
        // Advance tween animations, if any exist
        TWEEN.update();
    }
    resetZ() {
        //let variance = Math.random() * 150;
        this.position.z = this.z;
    }


}

export default Chair;
