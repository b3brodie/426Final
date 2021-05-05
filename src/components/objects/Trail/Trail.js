import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

class Trail extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        this.name = 'trail';

        const geometry = new BoxGeometry(3, 0, 250);
        const material = new MeshBasicMaterial({color: 0xaaaaaa});
        const cube = new Mesh(geometry, material);
        cube.position.z = 50;
        this.add(cube);
    }
}

export default Trail;
