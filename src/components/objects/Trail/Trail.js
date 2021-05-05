import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './trail.gltf';

class Trail extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'trail';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });
    }
}

export default Trail;
