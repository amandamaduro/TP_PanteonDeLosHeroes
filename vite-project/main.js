import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//Para tener la interfaz que ayuda con las posiciones 
import * as dat from 'dat.gui';



// Create a scene
const scene = new THREE.Scene();



// ARBOL
const loader1 = new GLTFLoader();
loader1.load('./arbol.glb', (gltf1) => {
  gltf1.scene.position.set(2, -1, 2);
  gltf1.scene.scale.set(0.6, 0.6, 0.5);
  gltf1.scene.castShadow = true;
  gltf1.scene.receiveShadow = true;
  scene.add(gltf1.scene);
  
});
// ARBUSTO
const loader2 = new GLTFLoader();
loader1.load('./arbusto.glb', (gltf2) => {
  // Adjust the position, rotation, and scale as needed
  gltf2.scene.position.set(1.90, -1, 2);
  gltf2.scene.scale.set(0.1, 0.1, 0.1);
  gltf2.scene.receiveShadow = true;
  gltf2.scene.castShadow = true;
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
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./texture/cielo/yonder_ft.jpg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./texture/cielo/yonder_bk.jpg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./texture/cielo/yonder_up.jpg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./texture/cielo/yonder_dn.jpg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./texture/cielo/yonder_rt.jpg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./texture/cielo/yonder_lf.jpg')}),
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

//Textura cupula
const cupulaAmbientOclussionTexture = new THREE.TextureLoader().load('./texture/cupula/Tiles071_2K-JPG_AmbientOcclusion.jpg')
const cupulaColorTexture = new THREE.TextureLoader().load('./texture/cupula/Tiles071_2K-JPG_Color.jpg');
const cupulaDisplaymentTexture = new THREE.TextureLoader().load('./texture/cupula/Tiles071_2K-JPG_Displacement.jpg');
const cupulaNormalDXTexture = new THREE.TextureLoader().load('./texture/cupula/Tiles071_2K-JPG_NormalDX.jpg');
const cupulaRoughnessTexture = new THREE.TextureLoader().load('./texture/cupula/Tiles071_2K-JPG_Roughness.jpg');

//Textura bandas cupula 
const bandaAmbientOclussionTexture = new THREE.TextureLoader().load('./texture/cupula/PaintedPlaster014_2K-JPG_AmbientOcclusion.jpg')
const bandaColorTexture = new THREE.TextureLoader().load('./texture/cupula/PaintedPlaster014_2K-JPG_Color.jpg');
const bandaDisplaymentTexture = new THREE.TextureLoader().load('./texture/cupula/PaintedPlaster014_2K-JPG_Displacement.jpg');
const bandaNormalGLTexture = new THREE.TextureLoader().load('./texture/cupula/PaintedPlaster014_2K-JPG_NormalGL.jpg');
const bandaRoughnessTexture = new THREE.TextureLoader().load('./texture/cupula/PaintedPlaster014_2K-JPG_Roughness.jpg');

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
baldosa.castShadow = true;
baldosa.receiveShadow = true;

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
caja1.castShadow = true;
caja1.receiveShadow = true;

// Creo la 2da caja
const caja2Geometry = new THREE.BoxGeometry(2.2, 2, 1.5); 
const caja2 = new THREE.Mesh(caja2Geometry, cajaMaterial);
caja2.position.set(0,0,2)
panteon.add(caja2)
caja2.castShadow = true;
caja2.receiveShadow = true;


// Columnas izquierda

const columnaGeometry = new THREE.CylinderGeometry(0.06, 0.06, 1.95, 16); // R top, R bot, H, R Seg
const columna1 = new THREE.Mesh(columnaGeometry, cajaMaterial);
columna1.position.set(-1, 0, 3.4);
panteon.add(columna1);
columna1.castShadow = true;
columna1.receiveShadow = true;

const columna2 = new THREE.Mesh(columnaGeometry, cajaMaterial);
columna2.position.set(-0.8, 0, 3.4);
panteon.add(columna2);
columna2.castShadow = true;
columna2.receiveShadow = true;

const baseColumnaGeometry = new THREE.BoxGeometry(0.22, 0.4, 0.16);  // Width, Height, Depth
const baseColumna1 = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumna1.position.set(-1, -0.85, 3.4); //0.9 a 0.85(0.05 dif)
panteon.add(baseColumna1);
baseColumna1.castShadow = true;
baseColumna1.receiveShadow = true;

const baseColumna2 = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumna2.position.set(-0.8, -0.85, 3.4);
panteon.add(baseColumna2);
baseColumna2.castShadow = true;
baseColumna2.receiveShadow = true;

// Columna Izquierda Unica

const columnaUizq = new THREE.Mesh(columnaGeometry, cajaMaterial);
columnaUizq.position.set(-1, 0, 2.8);
panteon.add(columnaUizq);
columnaUizq.castShadow = true;
columnaUizq.receiveShadow = true;

const baseColumnaUizq = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumnaUizq.position.set(-1, -0.85, 2.8);
panteon.add(baseColumnaUizq);
baseColumnaUizq.castShadow = true;
baseColumnaUizq.receiveShadow = true;

// Columna Der Unica

const columnaUder = new THREE.Mesh(columnaGeometry, cajaMaterial);
columnaUder.position.set(1, 0, 2.8);
panteon.add(columnaUder);
columnaUder.castShadow = true;
columnaUder.receiveShadow = true;

const baseColumnaUder = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumnaUder.position.set(1, -0.85, 2.8);
panteon.add(baseColumnaUder);
baseColumnaUder.castShadow = true;
baseColumnaUder.receiveShadow = true;

// Primera Columna 
const torusGeometry = new THREE.TorusGeometry(0.067, 0.012, 16, 50); // R, tube R, 
const torus = new THREE.Mesh(torusGeometry, cajaMaterial);
torus.position.set(-1, -0.64, 3.4); // 0.69 a 0.64 dif1
torus.rotation.x = Math.PI / 2;
panteon.add(torus);
torus.castShadow = true;
torus.receiveShadow = true;

const torusSmallGeometry = new THREE.TorusGeometry(0.0652, 0.0062, 16, 50); // R, tube R, 
const torusSmall = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmall.position.set(-1, -0.62, 3.4); // 0.67 a 0.62 dif2
torusSmall.rotation.x = Math.PI / 2;
panteon.add(torusSmall);
torusSmall.castShadow = true;
torusSmall.receiveShadow = true;

//Segunda Columna
const torus1 = new THREE.Mesh(torusGeometry, cajaMaterial);
torus1.position.set(-0.8, -0.64, 3.4);
torus1.rotation.x = Math.PI / 2;
panteon.add(torus1);
torus1.castShadow = true;
torus1.receiveShadow = true;

const torusSmall1 = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmall1.position.set(-0.8, -0.62, 3.4);
torusSmall1.rotation.x = Math.PI / 2;
panteon.add(torusSmall1);
torusSmall1.castShadow = true;
torusSmall1.receiveShadow = true;

// Columnas derecha

const columna3 = new THREE.Mesh(columnaGeometry, cajaMaterial);
columna3.position.set(1, 0, 3.4);
panteon.add(columna3);
columna3.castShadow = true;
columna3.receiveShadow = true;

const columna4 = new THREE.Mesh(columnaGeometry, cajaMaterial);
columna4.position.set(0.8, 0, 3.4);
panteon.add(columna4);
columna4.castShadow = true;
columna4.receiveShadow = true;

const baseColumna3 = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumna3.position.set(1, -0.85, 3.4);
panteon.add(baseColumna3);
baseColumna3.castShadow = true;
baseColumna3.receiveShadow = true;

const baseColumna4 = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumna4.position.set(0.8, -0.85, 3.4);
panteon.add(baseColumna4);
baseColumna4.castShadow = true;
baseColumna4.receiveShadow = true;

// Detalles Columna Derecha

const torus2 = new THREE.Mesh(torusGeometry, cajaMaterial);
torus2.position.set(0.8, -0.64, 3.4);
torus2.rotation.x = Math.PI / 2;
panteon.add(torus2);
torus2.castShadow = true;
torus2.receiveShadow = true;

const torusSmall2 = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmall2.position.set(0.8, -0.62, 3.4);
torusSmall2.rotation.x = Math.PI / 2;
panteon.add(torusSmall2);
torusSmall2.castShadow = true;
torusSmall2.receiveShadow = true;

const torus3 = new THREE.Mesh(torusGeometry, cajaMaterial);
torus3.position.set(1, -0.64, 3.4);
torus3.rotation.x = Math.PI / 2;
panteon.add(torus3);
torus3.castShadow = true;
torus3.receiveShadow = true;

const torusSmall3 = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmall3.position.set(1, -0.62, 3.4);
torusSmall3.rotation.x = Math.PI / 2;
panteon.add(torusSmall3);
torusSmall3.castShadow = true;
torusSmall3.receiveShadow = true;

// Columnas centrales

const columna5 = new THREE.Mesh(columnaGeometry, cajaMaterial);
columna5.position.set(0.3, 0, 3.4);
panteon.add(columna5);
columna5.castShadow = true;
columna5.receiveShadow = true;

const columna6 = new THREE.Mesh(columnaGeometry, cajaMaterial);
columna6.position.set(-0.3, 0, 3.4);
panteon.add(columna6);
columna6.castShadow = true;
columna6.receiveShadow = true;

const baseColumna5 = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumna5.position.set(0.3, -0.85, 3.4);
panteon.add(baseColumna5);
baseColumna5.castShadow = true;
baseColumna5.receiveShadow = true;

const baseColumna6 = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
baseColumna6.position.set(-0.3, -0.85, 3.4);
panteon.add(baseColumna6);
baseColumna6.castShadow = true;
baseColumna6.receiveShadow = true;

// Detalles Columna Centrales
const torus4 = new THREE.Mesh(torusGeometry, cajaMaterial);
torus4.position.set(0.3, -0.64, 3.4);
torus4.rotation.x = Math.PI / 2;
panteon.add(torus4);
torus4.castShadow = true;
torus4.receiveShadow = true;
const torusSmall4 = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmall4.position.set(0.3, -0.62, 3.4);
torusSmall4.rotation.x = Math.PI / 2;
panteon.add(torusSmall4);
torusSmall4.castShadow = true;
torusSmall4.receiveShadow = true;
const torus5 = new THREE.Mesh(torusGeometry, cajaMaterial);
torus5.position.set(-0.3, -0.64, 3.4);
torus5.rotation.x = Math.PI / 2;
panteon.add(torus5);
torus5.castShadow = true;
torus5.receiveShadow = true;
const torusSmall5 = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmall5.position.set(-0.3, -0.62, 3.4);
torusSmall5.rotation.x = Math.PI / 2;
panteon.add(torusSmall5);
torusSmall5.castShadow = true;
torusSmall5.receiveShadow = true;

// Detalles columnas Unicas

const torusUizq = new THREE.Mesh(torusGeometry, cajaMaterial);
torusUizq.position.set(-1, -0.64, 2.8);
torusUizq.rotation.x = Math.PI / 2;
panteon.add(torusUizq);
torusUizq.castShadow = true;
torusUizq.receiveShadow = true;

const torusSmallUizq = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmallUizq.position.set(-1, -0.62, 2.8);
torusSmallUizq.rotation.x = Math.PI / 2;
panteon.add(torusSmallUizq);
torusSmallUizq.castShadow = true;
torusSmallUizq.receiveShadow = true;

const torusUder = new THREE.Mesh(torusGeometry, cajaMaterial);
torusUder.position.set(1, -0.64, 2.8);
torusUder.rotation.x = Math.PI / 2;
panteon.add(torusUder);
torusUder.castShadow = true;
torusUder.receiveShadow = true;

const torusSmallUder = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
torusSmallUder.position.set(1, -0.62, 2.8);
torusSmallUder.rotation.x = Math.PI / 2;
panteon.add(torusSmallUder);
torusSmallUder.castShadow = true;
torusSmallUder.receiveShadow = true;

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
escalon1.castShadow = true;
escalon1.receiveShadow = true;

const escalonCortoGeometry2 = new THREE.BoxGeometry(1.85, 0.05, 1)
const escalon2 = new THREE.Mesh(escalonCortoGeometry2, escalonMaterial)
escalon2.position.set(0,-0.755,2.95);
panteon.add(escalon2);
escalon2.castShadow = true;
escalon2.receiveShadow = true;

const escalonCortoGeometry3 = new THREE.BoxGeometry(1.55, 0.05, 1)
const escalon3 = new THREE.Mesh(escalonCortoGeometry3, escalonMaterial)
escalon3.position.set(0,-0.805,3.05);
panteon.add(escalon3);
escalon3.castShadow = true;
escalon3.receiveShadow = true;

const escalonCortoGeometry4 = new THREE.BoxGeometry(1.65, 0.05, 1)
const escalon4 = new THREE.Mesh(escalonCortoGeometry4, escalonMaterial)
escalon4.position.set(0,-0.855,3.15);
panteon.add(escalon4);
escalon4.castShadow = true;
escalon4.receiveShadow = true;

const escalonCortoGeometry5 = new THREE.BoxGeometry(1.75, 0.05, 1)
const escalon5 = new THREE.Mesh(escalonCortoGeometry5, escalonMaterial)
escalon5.position.set(0,-0.905,3.25);
panteon.add(escalon5);
escalon5.castShadow = true;
escalon5.receiveShadow = true;

const escalonCortoGeometry6 = new THREE.BoxGeometry(1.85, 0.05, 1)
const escalon6 = new THREE.Mesh(escalonCortoGeometry6, escalonMaterial)
escalon6.position.set(0,-0.955,3.35);
panteon.add(escalon6);
escalon6.castShadow = true;
escalon6.receiveShadow = true;

// escalones izq

const escalonCortoGeometry2a = new THREE.BoxGeometry(1.45, 0.05, 0.55)
const escalon2a = new THREE.Mesh(escalonCortoGeometry2a, escalonMaterial)
escalon2a.position.set(-0.42,-0.755,3.03);
panteon.add(escalon2a);
escalon2a.castShadow = true;
escalon2a.receiveShadow = true;

const escalonCortoGeometry3a = new THREE.BoxGeometry(1.55, 0.05,0.55)
const escalon3a = new THREE.Mesh(escalonCortoGeometry3a, escalonMaterial)
escalon3a.position.set(-0.44,-0.805,3.03);
panteon.add(escalon3a);
escalon3a.castShadow = true;
escalon3a.receiveShadow = true;

const escalonCortoGeometry4a = new THREE.BoxGeometry(1.65, 0.05, 0.55)
const escalon4a = new THREE.Mesh(escalonCortoGeometry4a, escalonMaterial)
escalon4a.position.set(-0.46,-0.855,3.03);
panteon.add(escalon4a);
escalon4a.castShadow = true;
escalon4a.receiveShadow = true;

const escalonCortoGeometry5a = new THREE.BoxGeometry(1.75, 0.05, 0.58)
const escalon5a = new THREE.Mesh(escalonCortoGeometry5a, escalonMaterial)
escalon5a.position.set(-0.48,-0.905,3.065);
panteon.add(escalon5a);
escalon5a.castShadow = true;
escalon5a.receiveShadow = true;

const escalonCortoGeometry6a = new THREE.BoxGeometry(1.85, 0.05, 0.65)
const escalon6a = new THREE.Mesh(escalonCortoGeometry6a, escalonMaterial)
escalon6a.position.set(-0.5,-0.955,3.1);
panteon.add(escalon6a);
escalon6a.castShadow = true;
escalon6a.receiveShadow = true;

// escalones der

const escalonCortoGeometry2b = new THREE.BoxGeometry(1.45, 0.05, 0.55)
const escalon2b = new THREE.Mesh(escalonCortoGeometry2b, escalonMaterial)
escalon2b.position.set(0.42,-0.755,3.03);
panteon.add(escalon2b);
escalon2b.castShadow = true;
escalon2b.receiveShadow = true;

const escalonCortoGeometry3b = new THREE.BoxGeometry(1.55, 0.05,0.55)
const escalon3b = new THREE.Mesh(escalonCortoGeometry3b, escalonMaterial)
escalon3b.position.set(0.44,-0.805,3.03);
panteon.add(escalon3b);
escalon3b.castShadow = true;
escalon3b.receiveShadow = true;

const escalonCortoGeometry4b = new THREE.BoxGeometry(1.65, 0.05, 0.55)
const escalon4b = new THREE.Mesh(escalonCortoGeometry4b, escalonMaterial)
escalon4b.position.set(0.46,-0.855,3.03);
panteon.add(escalon4b);
escalon4b.castShadow = true;
escalon4b.receiveShadow = true;

const escalonCortoGeometry5b = new THREE.BoxGeometry(1.75, 0.05, 0.58)
const escalon5b = new THREE.Mesh(escalonCortoGeometry5b, escalonMaterial)
escalon5b.position.set(0.48,-0.905,3.065);
panteon.add(escalon5b);
escalon5b.castShadow = true;
escalon5b.receiveShadow = true;

const escalonCortoGeometry6b = new THREE.BoxGeometry(1.85, 0.05, 0.65)
const escalon6b = new THREE.Mesh(escalonCortoGeometry6b, escalonMaterial)
escalon6b.position.set(0.5,-0.955,3.1);
panteon.add(escalon6b);
escalon6b.castShadow = true;
escalon6b.receiveShadow = true;

//Techo
const techoColGeometry6 = new THREE.BoxGeometry(2.2, 0.15, 0.95)
const techoCol = new THREE.Mesh(techoColGeometry6, cajaMaterial)
techoCol.position.set(0,0.9,3);
panteon.add(techoCol);
techoCol.castShadow = true;
techoCol.receiveShadow = true;

//------------CUPULA 1 (CUPULA MAS GRANDE)-----------------------
//Material de cupula
const cupulaMaterial = new THREE.MeshStandardMaterial({
  color: 0xeeece4,
  map: cupulaColorTexture, // Textura de color
  displacementMap: cupulaDisplaymentTexture, // Textura de desplazamiento
  normalMap: cupulaNormalDXTexture, // Textura normal
  roughnessMap: cupulaRoughnessTexture, // Textura de rugosidad
  aoMap: cupulaAmbientOclussionTexture, // Textura de oclusión ambiental

  // metalness: 0, // Controla el nivel de metalness (ajusta según sea necesario)
  // roughness: 0.6, // Controla la rugosidad (ajusta según sea necesario)
  displacementScale: 0.1, // Escala del desplazamiento (ajústalo según sea necesario)

  // Ajustes adicionales para mejorar el realismo
  envMapIntensity: 1, // Intensidad del mapa de entorno (ajusta según sea necesario)
  side: THREE.DoubleSide, // Renderiza el material en ambas caras del objeto

  // Ajustes para la opacidad
  transparent: true, // Habilita la transparencia
  opacity: 1, // Ajusta la opacidad según sea necesario (valor entre 0 y 1)
});

// Configura las propiedades de repetición de la textura
cupulaMaterial.map.wrapS = THREE.RepeatWrapping;
cupulaMaterial.map.wrapT = THREE.RepeatWrapping;
cupulaMaterial.map.repeat.set(6, 6); // Ajusta el número de repeticiones en dirección S y T

// También configura las propiedades de repetición de otras texturas si es necesario
cupulaMaterial.displacementMap.wrapS = THREE.RepeatWrapping;
cupulaMaterial.displacementMap.wrapT = THREE.RepeatWrapping;
cupulaMaterial.displacementMap.repeat.set(6, 6);

cupulaMaterial.normalMap.wrapS = THREE.RepeatWrapping;
cupulaMaterial.normalMap.wrapT = THREE.RepeatWrapping;
cupulaMaterial.normalMap.repeat.set(6, 6);

cupulaMaterial.roughnessMap.wrapS = THREE.RepeatWrapping;
cupulaMaterial.roughnessMap.wrapT = THREE.RepeatWrapping;
cupulaMaterial.roughnessMap.repeat.set(6, 6);

cupulaMaterial.aoMap.wrapS = THREE.RepeatWrapping;
cupulaMaterial.aoMap.wrapT = THREE.RepeatWrapping;
cupulaMaterial.aoMap.repeat.set(6, 6);

// Geometría de media esfera
const radio = 15; // Radio de la esfera
const anchoSegmento = 32; // Número de segmentos horizontales
const altoSegmento = 16; // Número de segmentos verticales
const phiStart = 0; // Ángulo inicial en radianes
const phiLength = Math.PI * 2; // Longitud del arco en radianes
const cupulaGeometry = new THREE.SphereGeometry(radio, anchoSegmento, altoSegmento, phiStart, phiLength, 0, Math.PI*0.5);
const cupula = new THREE.Mesh(cupulaGeometry, cupulaMaterial);

// Posición, escala y rotación
cupula.position.set(0, 2.5, 0);
cupula.scale.set(0.053, 0.063, 0.053);
//cupula.rotation.x = -Math.PI/2;

panteon.add(cupula);

cupula.castShadow = true;
cupula.receiveShadow = true;

//detalles
//bandas que tiene
const radius =  15;  
const widthSegments = 30;  
const heightSegments = 16;  
const phiStart1 = 0;  
const phiLength1 = Math.PI * 0.04;  
const thetaStart = Math.PI * 0.00;  
const thetaLength = Math.PI/2;  
const bandaGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart1, phiLength1, thetaStart, thetaLength );

const materialBanda = new THREE.MeshStandardMaterial({
  color: 0xfbd5cb,
  map: bandaColorTexture, // Textura de color
  displacementMap: bandaDisplaymentTexture, // Textura de desplazamiento
  normalMap: bandaNormalGLTexture, // Textura normal
  roughnessMap: bandaRoughnessTexture, // Textura de rugosidad
  aoMap: bandaAmbientOclussionTexture, // Textura de oclusión ambiental
  displacementScale: 0.1, // Escala del desplazamiento (ajústalo según sea necesario)

  // Ajustes adicionales para mejorar el realismo
  envMapIntensity: 1, // Intensidad del mapa de entorno (ajusta según sea necesario)
  side: THREE.DoubleSide, // Renderiza el material en ambas caras del objeto

  // Ajustes para la opacidad
  // transparent: true, // Habilita la transparencia
  // opacity: 1, // Ajusta la opacidad según sea necesario (valor entre 0 y 1)
});

// Configura las propiedades de repetición de la textura
materialBanda.map.wrapS = THREE.RepeatWrapping;
materialBanda.map.wrapT = THREE.RepeatWrapping;
materialBanda.map.repeat.set(2, 1); // Ajusta el número de repeticiones en dirección S y T

// También configura las propiedades de repetición de otras texturas si es necesario
materialBanda.displacementMap.wrapS = THREE.RepeatWrapping;
materialBanda.displacementMap.wrapT = THREE.RepeatWrapping;
materialBanda.displacementMap.repeat.set(2, 1);

materialBanda.normalMap.wrapS = THREE.RepeatWrapping;
materialBanda.normalMap.wrapT = THREE.RepeatWrapping;
materialBanda.normalMap.repeat.set(2, 1);

materialBanda.roughnessMap.wrapS = THREE.RepeatWrapping;
materialBanda.roughnessMap.wrapT = THREE.RepeatWrapping;
materialBanda.roughnessMap.repeat.set(2, 1);

materialBanda.aoMap.wrapS = THREE.RepeatWrapping;
materialBanda.aoMap.wrapT = THREE.RepeatWrapping;
materialBanda.aoMap.repeat.set(2, 1);

const banda1 = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda1.position.set(0, 2.51, 0);
banda1.scale.set(0.053, 0.063, 0.053);
panteon.add(banda1);
banda1.rotation.y = Math.PI * 0.06;


const banda1A = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda1A.position.set(0, 2.51, 0);
banda1A.scale.set(0.053, 0.063, 0.053);
panteon.add(banda1A);
banda1A.rotation.y = Math.PI * 0.13;

const banda2 = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda2.position.set(0, 2.51, 0);
banda2.scale.set(0.053, 0.063, 0.053);
panteon.add(banda2);
banda2.rotation.y = Math.PI * 0.28;

const banda2A = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda2A.position.set(0, 2.51, 0);
banda2A.scale.set(0.053, 0.063, 0.053);
panteon.add(banda2A);
banda2A.rotation.y = Math.PI * 0.35;

const banda3 = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda3.position.set(0, 2.51, 0);
banda3.scale.set(0.053, 0.063, 0.053);
panteon.add(banda3);
banda3.rotation.y = Math.PI * 0.51;

const banda3A = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda3A.position.set(0, 2.51, 0);
banda3A.scale.set(0.053, 0.063, 0.053);
panteon.add(banda3A);
banda3A.rotation.y = Math.PI * 0.60;

const banda4 = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda4.position.set(0, 2.51, 0);
banda4.scale.set(0.053, 0.063, 0.053);
panteon.add(banda4);
banda4.rotation.y = Math.PI * 0.78


const banda4A = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda4A.position.set(0, 2.51, 0);
banda4A.scale.set(0.053, 0.063, 0.053);
panteon.add(banda4A);
banda4A.rotation.y = Math.PI * 0.86

const banda5 = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda5.position.set(0, 2.51, 0);
banda5.scale.set(0.053, 0.063, 0.053);
panteon.add(banda5);
banda5.rotation.y = Math.PI * 1.04 

const banda5A = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda5A.position.set(0, 2.51, 0);
banda5A.scale.set(0.053, 0.063, 0.053);
panteon.add(banda5A);
banda5A.rotation.y = Math.PI * 1.12;

const banda6 = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda6.position.set(0, 2.51, 0);
banda6.scale.set(0.053, 0.063, 0.053);
panteon.add(banda6);
banda6.rotation.y = Math.PI * 1.30;

const banda6A = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda6A.position.set(0, 2.51, 0);
banda6A.scale.set(0.053, 0.063, 0.053);
panteon.add(banda6A);
banda6A.rotation.y = Math.PI * 1.38;

const banda7 = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda7.position.set(0, 2.51, 0);
banda7.scale.set(0.053, 0.063, 0.053);
panteon.add(banda7);
banda7.rotation.y = Math.PI * 1.56;


const banda7A = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda7A.position.set(0, 2.51, 0);
banda7A.scale.set(0.053, 0.063, 0.053);
panteon.add(banda7A);
banda7A.rotation.y = Math.PI * 1.64;

const banda8 = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda8.position.set(0, 2.51, 0);
banda8.scale.set(0.053, 0.063, 0.053);
panteon.add(banda8);
banda8.rotation.y = Math.PI * 1.82;

const banda8A = new THREE.Mesh(bandaGeometry, materialBanda);
// Posición, escala y rotación
banda8A.position.set(0, 2.51, 0);
banda8A.scale.set(0.053, 0.063, 0.053);
panteon.add(banda8A);
banda8A.rotation.y = Math.PI * 1.9;

// Cupula Medio
const cupulaMedioGeometry = new THREE.CylinderGeometry(0.8, 0.8, 1.2, 30); // R top, R bot, H, R Seg
const cupulaMedio = new THREE.Mesh(cupulaMedioGeometry, cajaMaterial);
cupulaMedio.position.set(0, 1.9, 0);
panteon.add(cupulaMedio);
cupulaMedio.castShadow = true;
cupulaMedio.receiveShadow = true;



//------------------------------CUPULA 2 PEQUEÑA---------------- 
//Cupula Medio pequeña de arriba donde esta la cruz
const cupulaMedioSmallGeometry = new THREE.CylinderGeometry(0.19, 0.19, 0.8, 30); // R top, R bot, H, R Seg
const cupulaMedioSmall = new THREE.Mesh(cupulaMedioSmallGeometry, cajaMaterial);
cupulaMedioSmall.position.set(0, 3.5, 0);
panteon.add(cupulaMedioSmall);
cupulaMedioSmall.castShadow = true;
cupulaMedioSmall.receiveShadow = true;

//Cupula donde va la cruz
// Geometría de media esfera
const cupulaSmallGeometry = new THREE.SphereGeometry(3.5, 32, 16, phiStart, phiLength, 0, Math.PI*0.5);
const cupulaSmall = new THREE.Mesh(cupulaSmallGeometry, cupulaMaterial);

// Posición, escala y rotación
cupulaSmall.position.set(0, 3.9, 0);
cupulaSmall.scale.set(0.053, 0.063, 0.053);
//cupula.rotation.x = -Math.PI/2;

panteon.add(cupulaSmall);

cupulaSmall.castShadow = true;
cupulaSmall.receiveShadow = true;

// Cupula Base
const cupulaBaseGeometry = new THREE.BoxGeometry(1.3,0.8,1.8) // Width, Height, Depth
const cupulaBase = new THREE.Mesh(cupulaBaseGeometry, cajaMaterial)
cupulaBase.position.set(0,1,0);
panteon.add(cupulaBase);
cupulaBase.castShadow = true;
cupulaBase.receiveShadow = true;

const cupulaBaseGeometry2 = new THREE.BoxGeometry(1.8,0.8,1.3) // Width, Height, Depth
const cupulaBase2 = new THREE.Mesh(cupulaBaseGeometry2, cajaMaterial)
cupulaBase2.position.set(0,1,0);
panteon.add(cupulaBase2);
cupulaBase2.castShadow = true;
cupulaBase2.receiveShadow = true;

const cupulaBaseGeometry3 = new THREE.BoxGeometry(1.3,0.05,1.8) // Width, Height, Depth
const cupulaBase3 = new THREE.Mesh(cupulaBaseGeometry3, baldosaMaterial)
cupulaBase3.position.set(0,1.45,0);
panteon.add(cupulaBase3);
cupulaBase3.castShadow = true;
cupulaBase3.receiveShadow = true;

const cupulaBaseGeometry4 = new THREE.BoxGeometry(1.8,0.05,1.3) // Width, Height, Depth
const cupulaBase4 = new THREE.Mesh(cupulaBaseGeometry4, baldosaMaterial)
cupulaBase4.position.set(0,1.45,0);
panteon.add(cupulaBase4);
cupulaBase4.castShadow = true;
cupulaBase4.receiveShadow = true;

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
triangle.castShadow = true;
triangle.receiveShadow = true;

const triangleGeometry2 = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);
const triangle2 = new THREE.Mesh(triangleGeometry2, cajaMaterial);
triangle2.rotation.y = Math.PI 
triangle2.position.set(0,0.955,3.5)
panteon.add(triangle2);
triangle2.castShadow = true;
triangle2.receiveShadow = true;

panteon.castShadow = true; // El grupo arroja sombras
panteon.receiveShadow = true; // El grupo recibe sombras (ajusta según sea necesario)


//prueba de grupo
// Mover, rotar y escalar el grupo
// panteon.position.set(2, 0, 0); // Mover el grupo
// panteon.rotation.set(0, Math.PI / 4, 0); // Rotar el grupo
// panteon.scale.set(2, 2, 2); // Escalar el grupo

////////////////////////////////////////////////////////////////////////////////
//OPCIONES DE LUZ
const lightProperties = {
  color: 0xffffff,
  intensity: 1,
  distance: 0,
  position: { x: 2.2, y: 33.6, z: 11.2},
  target: {x: -2, y: -7, z: -2},
  angle: 1,
  penumbra: 0
};

// Light
const light = new THREE.DirectionalLight(lightProperties.color, lightProperties.intensity, lightProperties.distance);
light.position.set(lightProperties.x, lightProperties.y, lightProperties.z);
scene.add(light);
light.castShadow = true;
light.shadow.mapSize.width = 1024; // Resolución de sombra (ajusta según sea necesario)
light.shadow.mapSize.height = 1024;

//Ligth Helper
const lightHelper = new THREE.DirectionalLightHelper(light, 1);
scene.add(lightHelper);


// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 2.5) // Adjust ambient light
scene.add(ambientLight);

// Camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight,);
camera.position.x = -2.5;
camera.position.y = 1;
camera.position.z = 9;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( window.innerWidth, window.innerHeight );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Color fondo
//renderer.setClearColor("#c2d7ea"); // Use any valid CSS color value


// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
//controls.maxPolarAngle = Math.PI / 2;


//control de opciones
// Crear GUI
const gui = new dat.GUI();
//OPCIONES DE LUZ
const lightFolder = gui.addFolder('Luz');

lightFolder.addColor(lightProperties, 'color').onChange(function (e) {
    light.color.set(e);
});

lightFolder.add(lightProperties, 'intensity', 0, 1000).onChange(function (value) {
    light.intensity = value;
});

lightFolder.add(lightProperties, 'distance', 0, 500).onChange(function (value) {
    light.distance = value;
});

lightFolder.add(lightProperties, 'angle', 0, Math.PI / 2).onChange(function (value) {
    light.angle = value;
});

lightFolder.add(lightProperties, 'penumbra', 0, 1).onChange(function (value) {
    light.penumbra = value;
});

const lightPositionFolder = lightFolder.addFolder('Position');
lightPositionFolder.add(lightProperties.position, 'x', -200, 200).onChange(function (value) {
    light.position.x = value;
});
lightPositionFolder.add(lightProperties.position, 'y', -200, 200).onChange(function (value) {
    light.position.y = value;
});
lightPositionFolder.add(lightProperties.position, 'z', -200, 200).onChange(function (value) {
    light.position.z = value;
});

const lightTargetFolder = lightFolder.addFolder('Target');
lightTargetFolder.add(lightProperties.target, 'x', -200, 200).onChange(function (value) {
    light.target.position.x = value;
});
lightTargetFolder.add(lightProperties.target, 'y', -200, 200).onChange(function (value) {
    light.target.position.y = value;
});
lightTargetFolder.add(lightProperties.target, 'z', -200, 200).onChange(function (value) {
    light.target.position.z = value;
});


const cupulaFolder = gui.addFolder('Cupula');
//OPCIONES DE CUPULA
// Funciones para ajustar el color y el brillo
function updateColor(color) {
  materialBanda.color.set(color);
}

function updateBrightness(brightness) {
  materialBanda.emissive.setRGB(brightness, brightness, brightness);
}

// Crear controles en GUI
const colorControl = cupulaFolder.addColor({ color: 0xeeece4 }, 'color').name('Color');
colorControl.onChange(updateColor);

const brightnessControl = cupulaFolder.add({ brightness: 1 }, 'brightness', 0, 2).name('Brillo');
brightnessControl.onChange(updateBrightness);



// Animation loop
function animate() {
  // Update controls
  controls.update();
  // Actualizar las propiedades de la SpotLight
  light.color.set(lightProperties.color);
  light.intensity = lightProperties.intensity;
  light.position.copy(lightProperties.position);
  light.target.position.copy(lightProperties.target);
  light.angle = lightProperties.angle;

   //Update helper
  lightHelper.update();
  // Render the scene with the updated camera and cube position
  renderer.render(scene, camera);

  // Call animate again on the next frame
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();
