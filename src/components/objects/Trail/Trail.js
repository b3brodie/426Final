import { Group, Color, BoxGeometry, MeshStandardMaterial, Mesh, PlaneGeometry, MeshBasicMaterial, RepeatWrapping, TextureLoader } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import texture1 from './textures/floor2.jpg';
import texture2 from './textures/floor3.jpg';

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
        const geometry = new BoxGeometry(4, 0, 250);
        const material = new MeshBasicMaterial({ map: texture });
        const cube = new Mesh(geometry, material);
        
        this.position.y = 0;
        this.position.z = z;





        const t2 = new TextureLoader().load(texture2);
        t2.anisotropy = 32;
        t2.wrapT = RepeatWrapping;
        t2.wrapS = RepeatWrapping;
        t2.repeat.set(1, 100);

        const geo = new BoxGeometry(0.5, 0.5, 250);
        const mat = new MeshBasicMaterial({ map: t2 });
        const margin2 = new Mesh(geo, mat);
        const margin1 = new Mesh(geo, mat);        
        margin1.position.x = -2;
        margin2.position.x = 2;

        


        this.add(cube);
        this.add(margin1);
        this.add(margin2);
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
