import { Group, TextGeometry, MeshPhongMaterial, Mesh, FontLoader } from 'three';

class Score extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.state = {
            scoreVal : 0, // full value
            score : 0, // int value
            scoreMesh : null,
            scoreFont : null,
        };


        this.name = 'titletext';

        let temp = this;

        const loader = new FontLoader();
        loader.load('font.json', function(font) {
            var material = new MeshPhongMaterial({color: 0x000000});
            material.shininess = 150;
    
            // title
            var scoreTitle = new TextGeometry("Score", {
                font: font,
                size: 250,
                height: 0,
                curveSegments: 10,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            });
    
            var mesh1 = new Mesh(scoreTitle, material);
            mesh1.position.set(15, 0, 20);
            mesh1.rotation.set(0, Math.PI, 0);
            mesh1.scale.multiplyScalar(0.01);
            mesh1.castShadow = true;
            temp.add(mesh1);

            // instructions
            var score = new TextGeometry("0", {
                font: font,
                size: 150,
                height: 0,
                curveSegments: 10,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            });
    
            var mesh2 = new Mesh(score, material);
            mesh2.position.set(15, -3, 20);
            mesh2.rotation.set(0, Math.PI, 0);
            mesh2.scale.multiplyScalar(0.01);
            mesh2.castShadow = true;
            temp.add(mesh2);

            temp.state.scoreMesh = mesh2;
            temp.state.scoreFont = font;
        });

        // Add self to parent's score Display
        parent.state.scoreDisplay = this;

    }

    update () {
        this.state.scoreVal += 0.01;
        if (Math.floor(this.state.scoreVal) > this.state.score) { // score should increase
            this.state.score = Math.floor(this.state.scoreVal);
            var score = new TextGeometry(this.state.score.toString(), {
                font: this.state.scoreFont,
                size: 150,
                height: 0,
                curveSegments: 10,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            });
            this.state.scoreMesh.geometry = score;
        }
    }

    increase(val) {
        this.state.scoreVal += val;
    }

    reset() {
        this.state.scoreVal = 0;
        this.state.score = 0;
        var score = new TextGeometry(this.state.score.toString(), {
            font: this.state.scoreFont,
            size: 150,
            height: 0,
            curveSegments: 10,
            bevelEnabled: false,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        });
        this.state.scoreMesh.geometry = score;
    }
}

export default Score;
