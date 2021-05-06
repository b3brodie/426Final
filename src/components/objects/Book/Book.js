import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

class Book extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        this.state = {
            vertical : 0,
            horizontal : 0,
            dim : {x:1, y: 0.5, z:1},
        };

        this.name = 'book';

        const geometry = new BoxGeometry(this.state.dim.x, this.state.dim.y, this.state.dim.z);
        const material = new MeshBasicMaterial({color: 0x44aa88});
        const cube = new Mesh(geometry, material);
        this.position.y = 0.5;
        this.add(cube);
    }

    update(timeStamp) {

        // Advance tween animations, if any exist
        TWEEN.update();
    }

    checkCollision(other) {
        let tP = this.position;
        let oP = other.position;
        let tD = this.state.dim;
        let oD = other.state.dim;
        let tBox = {a:{x:tP.x - (tD.x/2),y:tP.y - (tD.y/2),z:tP.z - (tD.z/2)}, 
            b:{x:tP.x + (tD.x/2),y:tP.y + (tD.y/2),z:tP.z + (tD.z/2)}};  // a = lowerleft, b = upperright
        let oBox = {a:{x:oP.x - (oD.x/2),y:oP.y - (oD.y/2),z:oP.z - (oD.z/2)}, 
            b:{x:oP.x + (oD.x/2),y:oP.y + (oD.y/2),z:oP.z + (oD.z/2)}};  // a = lowerleft, b = upperright

        let intersectX = (tBox.a.x <= oBox.b.x && tBox.a.x >= oBox.a.x) || (tBox.b.x <= oBox.b.x && tBox.b.x >= oBox.a.x);
        let intersectY = (tBox.a.y <= oBox.b.y && tBox.a.y >= oBox.a.y) || (tBox.b.y <= oBox.b.y && tBox.b.y >= oBox.a.y);
        let intersectZ = (tBox.a.z <= oBox.b.z && tBox.a.z >= oBox.a.z) || (tBox.b.z <= oBox.b.z && tBox.b.z >= oBox.a.z);

        return intersectX && intersectY && intersectZ;
    }
}

export default Book;
