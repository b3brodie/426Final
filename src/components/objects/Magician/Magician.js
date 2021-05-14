import { Group, BoxGeometry, MeshPhongMaterial, AnimationMixer, AnimationClip,  Mesh, Path } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Merlin.glb';

class Magician extends Group {
    constructor(parent,x, y, z, animation_nr, moving, angle) {
        // Call parent Group() constructor
        super();

        this.name = 'magician';
        this.state = {
            animation: null, 
            mixer: null,
            action: null,
            scene: null,
            prevTimeStamp: null,
            moving: moving,
        };
        this.position.z = z;
        this.position.y = y;
        //this.position.x = 0;
        // Load object
        let loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            let scene = gltf.scene;
            scene.scale.multiplyScalar(1.5);
            scene.position.x = x;
            scene.rotateY(angle);


            this.state.animation = gltf.animations[animation_nr];

            // add mixer to state
            const mixer = new AnimationMixer(scene);
            this.state.mixer = mixer;

            this.state.action = this.state.mixer.clipAction(this.state.animation);
            //console.log(this.state.action);
            this.state.action.play();
            this.state.scene = scene;            

            this.add(scene);
        }); 
                        
        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp, speed) {
        if (this.state.moving) {
            this.position.z -= speed;    
            if (this.position.z < -10) {
                this.resetZ();            
            }   
        }
         
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
        // Advance tween animations, if any exist
        TWEEN.update();
    }
    resetZ() {
        //let variance = Math.random() * 150;
        this.position.z = 300;
    }


}

export default Magician;
