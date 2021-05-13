import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Trail, Book, Obstacle, Score, ScorePickup, Desk, Board, Wall, Magician, Bookshelf} from 'objects';
import { BasicLights } from 'lights';
import Land from '../objects/Land/Land';
import { Fire } from '../objects';

class PlayScene extends Scene {

    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            // gui: new Dat.GUI(), // Create GUI for scene
            updateList: [],
            collisionList: [],
            scoreDisplay: null,
            book: null,
            playing: true,
            continuous: false,
            speed: 0.5,
        };

        // Set background to a nice color
        this.background = new Color(0xFFFFFF);

        // Add meshes to scene
        const trail1 = new Trail(this, 50);
        const trail2 = new Trail(this, 200);
        const trail3 = new Trail(this, 350);
        //const trail4 = new Trail(this, 0);


        const land1 = new Land(this, 50, false);
        const land2 = new Land(this, 150, false);
        const land3 = new Land(this, 250, false);
        const land4 = new Land(this, 350, true);
        //const land5 = new Land(this, 250);

        const wall1 = new Wall(this, 100, false);
        const wall2 = new Wall(this, 200, false);
        const wall3 = new Wall(this, 300, false);
        const wall4 = new Wall(this, 340, true);
        
        

        const desk1 = new Desk(this, 35);
        const desk2 = new Desk(this, 5); 
        const board = new Board(this, 45);


        const shelf1 = new Bookshelf(this, 10);
        const shelf2 = new Bookshelf(this, 30);
        const shelf3 = new Bookshelf(this, 50);
        const shelf4 = new Bookshelf(this, 70);
        

        // Fire
        const fireMiddle = new Fire(this, 1, {x:0, y:1, z:-7});
        const fireLeft = new Fire(this, 2, {x:2, y:1, z:-12});
        const fireRight = new Fire(this, 2, {x:-2, y:1, z:-12});

        // Magician
        const mag = new Magician(this, 1);

        const book = new Book(this);
        const longObstacle = new Obstacle(this, {x:1, y:1, z:10}, 0);
        const tallObstacle = new Obstacle(this, {x:1, y:3, z:0.5}, 3);
        const jumpObstacle = new Obstacle(this, {x:3, y:1, z:1}, 2);
        const slidingObstacle = new Obstacle(this, {x:3, y:2.5, z:1}, 1);
        jumpObstacle.addToAvoid(slidingObstacle);
        slidingObstacle.addToAvoid(jumpObstacle);
        const sP1 = new ScorePickup(this);
        const sP2 = new ScorePickup(this);
        const sP3 = new ScorePickup(this);
        const sP4 = new ScorePickup(this);
        const sP5 = new ScorePickup(this);
        const score = new Score(this);
        const lights = new BasicLights();
        this.state.book = book;
        this.add(lights, book, longObstacle, tallObstacle, slidingObstacle, score, jumpObstacle, sP1, sP2, sP3, sP4, sP5);
        // this.add(lights, book, longObstacle, tallObstacle, slidingObstacle, jumpObstacle);
        // ad trail fragments
        this.add(trail1, trail2, trail3);
        this.add(fireMiddle, fireLeft, fireRight);
        this.add(desk1, desk2, board);
        this.add(mag);
        
        this.add(shelf1, shelf2, shelf3, shelf4);
        this.add(wall1, wall2, wall3, wall4);
        // add land fragments        
        this.add(land1, land2, land3, land4);
        // this.state.gui.add(this.state, 'continuous');
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
                    if (obj instanceof Obstacle) {
                        this.state.playing = false;
                        break;
                    } else if (obj instanceof ScorePickup) {
                        obj.resetZ();
                        scoreDisplay.increase(10);
                    }
                }
            }
        }
    }
}

export default PlayScene;
