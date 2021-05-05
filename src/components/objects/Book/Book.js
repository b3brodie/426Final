import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

class Book extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        this.state = {
            vertical : 0,
            horizontal : 0,
        };

        this.name = 'book';
        
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({color: 0x44aa88});
        const cube = new Mesh(geometry, material);
        this.position.y = 1;
        this.add(cube);
        console.log(this.position);
    }

    update(timeStamp) {

        // Advance tween animations, if any exist
        TWEEN.update();
    }

}

export default Book;
