import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//Para tener la interfaz que ayuda con las posiciones 
import * as dat from 'dat.gui';

//Para el texto
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// Create a scene
const scene = new THREE.Scene();
const clock = new THREE.Clock();

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
const baldosaTexture = new THREE.TextureLoader().load('./baldosa.png');
baldosaTexture.repeat.set(1,1)
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

// Piso Panteon
const baldosaGeometry = new THREE.BoxGeometry(6, 0.07, 6.6)  // Width, Height, Depth
const baldosaMaterial = new THREE.MeshStandardMaterial({
  map: baldosaTexture,
  color: "#eeedeb",
  roughness: 0.9, // Adjust roughness
  metalness: 0.1, // Adjust metalness
});
const baldosa = new THREE.Mesh(baldosaGeometry, baldosaMaterial);
baldosa.position.set(0, -1.02, 1.25);
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

// Bordeado Panteon Suelo
function crearBordePanteon(panteon, geometry, material, position, castShadow = true, receiveShadow = true) {
  const borde = new THREE.Mesh(geometry, material);
  borde.position.copy(position);
  panteon.add(borde);
  borde.castShadow = castShadow;
  borde.receiveShadow = receiveShadow;
}

const bordeP1Geometry = new THREE.BoxGeometry(3.25, 0.15, 3.05);
crearBordePanteon(panteon, bordeP1Geometry, cajaMaterial, new THREE.Vector3(0, -0.8, 0));
const bordeP2Geometry = new THREE.BoxGeometry(3.35, 0.15, 3.15);
crearBordePanteon(panteon, bordeP2Geometry, cajaMaterial, new THREE.Vector3(0, -0.9, 0));
const bordeP3Geometry = new THREE.BoxGeometry(1, 0.15, 1.5);
crearBordePanteon(panteon, bordeP3Geometry, cajaMaterial, new THREE.Vector3(-0.66, -0.9, 2));
const bordeP4Geometry = new THREE.BoxGeometry(1, 0.15, 1.5);
crearBordePanteon(panteon, bordeP4Geometry, cajaMaterial, new THREE.Vector3(-0.62, -0.8, 2));
crearBordePanteon(panteon, bordeP3Geometry, cajaMaterial, new THREE.Vector3(0.66, -0.9, 2));
crearBordePanteon(panteon, bordeP4Geometry, cajaMaterial, new THREE.Vector3(0.62, -0.8, 2));

//////////// COLUMNAS CILINDRICAS ////////////////////////////
function crearColumna(panteon, posX, posY, posZ) {
  const columnaGeometry = new THREE.CylinderGeometry(0.06, 0.06, 1.95, 16);
  const columna = new THREE.Mesh(columnaGeometry, cajaMaterial);
  columna.position.set(posX, posY, posZ);
  panteon.add(columna);
  columna.castShadow = true;
  columna.receiveShadow = true;
}

function crearBaseColumna(panteon, posX, posY, posZ) {
  const baseColumnaGeometry = new THREE.BoxGeometry(0.22, 0.4, 0.16);
  const baseColumna = new THREE.Mesh(baseColumnaGeometry, cajaMaterial);
  baseColumna.position.set(posX, posY, posZ);
  panteon.add(baseColumna);
  baseColumna.castShadow = true;
  baseColumna.receiveShadow = true;
}

// Llamadas individuales
crearColumna(panteon, -1, 0, 3.4);
crearBaseColumna(panteon, -1, -0.85, 3.4);

crearColumna(panteon, -0.8, 0, 3.4);
crearBaseColumna(panteon, -0.8, -0.85, 3.4);

crearColumna(panteon, -1, 0, 2.8);
crearBaseColumna(panteon, -1, -0.85, 2.8);

crearColumna(panteon, 1, 0, 2.8);
crearBaseColumna(panteon, 1, -0.85, 2.8);

crearColumna(panteon, 1, 0, 3.4);
crearBaseColumna(panteon, 1, -0.85, 3.4);

crearColumna(panteon, 0.8, 0, 3.4);
crearBaseColumna(panteon, 0.8, -0.85, 3.4);

crearColumna(panteon, 0.3, 0, 3.4);
crearBaseColumna(panteon, 0.3, -0.85, 3.4);

crearColumna(panteon, -0.3, 0, 3.4);
crearBaseColumna(panteon, -0.3, -0.85, 3.4);

///////////////// DETALLES COLUMNA CILINDRICA ////////////////////////////
function crearTorus(panteon, posX, posY, posZ) {
  const torusGeometry = new THREE.TorusGeometry(0.067, 0.012, 16, 50);
  const torus = new THREE.Mesh(torusGeometry, cajaMaterial);
  torus.position.set(posX, posY, posZ);
  torus.rotation.x = Math.PI / 2;
  panteon.add(torus);
  torus.castShadow = true;
  torus.receiveShadow = true;
}

function crearTorusSmall(panteon, posX, posY, posZ) {
  const torusSmallGeometry = new THREE.TorusGeometry(0.0652, 0.0062, 16, 50);
  const torusSmall = new THREE.Mesh(torusSmallGeometry, cajaMaterial);
  torusSmall.position.set(posX, posY, posZ);
  torusSmall.rotation.x = Math.PI / 2;
  panteon.add(torusSmall);
  torusSmall.castShadow = true;
  torusSmall.receiveShadow = true;
}

// Llamadas individuales
crearTorus(panteon, -1, -0.64, 3.4);
crearTorusSmall(panteon, -1, -0.62, 3.4);

crearTorus(panteon, -0.8, -0.64, 3.4);
crearTorusSmall(panteon, -0.8, -0.62, 3.4);

crearTorus(panteon, 0.8, -0.64, 3.4);
crearTorusSmall(panteon, 0.8, -0.62, 3.4);

crearTorus(panteon, 1, -0.64, 3.4);
crearTorusSmall(panteon, 1, -0.62, 3.4);

crearTorus(panteon, 0.3, -0.64, 3.4);
crearTorusSmall(panteon, 0.3, -0.62, 3.4);

crearTorus(panteon, -0.3, -0.64, 3.4);
crearTorusSmall(panteon, -0.3, -0.62, 3.4);

crearTorus(panteon, -1, -0.64, 2.8);
crearTorusSmall(panteon, -1, -0.62, 2.8);

crearTorus(panteon, 1, -0.64, 2.8);
crearTorusSmall(panteon, 1, -0.62, 2.8);

//////////////////////////////////////////////////////////////////////////

// Escalones principales

const escalonMaterial = new THREE.MeshStandardMaterial({
  map: escalonTexture,
  color: "#a2aaaf",
  roughness: 0.5, // Adjust roughness
  metalness: 0.1, // Adjust metalness
});

function crearEscalonPrincipal(panteon, posX, posY, posZ, width, depth) {
  const escalonCortoGeometry = new THREE.BoxGeometry(width, 0.05, depth);
  const escalon = new THREE.Mesh(escalonCortoGeometry, escalonMaterial);
  escalon.position.set(posX, posY, posZ);
  panteon.add(escalon);
  escalon.castShadow = true;
  escalon.receiveShadow = true;
}

function crearEscalonIzquierdo(panteon, posX, posY, posZ, width, depth) {
  const escalonCortoGeometry = new THREE.BoxGeometry(width, 0.05, depth);
  const escalon = new THREE.Mesh(escalonCortoGeometry, escalonMaterial);
  escalon.position.set(posX, posY, posZ);
  panteon.add(escalon);
  escalon.castShadow = true;
  escalon.receiveShadow = true;
}

function crearEscalonDerecho(panteon, posX, posY, posZ, width, depth) {
  const escalonCortoGeometry = new THREE.BoxGeometry(width, 0.05, depth);
  const escalon = new THREE.Mesh(escalonCortoGeometry, escalonMaterial);
  escalon.position.set(posX, posY, posZ);
  panteon.add(escalon);
  escalon.castShadow = true;
  escalon.receiveShadow = true;
}

// Llamadas individuales
// Escalones principales
crearEscalonPrincipal(panteon, 0, -0.705, 2.85, 1.75, 1);
crearEscalonPrincipal(panteon, 0, -0.755, 2.95, 1.85, 1);
crearEscalonPrincipal(panteon, 0, -0.805, 3.05, 1.55, 1);
crearEscalonPrincipal(panteon, 0, -0.855, 3.15, 1.65, 1);
crearEscalonPrincipal(panteon, 0, -0.905, 3.25, 1.75, 1);
crearEscalonPrincipal(panteon, 0, -0.955, 3.35, 1.85, 1);

// Escalones izquierdos
crearEscalonIzquierdo(panteon, -0.42, -0.755, 3.03, 1.45, 0.55);
crearEscalonIzquierdo(panteon, -0.44, -0.805, 3.03, 1.55, 0.55);
crearEscalonIzquierdo(panteon, -0.46, -0.855, 3.03, 1.65, 0.55);
crearEscalonIzquierdo(panteon, -0.48, -0.905, 3.065, 1.75, 0.58);
crearEscalonIzquierdo(panteon, -0.5, -0.955, 3.1, 1.85, 0.65);

// Escalones derechos
crearEscalonDerecho(panteon, 0.42, -0.755, 3.03, 1.45, 0.55);
crearEscalonDerecho(panteon, 0.44, -0.805, 3.03, 1.55, 0.55);
crearEscalonDerecho(panteon, 0.46, -0.855, 3.03, 1.65, 0.55);
crearEscalonDerecho(panteon, 0.48, -0.905, 3.065, 1.75, 0.58);
crearEscalonDerecho(panteon, 0.5, -0.955, 3.1, 1.85, 0.65);

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

//Material tubos
const materialTubo = new THREE.MeshStandardMaterial({
  color: "#E2C799",
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

//tubitos de decoracion de las bandas de la cupula
// Crear la geometría del toro
const tuboGeometry = new THREE.TorusGeometry(15, 0.1, 6, 60, Math.PI/2);
// Crear la malla
const tubo1 = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo1.position.set(0, 2.51, 0)
tubo1.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo1);
tubo1.rotation.y = Math.PI * 0.04;

// Crear la malla
const tubo1a = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo1a.position.set(0, 2.51, 0)
tubo1a.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo1a);
tubo1a.rotation.y = Math.PI * 0.08;

// Crear la malla
const tubo1b = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo1b.position.set(0, 2.51, 0)
tubo1b.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo1b);
tubo1b.rotation.y = Math.PI * 0.12;


// Crear la malla
const tubo1c = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo1c.position.set(0, 2.51, 0)
tubo1c.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo1c);
tubo1c.rotation.y = Math.PI * 0.16;

// Crear la malla
const tubo2 = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo2.position.set(0, 2.51, 0)
tubo2.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo2);
tubo2.rotation.y = Math.PI * 0.30;

// Crear la malla
const tubo2a = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo2a.position.set(0, 2.51, 0)
tubo2a.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo2a);
tubo2a.rotation.y = Math.PI * 0.34;

// Crear la malla
const tubo2b = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo2b.position.set(0, 2.51, 0)
tubo2b.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo2b);
tubo2b.rotation.y = Math.PI * 0.38;

// Crear la malla
const tubo2c = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo2c.position.set(0, 2.51, 0)
tubo2c.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo2c);
tubo2c.rotation.y = Math.PI * 0.42;

// Crear la malla
const tubo3 = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo3.position.set(0, 2.51, 0)
tubo3.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo3);
tubo3.rotation.y = Math.PI * 0.56;

// Crear la malla
const tubo3a = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo3a.position.set(0, 2.51, 0)
tubo3a.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo3a);
tubo3a.rotation.y = Math.PI * 0.60;

// Crear la malla
const tubo3b = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo3b.position.set(0, 2.51, 0)
tubo3b.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo3b);
tubo3b.rotation.y = Math.PI * 0.64;

// Crear la malla
const tubo3c = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo3c.position.set(0, 2.51, 0)
tubo3c.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo3c);
tubo3c.rotation.y = Math.PI * 0.68;

// Crear la malla
const tubo4 = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo4.position.set(0, 2.51, 0)
tubo4.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo4);
tubo4.rotation.y = Math.PI * 0.82;

// Crear la malla
const tubo4a = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo4a.position.set(0, 2.51, 0)
tubo4a.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo4a);
tubo4a.rotation.y = Math.PI * 0.86;

// Crear la malla
const tubo4b = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo4b.position.set(0, 2.51, 0)
tubo4b.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo4b);
tubo4b.rotation.y = Math.PI * 0.90;

// Crear la malla
const tubo4c = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo4c.position.set(0, 2.51, 0)
tubo4c.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo4c);
tubo4c.rotation.y = Math.PI * 0.94;

// Crear la malla
const tubo5 = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo5.position.set(0, 2.51, 0)
tubo5.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo5);
tubo5.rotation.y = Math.PI * 1.06;

// Crear la malla
const tubo5a = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo5a.position.set(0, 2.51, 0)
tubo5a.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo5a);
tubo5a.rotation.y = Math.PI * 1.10;

// Crear la malla
const tubo5b = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo5b.position.set(0, 2.51, 0)
tubo5b.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo5b);
tubo5b.rotation.y = Math.PI * 1.13;

// Crear la malla
const tubo5c = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo5c.position.set(0, 2.51, 0)
tubo5c.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo5c);
tubo5c.rotation.y = Math.PI * 1.17;

// Crear la malla
const tubo6 = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo6.position.set(0, 2.51, 0)
tubo6.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo6);
tubo6.rotation.y = Math.PI * 1.28;

// Crear la malla
const tubo6a = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo6a.position.set(0, 2.51, 0)
tubo6a.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo6a);
tubo6a.rotation.y = Math.PI * 1.32;

// Crear la malla
const tubo6b = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo6b.position.set(0, 2.51, 0)
tubo6b.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo6b);
tubo6b.rotation.y = Math.PI * 1.35;

// Crear la malla
const tubo6c = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo6c.position.set(0, 2.51, 0)
tubo6c.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo6c);
tubo6c.rotation.y = Math.PI * 1.39;

// Crear la malla
const tubo7 = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo7.position.set(0, 2.51, 0)
tubo7.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo7);
tubo7.rotation.y = Math.PI * 1.51;

// Crear la malla
const tubo7a = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo7a.position.set(0, 2.51, 0)
tubo7a.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo7a);
tubo7a.rotation.y = Math.PI * 1.55;

// Crear la malla
const tubo7b = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo7b.position.set(0, 2.51, 0)
tubo7b.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo7b);
tubo7b.rotation.y = Math.PI * 1.60;

// Crear la malla
const tubo7c = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo7c.position.set(0, 2.51, 0)
tubo7c.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo7c);
tubo7c.rotation.y = Math.PI * 1.64;

// Crear la malla
const tubo8 = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo8.position.set(0, 2.51, 0)
tubo8.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo8);
tubo8.rotation.y = Math.PI * 1.78;

// Crear la malla
const tubo8a = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo8a.position.set(0, 2.51, 0)
tubo8a.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo8a);
tubo8a.rotation.y = Math.PI * 1.82;

// Crear la malla
const tubo8b = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo8b.position.set(0, 2.51, 0)
tubo8b.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo8b);
tubo8b.rotation.y = Math.PI * 1.86;

// Crear la malla
const tubo8c = new THREE.Mesh(tuboGeometry, materialTubo);
// Agregar la malla a la escena (asegúrate de tener una escena definida previamente)
tubo8c.position.set(0, 2.51, 0)
tubo8c.scale.set(0.053, 0.063, 0.053)
panteon.add(tubo8c);
tubo8c.rotation.y = Math.PI * 1.90;

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

/// Frase en Techo triangular
  const fontLoader = new FontLoader();
  fontLoader.load(
    'fonts/Cinzel_Regular.json',
    (font) => {
      const textGeometry = new TextGeometry('FIDES   ET   PATRIA', {
        font: font,
        size: 0.1,
        height: 1,
        // curveSegments: 1,
        // bevelEnabled: true,
        // bevelThickness: 1,
        // bevelSize: 1,
        // bevelOffset: 0,
        // bevelSegments: 1
      });
      const textMaterial = new THREE.MeshPhongMaterial({ color: 0xC17868 });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-0.6,0.83,2.5)
      panteon.add(textMesh);

    }
  );



//prueba de grupo
// Mover, rotar y escalar el grupo
// panteon.position.set(2, 0, 0); // Mover el grupo
// panteon.rotation.set(0, Math.PI / 4, 0); // Rotar el grupo
// panteon.scale.set(2, 2, 2); // Escalar el grupo

////////////////////////////////////////////////////////////////////////////////
///////////// tierra /////////////////////
const tierraGeometry = new THREE.PlaneGeometry(0.5,0.78)
const tierraMaterial = new THREE.MeshStandardMaterial({
  color: '#3b2d06',
}
)
const tierra = new THREE.Mesh(tierraGeometry,tierraMaterial);
tierra.rotation.x=-Math.PI/2
tierra.position.set(1.8,-0.98,4.1)
panteon.add(tierra)
const tierra2 = new THREE.Mesh(tierraGeometry,tierraMaterial);
tierra2.rotation.x=-Math.PI/2
tierra2.position.set(-1.8,-0.98,4.1)
panteon.add(tierra2)
const tierraGeometry2 = new THREE.PlaneGeometry(0.5,2.99)
const tierra3 = new THREE.Mesh(tierraGeometry2,tierraMaterial);
tierra3.rotation.x=-Math.PI/2
tierra3.position.set(-2.6,-0.98,2.95)
panteon.add(tierra3)
const tierraGeometry3 = new THREE.PlaneGeometry(0.5,1.6)
const tierra4 = new THREE.Mesh(tierraGeometry3,tierraMaterial);
tierra4.rotation.x=-Math.PI/2
tierra4.position.set(-2.6,-0.98,-0.5)
panteon.add(tierra4)


//////////////// PASTO /////////////////////////////
const simpleNoise = `
  float N(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float smoothNoise(vec2 uv) {
    vec2 lv = fract(uv);
    vec2 id = floor(uv);

    lv = lv * lv * (3. - 2. * lv);

    float bl = N(id);
    float br = N(id + vec2(1, 0));
    float b = mix(bl, br, lv.x);

    float tl = N(id + vec2(0, 1));
    float tr = N(id + vec2(1, 1));
    float t = mix(tl, tr, lv.x);

    return mix(b, t, lv.y);
  }
`;

// Función para configurar una instancia de pasto
function setupGrassInstance(mesh, x, z) {
  mesh.scale.set(0.1, 0.1, 0.1);
  mesh.position.set(x, -0.93, z);

  // Posciion y escala
  for (let i = 0; i < grassInstanceNumber; i++) {
    grassDummy.position.set(
      x + Math.random() * 6 - 1.5,
      0,
      z + Math.random() * 8 - 1.5
    );

    grassDummy.rotation.y = Math.random() * Math.PI;

    grassDummy.updateMatrix();
    mesh.setMatrixAt(i, grassDummy.matrix);
  }
}

// creamos material de pasto
const grassVertexShader = `
  varying vec2 vUv;
  uniform float time;

  ${simpleNoise}

  void main() {
    vUv = uv;
    float t = time * 2.;

    vec4 mvPosition = vec4(position, 1.0);
    #ifdef USE_INSTANCING
      mvPosition = instanceMatrix * mvPosition;
    #endif

    float noise = smoothNoise(mvPosition.xz * 0.5 + vec2(0., t));
    noise = pow(noise * 0.5 + 0.5, 2.) * 2.;

    float dispPower = 1. - cos(uv.y * 3.1416 * 0.5);

    float displacement = noise * (0.3 * dispPower);
    mvPosition.z -= displacement;

    vec4 modelViewPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

const grassFragmentShader = `
  varying vec2 vUv;

  void main() {
    vec3 baseColor = vec3(0.439, 0.557, 0.153);
    float clarity = (vUv.y * 0.875) + 0.1;
    gl_FragColor = vec4(baseColor * clarity, 1);
  }
`;

const grassUniforms = {
  time: {
    value: 0,
  },
};

const grassLeavesMaterial = new THREE.ShaderMaterial({
  vertexShader: grassVertexShader,
  fragmentShader: grassFragmentShader,
  uniforms: grassUniforms,
  side: THREE.DoubleSide,
});

// cuantos pastitos
const grassInstanceNumber = 3500;
const grassDummy = new THREE.Object3D();

// un psato individual geometria
const grassGeometry = new THREE.PlaneGeometry(0.05, 0.2, 2, 2);

function createAndSetupGrassMesh(posX, posZ) {
  const grassInstancedMesh = new THREE.InstancedMesh(grassGeometry, grassLeavesMaterial, grassInstanceNumber);
  panteon.add(grassInstancedMesh);
  setupGrassInstance(grassInstancedMesh, posX, posZ);
}

createAndSetupGrassMesh(-1.78, 3.5);
createAndSetupGrassMesh(1.5, 3.5);
createAndSetupGrassMesh(-2.5, 3.5);
createAndSetupGrassMesh(-2.5, 2.78);
createAndSetupGrassMesh(-2.5, 2.1);
createAndSetupGrassMesh(-2.5, 1.5);
createAndSetupGrassMesh(-2.5, -0.3);
createAndSetupGrassMesh(-2.5, -1);


///////////////// BORDE /////////////////////////////////
const bordeMaterial = new THREE.MeshStandardMaterial({
  map: concreteTexture,
  color: "#f4f4f4", // f4f4f4 dad2c5 #f4eadc
  roughness: 0.5, // Adjust roughness
  metalness: 0, // Adjust metalness
});
// borde de pasto der
const bordePastoGeometria = new THREE.BoxGeometry(0.05, 0.05, 0.8);
const bordePasto = new THREE.Mesh(bordePastoGeometria, bordeMaterial);
bordePasto.position.set(1.5,-0.95,4.05)
panteon.add(bordePasto);

const bordePasto2 = new THREE.Mesh(bordePastoGeometria, bordeMaterial);
bordePasto2.position.set(2.1,-0.95,4.05)
panteon.add(bordePasto2);

const bordePastoGeometria3 = new THREE.BoxGeometry(0.05, 0.05, 0.65);
const bordePasto3 = new THREE.Mesh(bordePastoGeometria3, bordeMaterial);
bordePasto3.rotation.y = Math.PI / 2;
bordePasto3.position.set(1.8,-0.95,3.65)
panteon.add(bordePasto3);

const bordePasto4 = new THREE.Mesh(bordePastoGeometria3, bordeMaterial);
bordePasto4.rotation.y = Math.PI / 2;
bordePasto4.position.set(1.8,-0.95,4.45)
panteon.add(bordePasto4);

// borde de pasto izq
const bordePastoa = new THREE.Mesh(bordePastoGeometria, bordeMaterial);
bordePastoa.position.set(-1.5,-0.95,4.05)
panteon.add(bordePastoa);

const bordePasto2a = new THREE.Mesh(bordePastoGeometria, bordeMaterial);
bordePasto2a.position.set(-2.1,-0.95,4.05)
panteon.add(bordePasto2a);

const bordePasto3a = new THREE.Mesh(bordePastoGeometria3, bordeMaterial);
bordePasto3a.rotation.y = Math.PI / 2;
bordePasto3a.position.set(-1.8,-0.95,3.65)
panteon.add(bordePasto3a);

const bordePasto4a = new THREE.Mesh(bordePastoGeometria3, bordeMaterial);
bordePasto4a.rotation.y = Math.PI / 2;
bordePasto4a.position.set(-1.8,-0.95,4.45)
panteon.add(bordePasto4a);

const bordePastoLGeometria = new THREE.BoxGeometry(0.05, 0.05, 3);
const bordePastoLat = new THREE.Mesh(bordePastoLGeometria, bordeMaterial);
bordePastoLat.position.set(-2.9,-0.95,2.95)
panteon.add(bordePastoLat)

const bordePastoLat2 = new THREE.Mesh(bordePastoLGeometria, bordeMaterial);
bordePastoLat2.position.set(-2.3,-0.95,2.95)
panteon.add(bordePastoLat2)

const bordePastoLat3 = new THREE.Mesh(bordePastoGeometria3, bordeMaterial);
bordePastoLat3.rotation.y = Math.PI / 2;
bordePastoLat3.position.set(-2.6,-0.95,1.45)
panteon.add(bordePastoLat3);

const bordePastoLat4 = new THREE.Mesh(bordePastoGeometria3, bordeMaterial);
bordePastoLat4.rotation.y = Math.PI / 2;
bordePastoLat4.position.set(-2.6,-0.95,4.45)
panteon.add(bordePastoLat4);

const bordePastoLat5 = new THREE.Mesh(bordePastoGeometria3, bordeMaterial);
bordePastoLat5.rotation.y = Math.PI / 2;
bordePastoLat5.position.set(-2.6,-0.95,-1.3)
panteon.add(bordePastoLat5);

const bordePastoLat6 = new THREE.Mesh(bordePastoGeometria3, bordeMaterial);
bordePastoLat6.rotation.y = Math.PI / 2;
bordePastoLat6.position.set(-2.6,-0.95,0.3)
panteon.add(bordePastoLat6);

const bordePastoLGeometria2 = new THREE.BoxGeometry(0.05, 0.05, 1.6);
const bordePastoLat7 = new THREE.Mesh(bordePastoLGeometria2, bordeMaterial);
bordePastoLat7.position.set(-2.9,-0.95,-0.5)
panteon.add(bordePastoLat7)

const bordePastoLat8 = new THREE.Mesh(bordePastoLGeometria2, bordeMaterial);
bordePastoLat8.position.set(-2.3,-0.95,-0.5)
panteon.add(bordePastoLat8)
// REJAS
const rejaGgeometry = new THREE.BoxGeometry(0.025, 0.29, 0.025);
const rejaMaterial = new THREE.MeshStandardMaterial({ 
  color: '#424242', 
});
const rejaFgeometry = new THREE.BoxGeometry(0.008, 0.29, 0.008);
// Función para crear rejas gordas
function crearRejaGorda(panteon, posX, posY, posZ) {
  const rejaGorda = new THREE.Mesh(rejaGgeometry, rejaMaterial);
  rejaGorda.position.set(posX, posY, posZ);
  panteon.add(rejaGorda);
}
// Función para crear rejas finas
function crearRejaFina(panteon, posX, posY, posZ) {
  const rejaFina = new THREE.Mesh(rejaFgeometry, rejaMaterial);
  rejaFina.position.set(posX, posY, posZ);
  panteon.add(rejaFina);
}
// Función para crear rejas finas en un rango
function crearRejasFinasRango(panteon, startPosX, endPosX, posY, posZ, step) {
  for (let posX = startPosX; posX <= endPosX; posX += step) {
    crearRejaFina(panteon, posX, posY, posZ);
  }
}
// Función para crear rejas finas en un rango lateral
function crearRejasFinasRangoLat(panteon, posX, posY, startPosZ, endPosZ, step) {
  for (let posZ = startPosZ; posZ <= endPosZ; posZ += step) {
    crearRejaFina(panteon, posX, posY, posZ);
  }
}
// Función para crear rejas gordas laterales
function crearRejaLateral(panteon, posX, posY, posZ) {
  const rejaLateral = new THREE.Mesh(rejaGgeometry, rejaMaterial);
  rejaLateral.position.set(posX, posY, posZ);
  panteon.add(rejaLateral);
}
// Llamadas a la función para crear rejas delanteras
// Rejas gordas delanteras
crearRejaGorda(panteon, 0.95, -0.85, 4.48);
crearRejaGorda(panteon, 1.45, -0.85, 4.48);
crearRejaGorda(panteon, 1.95, -0.85, 4.48);
crearRejaGorda(panteon, 2.45, -0.85, 4.48);
crearRejaGorda(panteon, 2.95, -0.85, 4.48);
crearRejaGorda(panteon, -0.95, -0.85, 4.48);
crearRejaGorda(panteon, -1.45, -0.85, 4.48);
crearRejaGorda(panteon, -1.95, -0.85, 4.48);
crearRejaGorda(panteon, -2.45, -0.85, 4.48);
crearRejaGorda(panteon, -2.95, -0.85, 4.48);
// Rejas finas delanteras
crearRejasFinasRango(panteon, 0.98, 2.98, -0.85, 4.48, 0.02);
crearRejasFinasRango(panteon, -2.96, -0.96, -0.85, 4.48, 0.02);
// Rejas finas laterales
crearRejasFinasRangoLat(panteon, 2.95, -0.85, -2.02, 4.48, 0.02);
crearRejasFinasRangoLat(panteon, -2.95, -0.85, -2.02, 4.48, 0.02);
// Rejas finas traseras
crearRejasFinasRango(panteon, 0.98, 2.98, -0.85, -2.02, 0.02);
crearRejasFinasRango(panteon, -2.96, -0.96, -0.85, -2.02, 0.02);
// Rejas laterales izquierdas
crearRejaLateral(panteon, -2.95, -0.85, 3.98);
crearRejaLateral(panteon, -2.95, -0.85, 3.48);
crearRejaLateral(panteon, -2.95, -0.85, 2.98);
crearRejaLateral(panteon, -2.95, -0.85, 2.48);
crearRejaLateral(panteon, -2.95, -0.85, 1.98);
crearRejaLateral(panteon, -2.95, -0.85, 1.48);
crearRejaLateral(panteon, -2.95, -0.85, 0.98);
crearRejaLateral(panteon, -2.95, -0.85, 0.48);
crearRejaLateral(panteon, -2.95, -0.85, -0.02);
crearRejaLateral(panteon, -2.95, -0.85, -0.52);
crearRejaLateral(panteon, -2.95, -0.85, -1.02);
crearRejaLateral(panteon, -2.95, -0.85, -1.52);
crearRejaLateral(panteon, -2.95, -0.85, -2.02);
// Rejas laterales derechas
crearRejaLateral(panteon, 2.95, -0.85, 3.98);
crearRejaLateral(panteon, 2.95, -0.85, 3.48);
crearRejaLateral(panteon, 2.95, -0.85, 2.98);
crearRejaLateral(panteon, 2.95, -0.85, 2.48);
crearRejaLateral(panteon, 2.95, -0.85, 1.98);
crearRejaLateral(panteon, 2.95, -0.85, 1.48);
crearRejaLateral(panteon, 2.95, -0.85, 0.98);
crearRejaLateral(panteon, 2.95, -0.85, 0.48);
crearRejaLateral(panteon, 2.95, -0.85, -0.02);
crearRejaLateral(panteon, 2.95, -0.85, -0.52);
crearRejaLateral(panteon, 2.95, -0.85, -1.02);
crearRejaLateral(panteon, 2.95, -0.85, -1.52);
crearRejaLateral(panteon, 2.95, -0.85, -2.02);
// Rejas gordas traseras
crearRejaGorda(panteon, 0.95, -0.85, -2.02);
crearRejaGorda(panteon, 1.45, -0.85, -2.02);
crearRejaGorda(panteon, 1.95, -0.85, -2.02);
crearRejaGorda(panteon, 2.45, -0.85, -2.02);
crearRejaGorda(panteon, 2.95, -0.85, -2.02);
crearRejaGorda(panteon, -0.95, -0.85, -2.02);
crearRejaGorda(panteon, -1.45, -0.85, -2.02);
crearRejaGorda(panteon, -1.95, -0.85, -2.02);
crearRejaGorda(panteon, -2.45, -0.85, -2.02);
crearRejaGorda(panteon, -2.95, -0.85, -2.02);
// barras 
const barraGeometry = new THREE.BoxGeometry(0.008, 0.008, 6.5);
const barraSup = new THREE.Mesh(barraGeometry, rejaMaterial);
barraSup.position.set(-2.95, -0.74, 1.23);
panteon.add(barraSup);
const barraInf = new THREE.Mesh(barraGeometry, rejaMaterial);
barraInf.position.set(-2.95, -0.95, 1.23);
panteon.add(barraInf);
const barraSup2 = new THREE.Mesh(barraGeometry, rejaMaterial);
barraSup2.position.set(2.95, -0.74, 1.23);
panteon.add(barraSup2);
const barraInf2 = new THREE.Mesh(barraGeometry, rejaMaterial);
barraInf2.position.set(2.95, -0.95, 1.23);
panteon.add(barraInf2);
const barra2Geometry = new THREE.BoxGeometry(0.008, 0.008, 1.98);
const barra2Sup = new THREE.Mesh(barra2Geometry, rejaMaterial);
barra2Sup.position.set(-1.95, -0.74, 4.48);
barra2Sup.rotation.y = Math.PI / 2;
panteon.add(barra2Sup);
const barra2Inf = new THREE.Mesh(barra2Geometry, rejaMaterial);
barra2Inf.position.set(-1.95, -0.95, 4.48);
barra2Inf.rotation.y = Math.PI / 2;
panteon.add(barra2Inf);
const barra2Supb = new THREE.Mesh(barra2Geometry, rejaMaterial);
barra2Supb.position.set(1.95, -0.74, 4.48);
barra2Supb.rotation.y = Math.PI / 2;
panteon.add(barra2Supb);
const barra2Infb = new THREE.Mesh(barra2Geometry, rejaMaterial);
barra2Infb.position.set(1.95, -0.95, 4.48);
barra2Infb.rotation.y = Math.PI / 2;
panteon.add(barra2Infb);
const barra2Supa = new THREE.Mesh(barra2Geometry, rejaMaterial);
barra2Supa.position.set(-1.95, -0.74,-2.02);
barra2Supa.rotation.y = Math.PI / 2;
panteon.add(barra2Supa);
const barra2Infa = new THREE.Mesh(barra2Geometry, rejaMaterial);
barra2Infa.position.set(-1.95, -0.95, -2.02);
barra2Infa.rotation.y = Math.PI / 2;
panteon.add(barra2Infa);
const barra2Supbb = new THREE.Mesh(barra2Geometry, rejaMaterial);
barra2Supbb.position.set(1.95, -0.74, -2.02);
barra2Supbb.rotation.y = Math.PI / 2;
panteon.add(barra2Supbb);
const barra2Infbb = new THREE.Mesh(barra2Geometry, rejaMaterial);
barra2Infbb.position.set(1.95, -0.95, -2.02);
barra2Infbb.rotation.y = Math.PI / 2;
panteon.add(barra2Infbb);

////////////////////////////////////////////////////


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
  // Pasto tiempo
  grassLeavesMaterial.uniforms.time.value = clock.getElapsedTime()
   //Update helper
  lightHelper.update();
  // Render the scene with the updated camera and cube position
  renderer.render(scene, camera);

  // Call animate again on the next frame
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();
