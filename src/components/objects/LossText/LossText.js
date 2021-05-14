import { Group, TextGeometry, MeshPhongMaterial, Mesh, FontLoader } from 'three';

class LossText extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'losstext';

        const loader = new FontLoader();
        loader.load('font.json', function(font) {
            var material = new MeshPhongMaterial({color: 0x000000});
            material.shininess = 150;

            // restart instructions
            var instructions = new TextGeometry("Press Space to Restart", {
                font: font,
                size: 75,
                height: 0,
                curveSegments: 10,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            });
    
            var mesh2 = new Mesh(instructions, material);
            mesh2.position.set(5, 1, -1);
            mesh2.rotation.set(0, Math.PI, 0);
            mesh2.scale.multiplyScalar(0.01);
            mesh2.castShadow = true;
            parent.add(mesh2);
        });

    }
}

export default LossText;
