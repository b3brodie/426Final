import { Group, Color, BoxGeometry, MeshStandardMaterial, Mesh, PlaneGeometry, MeshBasicMaterial, RepeatWrapping, TextureLoader } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './window.glb';
import texture1 from './textures/4.jpg';

class Wall extends Group {
    constructor(parent, z, last, back) {
        // Call parent Group() constructor
        super();
        this.name = 'wall';
        this.last = last;
        //this.last = last;
        

        if (back) {
            const texture = new TextureLoader().load(texture1);
            texture.anisotropy = 32;
            texture.wrapT = RepeatWrapping;
            texture.wrapS = RepeatWrapping;
            texture.repeat.set(70, 70);

            var geometry = new BoxGeometry(200, 150, 0.15);
            
            const material = new MeshBasicMaterial({ map: texture });
            const cube = new Mesh(geometry, material);

            cube.position.set(0, 0, 500);

            this.add(cube);
            return;
        }

        const texture = new TextureLoader().load(texture1);
        texture.anisotropy = 32;
        texture.wrapT = RepeatWrapping;
        texture.wrapS = RepeatWrapping;
        texture.repeat.set(70, 70);

        var geometry = new BoxGeometry(0.15, 150, 250);
         

        const material = new MeshBasicMaterial({ map: texture });
        const cubeL = new Mesh(geometry, material);
        const cubeR = new Mesh(geometry, material);


        cubeR.position.set(-80, 0, 0);
        cubeL.position.set(80, 0, 0);
        //cube.position.z = 50;
        this.position.z = z;
        this.position.y = -5;
        this.add(cubeL);
        this.add(cubeR);


        if (!last) {
            // Load object
            const loader = new GLTFLoader();
            loader.load(MODEL, (gltf) => {
                let scene = gltf.scene;
                scene.scale.multiplyScalar(1.5);
                scene.position.y = 2;  
                scene.position.x = 77;
                scene.rotateY(- Math.PI / 2);
                this.add(scene);
            });

            loader.load(MODEL, (gltf) => {
                let scene = gltf.scene;
                scene.scale.multiplyScalar(1.5);
                scene.position.y = 2;  
                scene.position.x = -77;
                scene.rotateY(Math.PI / 2);
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
        if (this.position.z < -100) {
            this.position.z = 200;
        }
        // Advance tween animations, if any exist
        TWEEN.update();
    }
    
}

export default Wall;
