import { Group, BoxGeometry, MeshPhongMaterial, Mesh, Path } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

let horizontalBound = 1; // horizontal movement distance
let slideDist = 0.25; // vertical jump / slide distance
let initPos = {x:0, y:0.5};
let velocityX = 0.05;
let eta = 0.01;

class Book extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.state = {
            vertical : 0,
            horizontal : 0,
            dim : {x:1, y: 0.5, z:1},
            velocityY : 0,
        };

        this.name = 'book';

        const geometry = new BoxGeometry(this.state.dim.x, this.state.dim.y, this.state.dim.z);
        const material = new MeshPhongMaterial({color: 0x44aa88});
        const book = new Mesh(geometry, material);
        this.position.x = initPos.x;
        this.position.y = initPos.y;
        this.add(book);

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {

        const { horizontal } = this.state;

        // horizontal movement
        if (horizontal == -1) { // moving left
            this.position.x += velocityX;
        } else if (horizontal == 1) { // moving right
            this.position.x -= velocityX;
        } else { // moving towards center
            if (this.position.x < initPos.x) {
                this.position.x += velocityX;
            } else if (this.position.x > initPos.x) {
                this.position.x -= velocityX;
            }
            if (this.position.x > 0 - eta && this.position.x < 0 + eta) {
                this.position.x = 0;
            }
        }

        // vertical movement
        if (this.state.vertical == 1) { // jump
            this.position.y += this.state.velocityY;
            this.state.velocityY -= 0.005;
            if (this.position.y < initPos.y) { // hit ground
                this.position.y = initPos.y;
                this.state.velocityY = 0;
                this.state.vertical = 0;
            }
        } else if (this.state.vertical == -1) { // slide
            if (this.state.velocityY < 0) { // going down
                this.position.y += this.state.velocityY;
                this.state.velocityY -= 0.001;
                if (this.state.velocityY < -0.2 ) { // slide end
                    this.state.velocityY = 0.1;
                } 
            } else { // going up
                this.position.y += this.state.velocityY;
                if (this.position.y > initPos.y) { // returned to standing
                    this.position.y = initPos.y;
                    this.state.velocityY = 0;
                    this.state.vertical = 0;
                }
            }
        } else { // no movement

        }

        if (this.position.x > initPos.x + horizontalBound) {
            this.position.x = initPos.x + horizontalBound;
        } else if (this.position.x < initPos.x - horizontalBound) {
            this.position.x = initPos.x - horizontalBound;
        }

        if (this.position.y < initPos.y - slideDist) {
            this.position.y = initPos.y - slideDist;
        }



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

        let intersectX = ((tBox.a.x < oBox.b.x && tBox.a.x > oBox.a.x) || (tBox.b.x < oBox.b.x && tBox.b.x > oBox.a.x)) ||
             ((tBox.a.x <= oBox.b.x && tBox.a.x >= oBox.a.x) && (tBox.b.x <= oBox.b.x && tBox.b.x >= oBox.a.x));
        let intersectY = ((tBox.a.y < oBox.b.y && tBox.a.y > oBox.a.y) || (tBox.b.y < oBox.b.y && tBox.b.y > oBox.a.y)) || 
            ((tBox.a.y <= oBox.b.y && tBox.a.y >= oBox.a.y) && (tBox.b.y <= oBox.b.y && tBox.b.y >= oBox.a.y));
        let intersectZ = ((tBox.a.z < oBox.b.z && tBox.a.z > oBox.a.z) || (tBox.b.z < oBox.b.z && tBox.b.z > oBox.a.z)) || 
            ((tBox.a.z <= oBox.b.z && tBox.a.z >= oBox.a.z) && (tBox.b.z <= oBox.b.z && tBox.b.z >= oBox.a.z));

        return intersectX && intersectY && intersectZ;
    }
}

export default Book;
