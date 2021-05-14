import { Group, BoxGeometry, MeshPhongMaterial, Mesh } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

class Obstacle extends Group {
    constructor(parent, dims, type) {
        // Call parent Group() constructor
        super();

        this.state = {
            dim : dims,
            type : type,
            avoid : [],
        };

        this.name = 'obstacle';
        
        const geometry = new BoxGeometry(dims.x, dims.y, dims.z);
        const material = new MeshPhongMaterial({color: 0x504030});
        const obs = new Mesh(geometry, material);
        if (type == 0) {
            this.position.y = 0.5;
        } else if (type == 1) {
            this.position.y = 1.8;
        } else if (type == 2) {
            this.position.y = 0.5;
        } else if (type == 3) {
            this.position.y = 1.5;
        }
        this.resetZ();
        this.add(obs);

        // Add self to parent's update list
        parent.addToUpdateList(this);
        parent.addToCollisionList(this);
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
