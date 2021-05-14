/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Fog, Color, Audio, AudioListener, AudioLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PlayScene, TitleScene } from 'scenes';

let state = 0; // game state

// Initialize core ThreeJS components
var playScene = new PlayScene();
// Add fog
playScene.fog = new Fog(new Color(0xe59866), 40, 500);
const titleScene = new TitleScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
camera.position.set(0, 5, -10);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

// Load audio
var listener = new AudioListener();
var music = new Audio( listener );
var audioLoader = new AudioLoader();
audioLoader.load('soundtrack.mp3', function( buffer ) {
    music.setBuffer( buffer );
    music.setLoop( true );
    music.setVolume( 0.25 );
    music.pause();
});

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    if (state == 0) {
        controls.update();
        renderer.render(titleScene, camera);
        titleScene.update && titleScene.update(timeStamp);
    } else if (state == 1) {
        controls.update();
        renderer.render(playScene, camera);
        playScene.update && playScene.update(timeStamp);
    }
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

keyHandler();
function keyHandler() {
    window.addEventListener("keyup", handleKeyUp, true);
    window.addEventListener("keydown", handleKeyDown, true);

    const book = playScene.getObjectByName('book');

    function handleKeyUp(event) {
        if (state == 0) {
            if (event.keyCode == 32) { // space bar
                state = 1; // starts game
                if (!titleScene.state.sound) {
                    console.log("set sound to 0;")
                    music.setVolume(0);
                }
                titleScene.state.gui.hide();
                playScene.addMusic(music);
            }
        } else if (state == 1) {
            if (playScene.state.playing){
                if (event.keyCode == 39 && book.state.horizontal != -1) { // right
                    book.state.horizontal = 0;
                } else if (event.keyCode == 37 && book.state.horizontal != 1) { // left
                    book.state.horizontal = 0;
                }
            } else {
                if (event.keyCode == 32) {
                    playScene.state.lost.setVisibility(false);
                    playScene.restart();
                    playScene.state.book.reset();
                }
            }
        }
    }
    function handleKeyDown(event) {
        if (state == 1) {
            if (playScene.state.playing) {
                if (event.keyCode == 38) { // up
                    if (book.state.vertical == 0 || book.state.vertical == -1) {
                        book.state.velocityY = 0.15;
                        book.state.vertical = 1;
                    }
                } else if (event.keyCode == 40) { // down
                    if (book.state.vertical == 0) {
                        book.state.velocityY = -0.01;
                        book.state.vertical = -1;
                    }
                } else if (event.keyCode == 39) { // right
                    book.state.horizontal = 1;
                } else if (event.keyCode == 37) { // left
                    book.state.horizontal = -1;
                }
            }
        }
    }
}
