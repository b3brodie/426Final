import { Group, Color, BoxGeometry, MeshStandardMaterial, Mesh, PlaneGeometry, MeshBasicMaterial, RepeatWrapping, TextureLoader } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import texture1 from './textures/floor2.jpg';

class Trail extends Group {
    constructor(parent, z) {
        // Call parent Group() constructor
        super();
        this.name = 'trail';
        

        const texture = new TextureLoader().load(texture1);
        texture.anisotropy = 32;
        texture.wrapT = RepeatWrapping;
        texture.wrapS = RepeatWrapping;
        texture.repeat.set(1.5, 100);
        const geometry = new BoxGeometry(3, 0, 250);
        const material = new MeshBasicMaterial({ map: texture });
        const cube = new Mesh(geometry, material);
        
        this.position.y = 0;
        this.position.z = z;
        this.add(cube);

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
        this.position.z -= speed;
        if (this.position.z < -150) {
            this.position.z = 300;
        }
        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default Trail;
