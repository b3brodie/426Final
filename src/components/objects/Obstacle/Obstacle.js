import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

class Obstacle extends Group {
    constructor(parent, dims) {
        // Call parent Group() constructor
        super();

        this.state = {
            dim : dims,
        };

        this.name = 'obstacle';
        
        const geometry = new BoxGeometry(dims.x, dims.y, dims.z);
        const material = new MeshBasicMaterial({color: 0x444444});
        const obs = new Mesh(geometry, material);
        obs.position.y = 0.5;
        this.add(obs);

        // Add self to parent's update list
        parent.addToUpdateList(this);
        parent.addToCollisionList(this);
    }

    update() {
        this.position.z -= 0.5;
        if (this.position.z < -30) {
            let pos = Math.floor(Math.random() * 3) - 1;
            let variance = Math.random() * 10;
            this.position.z = 180 + variance;
            this.position.x = pos;
        }
        // Advance tween animations, if any exist
        TWEEN.update();
    }

}

export default Obstacle;
