import { Group, BoxGeometry, MeshPhongMaterial, AnimationMixer, AnimationClip,  Mesh, Path } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './fire.glb';



/*
let horizontalBound = 1; // horizontal movement distance
let slideDist = 0.25; // vertical jump / slide distance
let initPos = {x:0, y:0.5};
let velocityX = 0.05;
let eta = 0.01;
*/

class Fire extends Group {
    constructor(parent, scale, p) {
        // Call parent Group() constructor
        super();

        this.state = {
            x : p.x,
            y : p.y,
            z : p.z,
            animation: null, 
            mixer: null,
            action: null,
            scene: null,
            prevTimeStamp: null,
        };

        this.name = 'fire';


        this.position.x = p.x
        this.position.y = p.y;
        this.position.z = p.z;
        
        // Load object
        let loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            let scene = gltf.scene.children[0];

            // Multiply and rotate
            scene.scale.multiplyScalar(scale);            
            scene.rotateX(Math.PI / 2);
            //console.log(gltf.animations);
            this.state.animation = gltf.animations[0];

            // add mixer to state
            const mixer = new AnimationMixer(scene);
            this.state.mixer = mixer;

            this.state.action = this.state.mixer.clipAction(this.state.animation);
            //console.log(this.state.action);
            this.state.action.play();
            this.state.scene = scene;            

            this.add(scene);
            
        }); 
        /*
        const geometry = new BoxGeometry(this.state.dim.x, this.state.dim.y, this.state.dim.z);
        const material = new MeshPhongMaterial({color: 0x44aa88});
        const book = new Mesh(geometry, material);
        this.add(book);
        */
        parent.addToUpdateList(this);       
        
    }

    update(timeStamp, speed) {
        
         // animate the fire
         if (this.state.mixer != null){
            if (this.prevTimeStamp == null) {
                this.prevTimeStamp = timeStamp;
            }
            var delta = timeStamp - this.prevTimeStamp;
            this.prevTimeStamp = timeStamp;
            delta = delta / 1000;
            // update animation
            this.state.mixer.update(delta);
         }



        /*
        if (Math.abs((this.position.z - this.state.z) > 0.5)){
            this.position.z = this.state.z;
        } 
        if (Math.abs((this.position.x - this.state.x) > 0.5)){
            this.position.x = this.state.x;
        } 
        
        
        this.resetX() 
        this.resetZ()
        */
        // Advance tween animations, if any exist
        TWEEN.update();
    }
    resetZ() {
        let variance = 0.01;
        variance *= Math.round(Math.random()) ? 1 : -1; // add minus
        this.position.z += variance;
    }

    resetX() {
        let variance = 0.005;
        variance *= Math.round(Math.random()) ? 1 : -1; // add minus
        this.position.x += variance;
    }
}

export default Fire;
