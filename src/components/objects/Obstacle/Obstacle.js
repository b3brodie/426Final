import { Group, BoxGeometry, MeshPhongMaterial, Mesh, TextureLoader, MeshBasicMaterial, RepeatWrapping } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import texture1 from './textures/1.jpg';
import texture2 from './textures/2.jpg';
import texture3 from './textures/3.png';

const redMaterial = new MeshPhongMaterial({color: 0xFF0000});

class Obstacle extends Group {
    constructor(parent, dims, type) {
        // Call parent Group() constructor
        super();

        this.state = {
            dim : dims,
            type : type,
            avoid : [],
            type: -1,
        };

        this.name = 'obstacle';
        this.state.type = type;

        const geometry = new BoxGeometry(dims.x, dims.y, dims.z);
        //const material = new MeshPhongMaterial({color: 0x504030});
        //const obs = new Mesh(geometry, material);
        
        if (type == 0) { // longObstacle
            const texture = new TextureLoader().load(texture1);
            const material = new MeshBasicMaterial({ map: texture });
            const obs = new Mesh(geometry, material);
            this.position.y = 0.5;
            this.resetZ();
            this.add(obs);
            
        } else if (type == 1) { // slidingObstacle
            const texture = new TextureLoader().load(texture2);
            texture.anisotropy = 32;
            const material = new MeshBasicMaterial({ map: texture });
            const textureSides = new TextureLoader().load(texture1);
            const materialSides = new MeshBasicMaterial({ map: textureSides });
            
            const obs = new Mesh(geometry, material);
            this.position.y = 1.8;            

            const g1 = new BoxGeometry(dims.x / 4, dims.y, dims.z);
            const rightSide = new Mesh(g1, materialSides);
            const leftSide = new Mesh(g1, materialSides);

            rightSide.position.x = -2;
            rightSide.position.y = -1;
            leftSide.position.x = 2;
            leftSide.position.y = -1;
            
            this.resetZ();
            this.add(obs);   
            this.add(rightSide, leftSide);

        } else if (type == 2) { // jumpObstacle
            const texture = new TextureLoader().load(texture3);
            texture.anisotropy = 32;
            texture.wrapT = RepeatWrapping;
            texture.wrapS = RepeatWrapping;
            texture.repeat.set(1,1);
            const material = new MeshBasicMaterial({ map: texture });
            const obs = new Mesh(geometry, material);
            this.position.y = 0.5;
            this.resetZ();
            this.add(obs);

        } else if (type == 3) { // tallObstacle
            const texture = new TextureLoader().load(texture1);
            const material = new MeshBasicMaterial({ map: texture });
            const obs = new Mesh(geometry, material);
            this.position.y = 1.5;
            this.resetZ();
            this.add(obs);            
        }        
        // Add self to parent's update list
        parent.addToUpdateList(this);
        parent.addToCollisionList(this);
    }

    changeMaterial(material) {
        for (const chld of this.children) {
            chld.material = material;
        }
    }

    redden(doIt) {
        if (doIt) {
            if (this.state.type == 1) {
                for (const chld of this.children) {
                    chld.material = redMaterial;
                }
            } else {
                this.children[0].material = redMaterial;
            }
        } else {
            if (this.children[0].material != redMaterial) {
                return
            }
            if (this.state.type == 0) {
                const texture = new TextureLoader().load(texture1);
                const material = new MeshBasicMaterial({ map: texture });
                this.children[0].material = material;
            } else if (this.state.type == 1) {
                const texture = new TextureLoader().load(texture2);
                texture.anisotropy = 32;
                const material = new MeshBasicMaterial({ map: texture });
                this.children[0].material = material;
                const textureSides = new TextureLoader().load(texture1);
                const materialSides = new MeshBasicMaterial({ map: textureSides });
                this.children[1].material = materialSides;
                this.children[2].material = materialSides;
            } else if (this.state.type == 2) {
                const texture = new TextureLoader().load(texture3);
                texture.anisotropy = 32;
                texture.wrapT = RepeatWrapping;
                texture.wrapS = RepeatWrapping;
                texture.repeat.set(1,1);
                const material = new MeshBasicMaterial({ map: texture });
                this.children[0].material = material;
            } else if (this.state.type == 3) {
                const texture = new TextureLoader().load(texture1);
                const material = new MeshBasicMaterial({ map: texture });
                this.children[0].material = material;
            }
        }
    }

    addToAvoid(obj) {
        this.state.avoid.push(obj);
    }

    update(timeStamp, speed) {
        this.position.z -= speed;
        if (this.position.z < -30) {
            if (this.state.type == 0 || this.state.type == 3) {
                let pos = Math.floor(Math.random() * 3) - 1;
                this.position.x = pos;
            }
            this.resetZ();
        }
        // Advance tween animations, if any exist
        TWEEN.update();
    }

    resetZ() {
        let variance = Math.random() * 150;
        this.position.z = 150 + variance;
        if (this.state.avoid != undefined) {
            for (const obj of this.state.avoid) {
                if (Math.abs(this.position.z - obj.position.z) < 30) {
                    // console.log("PUSHING FURTHER")
                    this.position.z += 70;
                }
            } 
        }
    }

}

export default Obstacle;
