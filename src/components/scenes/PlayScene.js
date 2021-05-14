import * as Dat from 'dat.gui';
import { Scene, Color, MeshPhongMaterial, Audio, AudioListener, AudioLoader } from 'three';
import { Trail, Book, Obstacle, Score, ScorePickup, Desk, Board, Wall, Magician, Bookshelf, LossText } from 'objects';
import { BasicLights } from 'lights';
import Land from '../objects/Land/Land';
import { Fire, Top, Cat, Desk2, Desk3, Chair, Bookshelf2 } from '../objects';

import earningSound from './music/earning.wav';
import hitSound from './music/hit.wav';

const brownMaterial = new MeshPhongMaterial({color: 0x504030});
const redMaterial = new MeshPhongMaterial({color: 0xFF0000});

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
            lost: null,
            mute: true,
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

        const t1 = new Top(this, 50, false);
        const t2 = new Top(this, 150, false);
        const t3 = new Top(this, 250, false);
        const t4 = new Top(this, 350, true);
        //const land5 = new Land(this, 250);

        const wall1 = new Wall(this, 100, false, false);
        const wall2 = new Wall(this, 200, false, false);
        const wall3 = new Wall(this, 300, false, false);
        const wall4 = new Wall(this, 340, true, false);
        // backwall
        const back = new Wall(this, 0, false, true);
        
        const angle = - Math.PI / 1.5;
        const angle2 = - Math.PI / 1.5;
        const cangle = - Math.PI / 2; 
        //---------------------------------------------------------------------------------------
        // Leftside
        const desk1 = new Desk(this, 35);
        const desk2 = new Desk(this, 10); 
        
        const boardL1 = new Board(this, 30, 45);
        const boardL2 = new Board(this, 50, 45);
        
        
        // shelves on the left side
        const ls1 = new Bookshelf(this, 70, false);
        const ls2 = new Bookshelf(this, 90, false);
        const ls3 = new Bookshelf(this, 110, false);
        const ls4 = new Bookshelf(this, 130, false);

        const d1 = new Desk2(this, 30, 160);
        const chairR1 = new Chair(this, 30, 180, cangle); 
        const chairR2 = new Chair(this, 45, 180, cangle);  
        const chairR3 = new Chair(this, 60, 180, cangle);  
        const d2 = new Desk2(this, 30, 190);
        
        const ls5 =  new Bookshelf(this, 210, false);
        const ls6 = new Bookshelf(this, 230, false);

        const shelfLeft1 = new Bookshelf2(this, 250, false);
        const shelfLeft2 = new Bookshelf2(this, 270, false);
        const shelfLeft3 = new Bookshelf2(this, 290, false);

        const tl1 = new Desk3(this, 15, 320);
        const tl2 = new Desk3(this, 15, 340);    

        // Magician        
        const mag = new Magician(this, 12, -5, 1, 5, true, angle);
                            //     x    y    z
        const cat2 = new Cat(this, 25, -5, 380, 4, true, angle2);

        //---------------------------------------------------------------------------------------
        // Rightside
        // shelves on the right
        const shelf1 = new Bookshelf(this, 10, true);
        const shelf2 = new Bookshelf(this, 30, true);
        const shelf3 = new Bookshelf(this, 50, true);
        const shelf4 = new Bookshelf(this, 70, true);
        const cat = new Cat(this, -12, -5, 1, 5, true, angle);        
        // desk
        const dl1 = new Desk2(this, -60, 100);           
        const dl2 = new Desk2(this, -60, 130);        
        const chairL1 = new Chair(this, -30, 120, cangle);  
        const chairL2 = new Chair(this, -45, 120, cangle);   
        const chairL3 = new Chair(this, -60, 120, cangle);  
        const cat3 = new Cat(this, -30, 0, 160, 0, true, angle);
        const dl3 = new Desk2(this, -60, 160);        


        const tr1 = new Desk3(this, -60, 190);
        const tr2 = new Desk3(this, -60, 210);


        const boardR1 = new Board(this, -30, 175);
        const boardR2 = new Board(this, -50, 175);
        
        const shelf2R = new Bookshelf2(this, 240, true);
        const shelf2R1 = new Bookshelf2(this, 260, true);
        const shelf2R2 = new Bookshelf2(this, 280, true);
        const shelf2R3 = new Bookshelf2(this, 300, true);
        const dl4 = new Desk2(this, -60, 340);
        const chairL4 = new Chair(this, -30, 330, cangle);  
        const chairL5 = new Chair(this, -45, 330, cangle);   
        const chairL6 = new Chair(this, -60, 330, cangle); 

        const boardR3 = new Board(this, -30, 360);
        const boardR4 = new Board(this, -50, 360);

        

        //------------------------------------------------------------------------------
        // Fire
        const fireMiddle = new Fire(this, 1, {x:0, y:1, z:-7});
        const fireLeft = new Fire(this, 2, {x:2, y:1, z:-12});
        const fireRight = new Fire(this, 2, {x:-2, y:1, z:-12});

        
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
        const lossText = new LossText(this);
        lossText.setVisibility(false);
        this.state.lost = lossText;
        this.state.book = book;
        this.add(lights, book, longObstacle, tallObstacle, slidingObstacle, score, 
            jumpObstacle, sP1, sP2, sP3, sP4, sP5, lossText);
        // ad trail fragments
        this.add(trail1, trail2, trail3);
        this.add(fireMiddle, fireLeft, fireRight);
        this.add(desk1, desk2);
        this.add(boardL1, boardL2, boardR1, boardR2, boardR3, boardR4);
        this.add(mag, cat, cat2, cat3);
        this.add(dl1, dl2, dl3, dl4);
        this.add(d1, d2);
        this.add(tr1, tr2, tl1, tl2);
        this.add(shelfLeft1, shelfLeft2, shelfLeft3);
        this.add(shelf1, shelf2, shelf3, shelf4, ls1, ls2, ls3, ls4, ls5, ls6);
        this.add(shelf2R1, shelf2R2, shelf2R3, shelf2R);
        this.add(wall1, wall2, wall3, wall4, back);
        this.add(chairL1, chairL2, chairL3, chairR1, chairR2, chairR3, chairL4, chairL5, chairL6);
        // add land fragments       
        this.add(land1, land2, land3, land4);
        this.add(t1, t2, t3, t4);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    addToCollisionList(object) {
        this.state.collisionList.push(object);
    }

    addMusic(music) {
        this.state.music = music;
        if (!this.state.mute) {
            music.play();
        }
    }

    // restarts the game
    restart() {
        const { updateList, scoreDisplay } = this.state;
        for (const obj of updateList) {
            if (obj instanceof Obstacle || obj instanceof ScorePickup || obj instanceof Desk || obj instanceof Board
                || obj instanceof Bookshelf || obj instanceof Magician || obj instanceof Desk2 || obj instanceof Cat
                || obj instanceof Chair || obj instanceof Bookshelf2 || obj instanceof Desk3) {
                obj.resetZ();
            }
            if (obj instanceof Obstacle) {
                obj.redden(false);
            }
        }
        scoreDisplay.reset();
        this.state.playing = true;
        this.state.speed = 0.5;
        if (!this.state.mute) {
            this.state.music.play();
        }
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
                        // Load audio
                        if (this.state.mute == false){
                            var listener = new AudioListener();
                            var music = new Audio( listener );
                            var audioLoader = new AudioLoader();
                            audioLoader.load(hitSound, function( buffer ) {
                                music.setBuffer( buffer );
                                music.setLoop( false );
                                music.setVolume( 0.50 );
                                music.play();
                            });

                        }



                        this.state.playing = false;
                        // obj.changeMaterial(redMaterial);
                        obj.redden(true);
                        this.state.lost.setVisibility(true);
                        this.state.music.pause();
                        break;



                    } else if (obj instanceof ScorePickup) {
                        // Load audio
                        if (this.state.mute == false) {
                            var listener = new AudioListener();
                            var music = new Audio( listener );
                            var audioLoader = new AudioLoader();
                            audioLoader.load(earningSound, function( buffer ) {
                                music.setBuffer( buffer );
                                music.setLoop( false );
                                music.setVolume( 0.50 );
                                music.play();
                            });

                        } 
                        
                        obj.resetZ();
                        scoreDisplay.increase(10);
                    }
                }
            }
        }
    }
}

export default PlayScene;
