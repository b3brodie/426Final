import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Trail, Book, Obstacle, Score } from 'objects';
import { BasicLights } from 'lights';

class PlayScene extends Scene {

    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            updateList: [],
            collisionList: [],
            scoreDisplay: null,
            book: null,
            playing: true,
            continuous: true,
            speed: 0.5,
        };

        // Set background to a nice color
        this.background = new Color(0xFFFFFF);

        // Add meshes to scene
        const trail = new Trail();
        const book = new Book(this);
        const obs1 = new Obstacle(this, {x:1, y:1, z:0.5}, 0);
        const obs2 = new Obstacle(this, {x:1, y:2, z:0.5}, 0);
        const slidingObstacle = new Obstacle(this, {x:3, y:2.5, z:1}, 1);
        const score = new Score(this);
        const lights = new BasicLights();
        this.state.book = book;
        this.add(lights, trail, book, obs1, obs2, slidingObstacle, score);
        this.state.gui.add(this.state, 'continuous');
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    addToCollisionList(object) {
        this.state.collisionList.push(object);
    }

    update(timeStamp) {
        const { updateList, collisionList, book, continuous, scoreDisplay } = this.state;

        if (continuous) {
            this.state.playing = true;
        }

        // Call update for each object in the updateList
        if (this.state.playing) {
            if (this.state.speed < 1) {
                this.state.speed += 0.0001
            }
            for (const obj of updateList) {
                obj.update(timeStamp, this.state.speed);
            }

            scoreDisplay.update();

            for (const obj of collisionList) {
                let hit = book.checkCollision(obj);
                if (hit) {
                    this.state.playing = false;
                    break;
                }
            }
        }
    }
}

export default PlayScene;
