/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';

// Initialize core ThreeJS components
const scene = new SeedScene();
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

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
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

    const book = scene.getObjectByName('book');

    function handleKeyUp(event) {
        if (scene.state.playing){
            if (event.keyCode == 38 && book.state.vertical != -1) { // up
                // book.position.y = 0.5;
                // book.state.vertical = 0;
            } else if (event.keyCode == 40 && book.state.vertical != 1) { // down
                // book.position.y = 0.5;
                // book.state.vertical = 0;
            } else if (event.keyCode == 39 && book.state.horizontal != -1) { // right
                book.state.horizontal = 0;
            } else if (event.keyCode == 37 && book.state.horizontal != 1) { // left
                book.state.horizontal = 0;
            }
        }
    }
    function handleKeyDown(event) {
        if (scene.state.playing) {
            if (event.keyCode == 38) { // up
                if (book.state.vertical == 0) {
                    book.state.velocityY = 0.15;
                    book.state.vertical = 1;
                }
            } else if (event.keyCode == 40) { // down
                // book.position.y = 0;
                book.state.vertical = -1;
            } else if (event.keyCode == 39) { // right
                book.state.horizontal = 1;
            } else if (event.keyCode == 37) { // left
                book.state.horizontal = -1;
            }
        }
    }
}
