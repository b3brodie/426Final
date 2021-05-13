import { Group, BoxGeometry, MeshPhongMaterial, Mesh, Path } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './board.glb';


class Board extends Group {
    constructor(parent, z) {
        // Call parent Group() constructor
        super();

        this.name = 'board';

        this.position.z = z;
        this.position.y = -5;
        //this.position.x = 0;
        // Load object
        let loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            let scene1 = gltf.scene;
            scene1.scale.multiplyScalar(60.0);
            scene1.position.x = 30;
            scene1.rotateY(Math.PI);
            this.add(scene1);
        }); 
        loader.load(MODEL, (gltf) => {
            let scene1 = gltf.scene;
            scene1.scale.multiplyScalar(60.0);
            scene1.position.x = 60;
            scene1.rotateY(Math.PI);
            this.add(scene1);
        }); 
        /*
        loader.load(MODEL, (gltf) => {
            let scene1 = gltf.scene;
            scene1.scale.multiplyScalar(1.0 / 120);
            scene1.position.x = -15;
            
            scene1.rotateY(Math.PI);
            this.add(scene1);
        }); 
        */
        /*
        const geometry = new BoxGeometry(this.state.dim.x, this.state.dim.y, this.state.dim.z);
        const material = new MeshPhongMaterial({color: 0x44aa88});
        const book = new Mesh(geometry, material);
        this.add(book);
        */
        
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

export default Board;
