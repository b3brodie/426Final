import { Group, BoxGeometry, MeshPhongMaterial, Mesh } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

class Obstacle extends Group {
    constructor(parent, dims, type) {
        // Call parent Group() constructor
        super();

        this.state = {
            dim : dims,
            type : type,
        };

        this.name = 'obstacle';
        
        const geometry = new BoxGeometry(dims.x, dims.y, dims.z);
        const material = new MeshPhongMaterial({color: 0x444444});
        const obs = new Mesh(geometry, material);
        if (type == 0) {
            this.position.y = 0.5;
        } else if (type == 1) {
            this.position.y = 1.75;
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
    }

}

export default Obstacle;
