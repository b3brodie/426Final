import { Group, TextGeometry, MeshPhongMaterial, Mesh, FontLoader } from 'three';

class TitleText extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'titletext';

        const loader = new FontLoader();
        loader.load('src/style/no_virus.json', function(font) {
            var material = new MeshPhongMaterial({color: 0x000000});
            material.shininess = 150;
    
            // title
            var title = new TextGeometry("Tome Runner", {
                font: font,
                size: 250,
                height: 0,
                curveSegments: 10,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            });
    
            var mesh1 = new Mesh(title, material);
            mesh1.position.set(10, -3, 20);
            mesh1.rotation.set(0, Math.PI, 0);
            mesh1.scale.multiplyScalar(0.01);
            mesh1.castShadow = true;
            parent.add(mesh1);

            // instructions
            var instructions = new TextGeometry("Press Space to Start", {
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
    
            var mesh1 = new Mesh(instructions, material);
            mesh1.position.set(10, -6, 20);
            mesh1.rotation.set(0, Math.PI, 0);
            mesh1.scale.multiplyScalar(0.01);
            mesh1.castShadow = true;
            parent.add(mesh1);
        });

    }
}

export default TitleText;
