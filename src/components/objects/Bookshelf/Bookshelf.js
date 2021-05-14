import { Group, BoxGeometry, MeshPhongMaterial, Mesh, Path } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './shelf2.glb';


class Bookshelf extends Group {
    constructor(parent, z, left) {
        // Call parent Group() constructor
        super();

        this.name = 'bookshelf';
        this.z = z;
        this.position.z = z;
        this.position.y = -5;

        //this.position.x = 0;
        // Load object
        
                
        let loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            let scene1 = gltf.scene;
            scene1.scale.multiplyScalar(1/1.3);
            if (left) {
                scene1.position.x = -25;
            } else {
                scene1.position.x = 30;
            }
            
            scene1.rotateY(Math.PI);
            this.add(scene1);
        });        
        
        loader.load(MODEL, (gltf) => {
            let scene1 = gltf.scene;
            scene1.scale.multiplyScalar(1 / 1.3);
            if (left) {
                scene1.position.x = -50;
            } else {
                scene1.position.x = 55;
            }
            scene1.rotateY(Math.PI);
            this.add(scene1);
        }); 
        
       
        // Add self to parent's update list
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
        this.position.z = this.z;
    }

}

export default Bookshelf;
