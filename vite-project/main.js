import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create a scene
const scene = new THREE.Scene();

// ARBOL
const loader1 = new GLTFLoader();
loader1.load('./arbol.glb', (gltf1) => {
  gltf1.scene.position.set(2, -1, 2);
  gltf1.scene.scale.set(0.6, 0.6, 0.5);
  scene.add(gltf1.scene);
});
// ARBUSTO
const loader2 = new GLTFLoader();
loader1.load('./arbusto.glb', (gltf2) => {
  // Adjust the position, rotation, and scale as needed
  gltf2.scene.position.set(1.90, -1, 2);
  gltf2.scene.scale.set(0.1, 0.1, 0.1);

  // Add the Blender model to the scene
  scene.add(gltf2.scene);
});
// Color de resalte
const colorMaterial = new THREE.MeshStandardMaterial({
  color: "#000000", // f4f4f4 dad2c5
  roughness: 0.5, // Adjust roughness
  metalness: 0, // Adjust metalness
});

//cielo 
const skyBoxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
const materialCielo = [
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./texture/yonder_ft.jpg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./texture/yonder_bk.jpg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./texture/yonder_up.jpg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./texture/yonder_dn.jpg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./texture/yonder_rt.jpg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./texture/yonder_lf.jpg')}),
];

for (let i=0; i<6; i++){
    materialCielo[i].side= THREE.BackSide;
}
const skyBox = new THREE.Mesh(skyBoxGeo, materialCielo);
scene.add(skyBox);

// Concreto
const concreteTexture = new THREE.TextureLoader().load('./pared.jpg');
const escalonTexture = new THREE.TextureLoader().load('./concrete.jpg');
const baldosaTexture = new THREE.TextureLoader().load('./baldosa.jpg');
baldosaTexture.repeat.set(7,7)
// const cieloTexture = new THREE.TextureLoader().load('./cielo.jpg');
// cieloTexture.repeat.set(3,3)

// Piso
const baldosaGeometry = new THREE.BoxGeometry(6, 0.05, 6)  // Width, Height, Depth
const baldosaMaterial = new THREE.MeshStandardMaterial({
  map: baldosaTexture,
  color: "#eeedeb",
  roughness: 0.9, // Adjust roughness
  metalness: 0.1, // Adjust metalness
});
const baldosa = new THREE.Mesh(baldosaGeometry, baldosaMaterial);
baldosa.position.set(0, -1, 1);
scene.add(baldosa);

//Grupo panteon
const panteon = new THREE.Group();
scene.add(panteon); 

// Creo la 1ra caja
const caja1Geometry = new THREE.BoxGeometry(3.2, 2, 3); // Width, Height, Depth
const cajaMaterial = new THREE.MeshStandardMaterial({
  map: concreteTexture,
  color: "#f4f4f4", // f4f4f4 dad2c5 #f4eadc
  roughness: 0.5, // Adjust roughness
  metalness: 0, // Adjust metalness
});
const caja1 = new THREE.Mesh(caja1Geometry, cajaMaterial);
caja1.position.set(0, 0, 0);
panteon.add(caja1);

// Creo la 2da caja
const caja2Geometry = new THREE.BoxGeometry(2.2, 2, 1.5); 
const caja2 = new THREE.Mesh(caja2Geometry, cajaMaterial);
caja2.position.set(0,0,2)
panteon.add(caja2)


// Columnas izquierda

const columnaGeometry = new THREE.CylinderGeometry(0.06, 0.06, 1.95, 16); // R top, R bot, H, R Seg
const columna1 = new THREE.Mesh(columnaGeometry, cajaMaterial);
columna1.position.set(-1, 0, 3.4);
panteon.add(columna1);

const columna2 = new THREE.Mesh(columnaGeometry, cajaMaterial);
columna2.position.set(-0.8, 0, 3.4);
panteon.add(columna2);

const baseColumnaGeometry = new THREE.BoxGeometry(0.22, 0.4, 0.16);  // Width, Height, Depth
const baseColumna1 = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumna1.position.set(-1, -0.85, 3.4); //0.9 a 0.85(0.05 dif)
panteon.add(baseColumna1);

const baseColumna2 = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumna2.position.set(-0.8, -0.85, 3.4);
panteon.add(baseColumna2);

// Columna Izquierda Unica

const columnaUizq = new THREE.Mesh(columnaGeometry, cajaMaterial);
columnaUizq.position.set(-1, 0, 2.8);
panteon.add(columnaUizq);

const baseColumnaUizq = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumnaUizq.position.set(-1, -0.85, 2.8);
panteon.add(baseColumnaUizq);

// Columna Der Unica

const columnaUder = new THREE.Mesh(columnaGeometry, cajaMaterial);
columnaUder.position.set(1, 0, 2.8);
panteon.add(columnaUder);

const baseColumnaUder = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumnaUder.position.set(1, -0.85, 2.8);
panteon.add(baseColumnaUder);

// Primera Columna 
const torusGeometry = new THREE.TorusGeometry(0.067, 0.012, 16, 50); // R, tube R, 
const torus = new THREE.Mesh(torusGeometry, cajaMaterial);
torus.position.set(-1, -0.64, 3.4); // 0.69 a 0.64 dif1
torus.rotation.x = Math.PI / 2;
panteon.add(torus);

const torusSmallGeometry = new THREE.TorusGeometry(0.0652, 0.0062, 16, 50); // R, tube R, 
const torusSmall = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmall.position.set(-1, -0.62, 3.4); // 0.67 a 0.62 dif2
torusSmall.rotation.x = Math.PI / 2;
panteon.add(torusSmall);

//Segunda Columna
const torus1 = new THREE.Mesh(torusGeometry, cajaMaterial);
torus1.position.set(-0.8, -0.64, 3.4);
torus1.rotation.x = Math.PI / 2;
panteon.add(torus1);

const torusSmall1 = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmall1.position.set(-0.8, -0.62, 3.4);
torusSmall1.rotation.x = Math.PI / 2;
panteon.add(torusSmall1);

// Columnas derecha

const columna3 = new THREE.Mesh(columnaGeometry, cajaMaterial);
columna3.position.set(1, 0, 3.4);
panteon.add(columna3);

const columna4 = new THREE.Mesh(columnaGeometry, cajaMaterial);
columna4.position.set(0.8, 0, 3.4);
panteon.add(columna4);

const baseColumna3 = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumna3.position.set(1, -0.85, 3.4);
panteon.add(baseColumna3);

const baseColumna4 = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumna4.position.set(0.8, -0.85, 3.4);
panteon.add(baseColumna4);

// Detalles Columna Derecha

const torus2 = new THREE.Mesh(torusGeometry, cajaMaterial);
torus2.position.set(0.8, -0.64, 3.4);
torus2.rotation.x = Math.PI / 2;
panteon.add(torus2);

const torusSmall2 = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmall2.position.set(0.8, -0.62, 3.4);
torusSmall2.rotation.x = Math.PI / 2;
panteon.add(torusSmall2);

const torus3 = new THREE.Mesh(torusGeometry, cajaMaterial);
torus3.position.set(1, -0.64, 3.4);
torus3.rotation.x = Math.PI / 2;
panteon.add(torus3);

const torusSmall3 = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmall3.position.set(1, -0.62, 3.4);
torusSmall3.rotation.x = Math.PI / 2;
panteon.add(torusSmall3);

// Columnas centrales

const columna5 = new THREE.Mesh(columnaGeometry, cajaMaterial);
columna5.position.set(0.3, 0, 3.4);
panteon.add(columna5);

const columna6 = new THREE.Mesh(columnaGeometry, cajaMaterial);
columna6.position.set(-0.3, 0, 3.4);
panteon.add(columna6);

const baseColumna5 = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumna5.position.set(0.3, -0.85, 3.4);
panteon.add(baseColumna5);

const baseColumna6 = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumna6.position.set(-0.3, -0.85, 3.4);
panteon.add(baseColumna6);

// Detalles Columna Centrales
const torus4 = new THREE.Mesh(torusGeometry, cajaMaterial);
torus4.position.set(0.3, -0.64, 3.4);
torus4.rotation.x = Math.PI / 2;
panteon.add(torus4);
const torusSmall4 = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmall4.position.set(0.3, -0.62, 3.4);
torusSmall4.rotation.x = Math.PI / 2;
panteon.add(torusSmall4);
const torus5 = new THREE.Mesh(torusGeometry, cajaMaterial);
torus5.position.set(-0.3, -0.64, 3.4);
torus5.rotation.x = Math.PI / 2;
panteon.add(torus5);
const torusSmall5 = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmall5.position.set(-0.3, -0.62, 3.4);
torusSmall5.rotation.x = Math.PI / 2;
panteon.add(torusSmall5);

// Detalles columnas Unicas

const torusUizq = new THREE.Mesh(torusGeometry, cajaMaterial);
torusUizq.position.set(-1, -0.64, 2.8);
torusUizq.rotation.x = Math.PI / 2;
panteon.add(torusUizq);

const torusSmallUizq = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmallUizq.position.set(-1, -0.62, 2.8);
torusSmallUizq.rotation.x = Math.PI / 2;
panteon.add(torusSmallUizq);

const torusUder = new THREE.Mesh(torusGeometry, cajaMaterial);
torusUder.position.set(1, -0.64, 2.8);
torusUder.rotation.x = Math.PI / 2;
panteon.add(torusUder);

const torusSmallUder = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmallUder.position.set(1, -0.62, 2.8);
torusSmallUder.rotation.x = Math.PI / 2;
panteon.add(torusSmallUder);

// Escalones

const escalonCortoGeometry1 = new THREE.BoxGeometry(1.75, 0.05, 1)  // Width, Height, Depth
const escalonMaterial = new THREE.MeshStandardMaterial({
  map: escalonTexture,
  color: "#a2aaaf",
  roughness: 0.5, // Adjust roughness
  metalness: 0.1, // Adjust metalness
});

const escalon1 = new THREE.Mesh(escalonCortoGeometry1, escalonMaterial);
escalon1.position.set(0, -0.705, 2.85); //2.75
panteon.add(escalon1);

const escalonCortoGeometry2 = new THREE.BoxGeometry(1.85, 0.05, 1)
const escalon2 = new THREE.Mesh(escalonCortoGeometry2, escalonMaterial)
escalon2.position.set(0,-0.755,2.95);
panteon.add(escalon2);

const escalonCortoGeometry3 = new THREE.BoxGeometry(1.55, 0.05, 1)
const escalon3 = new THREE.Mesh(escalonCortoGeometry3, escalonMaterial)
escalon3.position.set(0,-0.805,3.05);
panteon.add(escalon3);

const escalonCortoGeometry4 = new THREE.BoxGeometry(1.65, 0.05, 1)
const escalon4 = new THREE.Mesh(escalonCortoGeometry4, escalonMaterial)
escalon4.position.set(0,-0.855,3.15);
panteon.add(escalon4);

const escalonCortoGeometry5 = new THREE.BoxGeometry(1.75, 0.05, 1)
const escalon5 = new THREE.Mesh(escalonCortoGeometry5, escalonMaterial)
escalon5.position.set(0,-0.905,3.25);
panteon.add(escalon5);

const escalonCortoGeometry6 = new THREE.BoxGeometry(1.85, 0.05, 1)
const escalon6 = new THREE.Mesh(escalonCortoGeometry6, escalonMaterial)
escalon6.position.set(0,-0.955,3.35);
panteon.add(escalon6);

// escalones izq

const escalonCortoGeometry2a = new THREE.BoxGeometry(1.45, 0.05, 0.55)
const escalon2a = new THREE.Mesh(escalonCortoGeometry2a, escalonMaterial)
escalon2a.position.set(-0.42,-0.755,3.03);
panteon.add(escalon2a);

const escalonCortoGeometry3a = new THREE.BoxGeometry(1.55, 0.05,0.55)
const escalon3a = new THREE.Mesh(escalonCortoGeometry3a, escalonMaterial)
escalon3a.position.set(-0.44,-0.805,3.03);
panteon.add(escalon3a);

const escalonCortoGeometry4a = new THREE.BoxGeometry(1.65, 0.05, 0.55)
const escalon4a = new THREE.Mesh(escalonCortoGeometry4a, escalonMaterial)
escalon4a.position.set(-0.46,-0.855,3.03);
panteon.add(escalon4a);

const escalonCortoGeometry5a = new THREE.BoxGeometry(1.75, 0.05, 0.58)
const escalon5a = new THREE.Mesh(escalonCortoGeometry5a, escalonMaterial)
escalon5a.position.set(-0.48,-0.905,3.065);
panteon.add(escalon5a);

const escalonCortoGeometry6a = new THREE.BoxGeometry(1.85, 0.05, 0.65)
const escalon6a = new THREE.Mesh(escalonCortoGeometry6a, escalonMaterial)
escalon6a.position.set(-0.5,-0.955,3.1);
panteon.add(escalon6a);

// escalones der

const escalonCortoGeometry2b = new THREE.BoxGeometry(1.45, 0.05, 0.55)
const escalon2b = new THREE.Mesh(escalonCortoGeometry2b, escalonMaterial)
escalon2b.position.set(0.42,-0.755,3.03);
panteon.add(escalon2b);

const escalonCortoGeometry3b = new THREE.BoxGeometry(1.55, 0.05,0.55)
const escalon3b = new THREE.Mesh(escalonCortoGeometry3b, escalonMaterial)
escalon3b.position.set(0.44,-0.805,3.03);
panteon.add(escalon3b);

const escalonCortoGeometry4b = new THREE.BoxGeometry(1.65, 0.05, 0.55)
const escalon4b = new THREE.Mesh(escalonCortoGeometry4b, escalonMaterial)
escalon4b.position.set(0.46,-0.855,3.03);
panteon.add(escalon4b);

const escalonCortoGeometry5b = new THREE.BoxGeometry(1.75, 0.05, 0.58)
const escalon5b = new THREE.Mesh(escalonCortoGeometry5b, escalonMaterial)
escalon5b.position.set(0.48,-0.905,3.065);
panteon.add(escalon5b);

const escalonCortoGeometry6b = new THREE.BoxGeometry(1.85, 0.05, 0.65)
const escalon6b = new THREE.Mesh(escalonCortoGeometry6b, escalonMaterial)
escalon6b.position.set(0.5,-0.955,3.1);
panteon.add(escalon6b);

//Techo
const techoColGeometry6 = new THREE.BoxGeometry(2.2, 0.15, 0.95)
const techoCol = new THREE.Mesh(techoColGeometry6, cajaMaterial)
techoCol.position.set(0,0.9,3);
panteon.add(techoCol);

// Cupula
const points = [];
for ( let i = 0; i < 10; i ++ ) {
	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
const cupulaGeometry = new THREE.LatheGeometry( points );
const cupula = new THREE.Mesh( cupulaGeometry, cajaMaterial );
cupula.position.set(0, 3, 0);
cupula.scale.set(0.053, 0.053, 0.053);
cupula.rotation.z = Math.PI;  // 180 grados en radianes
panteon.add( cupula );

// Cupula Medio
const cupulaMedioGeometry = new THREE.CylinderGeometry(0.8, 0.8, 1.2, 16); // R top, R bot, H, R Seg
const cupulaMedio = new THREE.Mesh(cupulaMedioGeometry, cajaMaterial);
cupulaMedio.position.set(0, 1.9, 0);
panteon.add(cupulaMedio);

// Cupula Base
const cupulaBaseGeometry = new THREE.BoxGeometry(1.3,0.8,1.8) // Width, Height, Depth
const cupulaBase = new THREE.Mesh(cupulaBaseGeometry, cajaMaterial)
cupulaBase.position.set(0,1,0);
panteon.add(cupulaBase);
const cupulaBaseGeometry2 = new THREE.BoxGeometry(1.8,0.8,1.3) // Width, Height, Depth
const cupulaBase2 = new THREE.Mesh(cupulaBaseGeometry2, cajaMaterial)
cupulaBase2.position.set(0,1,0);
panteon.add(cupulaBase2);
const cupulaBaseGeometry3 = new THREE.BoxGeometry(1.3,0.05,1.8) // Width, Height, Depth
const cupulaBase3 = new THREE.Mesh(cupulaBaseGeometry3, baldosaMaterial)
cupulaBase3.position.set(0,1.45,0);
panteon.add(cupulaBase3);
const cupulaBaseGeometry4 = new THREE.BoxGeometry(1.8,0.05,1.3) // Width, Height, Depth
const cupulaBase4 = new THREE.Mesh(cupulaBaseGeometry4, baldosaMaterial)
cupulaBase4.position.set(0,1.45,0);
panteon.add(cupulaBase4);

// Techo triangular ///////////////////////////////////////////////

const triangleShape = new THREE.Shape();
triangleShape.moveTo(0, 0);
triangleShape.lineTo(1.1, 0); // largo
triangleShape.lineTo(0, 0.5); // alto
triangleShape.lineTo(0, 0);

const extrudeSettings = {
  steps: 2,
  depth: 1, 
  bevelEnabled: false, 
};
const triangleGeometry = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);
const triangle = new THREE.Mesh(triangleGeometry, cajaMaterial);
triangle.position.set(0,0.955,2.5)
panteon.add(triangle);
const triangleGeometry2 = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);
const triangle2 = new THREE.Mesh(triangleGeometry2, cajaMaterial);
triangle2.rotation.y = Math.PI 
triangle2.position.set(0,0.955,3.5)
panteon.add(triangle2);

//prueba de grupo
// Mover, rotar y escalar el grupo
// panteon.position.set(2, 0, 0); // Mover el grupo
// panteon.rotation.set(0, Math.PI / 4, 0); // Rotar el grupo
// panteon.scale.set(2, 2, 2); // Escalar el grupo

////////////////////////////////////////////////////////////////////////////////

// Light
const light = new THREE.PointLight(0xffffff, 1, 10);
light.position.set(-2, 1.2, 5);
scene.add(light);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 2.5) // Adjust ambient light
scene.add(ambientLight);

// Camera
const camera = new THREE.PerspectiveCamera(50, 1500 / 800);
camera.position.x = -2.5;
camera.position.y = 1;
camera.position.z = 9;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(1500, 800);

// Color fondo
//renderer.setClearColor("#c2d7ea"); // Use any valid CSS color value


// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
//controls.maxPolarAngle = Math.PI / 2;

// Animation loop
function animate() {
  // Update controls
  controls.update();

  // Render the scene with the updated camera and cube position
  renderer.render(scene, camera);

  // Call animate again on the next frame
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();
