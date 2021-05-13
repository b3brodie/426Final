import { Group, Color, BoxGeometry, MeshStandardMaterial, Mesh, PlaneGeometry, MeshBasicMaterial, RepeatWrapping, TextureLoader } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import texture1 from './textures/1.jpg';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './exit.glb';

class Top extends Group {
    constructor(parent, z, last) {
        // Call parent Group() constructor
        super();
        this.name = 'top';
        this.last = last;
        

        const texture = new TextureLoader().load(texture1);
        texture.anisotropy = 32;
        texture.wrapT = RepeatWrapping;
        texture.wrapS = RepeatWrapping;
        texture.repeat.set(70, 70);
        const geometry = new BoxGeometry(350, 0.15, 350);
        const material = new MeshBasicMaterial({ map: texture });
        const cube = new Mesh(geometry, material);
        
        this.position.z = z;
        this.position.y = 75;
        this.add(cube);

        if (!last) {
            // Load object
            const loader = new GLTFLoader();
            loader.load(MODEL, (gltf) => {
                let scene = gltf.scene;
                scene.scale.multiplyScalar(2);
                scene.position.y = -40;  
                scene.position.x = 0;
                scene.rotateY(- Math.PI / 2);
                this.add(scene);
            });
        }

        /*
        let planeMaterial = new MeshStandardMaterial({
            color: new Color("rgb(61,43,31)"),
        });
        const planeGeometry = new PlaneGeometry(350, 350);
        // Create plane
        const plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.x =  - Math.PI / 2;
        plane.position.set(0, -5, 0);
        this.add(plane);
        */
        // Add self to parent's update list
        parent.addToUpdateList(this);
    }
    update(timeStamp, speed) {
        if (this.last) {
            return;
        }
        this.position.z -= speed;
        if (this.position.z < -150) {
            this.position.z = 250;
        }
        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default Top;
