import { Group, BoxGeometry, MeshPhongMaterial, Mesh, Path } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './star.glb';

class ScorePickup extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.state = {
            dim : {x:1, y:0.5, z:1},
        };

        this.name = 'reward';
        
        // Load object
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            let scene = gltf.scene;
            scene.scale.multiplyScalar(4.0);
            this.position.y = 0.5;
            scene.rotateY(Math.PI);
            this.add(scene);
        });
        /*
        const geometry = new BoxGeometry(this.state.dim.x, this.state.dim.y, this.state.dim.z);
        const material = new MeshPhongMaterial({color: 0x43AC1D});
        const obs = new Mesh(geometry, material);
        this.position.y = 0.5;
        this.resetZ();
        this.add(obs);
        */

        // Add self to parent's update list
        parent.addToUpdateList(this);
        parent.addToCollisionList(this);
    }

    update(timeStamp, speed) {
        this.position.z -= speed;
        if (this.position.z < -30) {
            let pos = Math.floor(Math.random() * 3) - 1;
            this.position.x = pos;
            this.resetZ();
        }
        // Advance tween animations, if any exist
        TWEEN.update();
    }

    // avoid is an array of objects that this object should not be close to
    resetZ() {
        let variance = Math.random() * 150;
        this.position.z = 150 + variance;
        let pos = Math.floor(Math.random() * 3) - 1;
        this.position.x = pos;
    }

}

export default ScorePickup;
