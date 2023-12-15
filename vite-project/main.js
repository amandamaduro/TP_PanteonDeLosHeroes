import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//Para tener la interfaz que ayuda con las posiciones 
import * as dat from 'dat.gui';

//Para el texto
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

//Para figuras
import { crearVentana } from './figuras.js';

// Create a scene
const scene = new THREE.Scene();
const clock = new THREE.Clock();



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
const baldosaMaterial2 = new THREE.MeshStandardMaterial({
  map: baldosaTexture,
  color: "#91794c",
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
  color: "#dad2c5", // f4f4f4 dad2c5 #f4eadc
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
///////////// COLUMNAS CUADRADAS ////////////////////////
function crearColumnaCuadrada(panteon, posX, posY, posZ) {
  const columnaGeometry = new THREE.BoxGeometry(0.18, 1.6, 0.18);
  const columna = new THREE.Mesh(columnaGeometry, cajaMaterial);
  columna.position.set(posX, posY, posZ);
  panteon.add(columna);
  columna.castShadow = true;
  columna.receiveShadow = true;
}

crearColumnaCuadrada(panteon, -1.03, 0.076, 2.2);
crearColumnaCuadrada(panteon, 1.03, 0.076, 2.2);

crearColumnaCuadrada(panteon, -1.03, 0.076, 1.52);
crearColumnaCuadrada(panteon, 1.03, 0.076, 1.52);

crearColumnaCuadrada(panteon, -1.13, 0.076, 1.43);
crearColumnaCuadrada(panteon, 1.13, 0.076, 1.43);

crearColumnaCuadrada(panteon, -1.52, 0.076, 1.43);
crearColumnaCuadrada(panteon, 1.52, 0.076, 1.43);

crearColumnaCuadrada(panteon, -1.52, 0.076, 0);
crearColumnaCuadrada(panteon, 1.52, 0.076, 0);

crearColumnaCuadrada(panteon, -1.52, 0.076, -1.43);
crearColumnaCuadrada(panteon, 1.52, 0.076, -1.43);

crearColumnaCuadrada(panteon, -1, 0.076, -1.43);
crearColumnaCuadrada(panteon, 1, 0.076, -1.43);

crearColumnaCuadrada(panteon, -0.5, 0.076, -1.43);
crearColumnaCuadrada(panteon, 0.5, 0.076, -1.43);

/////////////////////////////////////////////////////////
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

// Detalles Columna superior
crearTorus(panteon, -1, 0.69, 3.4);
crearTorusSmall(panteon, -1, 0.67, 3.4);

crearTorus(panteon, -0.8, 0.69, 3.4);
crearTorusSmall(panteon, -0.8, 0.67, 3.4);

crearTorus(panteon, 0.8, 0.69, 3.4);
crearTorusSmall(panteon, 0.8, 0.67, 3.4);

crearTorus(panteon, 1, 0.69, 3.4);
crearTorusSmall(panteon, 1, 0.67, 3.4);

crearTorus(panteon, 0.3, 0.69, 3.4);
crearTorusSmall(panteon, 0.3, 0.67, 3.4);

crearTorus(panteon, -0.3, 0.69, 3.4);
crearTorusSmall(panteon, -0.3, 0.67, 3.4);

crearTorus(panteon, -1, 0.69, 2.8);
crearTorusSmall(panteon, -1, 0.67, 2.8);

crearTorus(panteon, 1, 0.69, 2.8);
crearTorusSmall(panteon, 1, 0.67, 2.8);


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

///////////// DETALLE TECHO /////////////////////////
function agregarTechoCol(geometry, position, rotation) {
  const techoCol = new THREE.Mesh(geometry, cajaMaterial);
  techoCol.position.copy(position);
  techoCol.rotation.set(0, 0, rotation);
  panteon.add(techoCol);
  techoCol.castShadow = true;
  techoCol.receiveShadow = true;
}

const techoColGeometry6 = new THREE.BoxGeometry(2.2, 0.3, 0.95);
agregarTechoCol(techoColGeometry6, new THREE.Vector3(0, 0.85, 3), 0);

const techoColGeometry7 = new THREE.BoxGeometry(2.25, 0.02, 4);
agregarTechoCol(techoColGeometry7, new THREE.Vector3(0, 0.83, 1.5), 0);

const techoColGeometry8 = new THREE.BoxGeometry(2.25, 0.025, 4);
agregarTechoCol(techoColGeometry8, new THREE.Vector3(0, 0.95, 1.58), 0);

const techoColGeometry9 = new THREE.BoxGeometry(1.2, 0.025, 0.3);
agregarTechoCol(techoColGeometry9, new THREE.Vector3(-0.538, 1.21, 3.45), (25 * Math.PI) / 180);
agregarTechoCol(techoColGeometry9, new THREE.Vector3(0.538, 1.21, 3.45), (-25 * Math.PI) / 180);

const techoColGeometry10 = new THREE.BoxGeometry(0.5, 0.25, 0.3);
agregarTechoCol(techoColGeometry10, new THREE.Vector3(-0.75, 1.1, 3.2), 0);

const techoColGeometry12 = new THREE.BoxGeometry(1.2, 0.05, 0.3);
agregarTechoCol(techoColGeometry12, new THREE.Vector3(-0.535, 1.235, 3.2), (25 * Math.PI) / 180);
agregarTechoCol(techoColGeometry12, new THREE.Vector3(0.535, 1.235, 3.2), (-25 * Math.PI) / 180);

const techoColGeometry13 = new THREE.BoxGeometry(0.2, 0.25, 0.75);
agregarTechoCol(techoColGeometry13, new THREE.Vector3(-0.9, 1.1, 2.85), 0);
agregarTechoCol(techoColGeometry10, new THREE.Vector3(0.75, 1.1, 3.2), 0);
agregarTechoCol(techoColGeometry13, new THREE.Vector3(0.9, 1.1, 2.85), 0);

const techoColGeometry14 = new THREE.BoxGeometry(0.2, 0.25, 1.2);
agregarTechoCol(techoColGeometry14, new THREE.Vector3(0.9, 1.1, 1.9), 0);
agregarTechoCol(techoColGeometry14, new THREE.Vector3(-0.9, 1.1, 1.9), 0);

const techoColGeometry15 = new THREE.BoxGeometry(0.7, 0.25, 0.2);
agregarTechoCol(techoColGeometry15, new THREE.Vector3(-1.15, 1.1, 1.3), 0);
agregarTechoCol(techoColGeometry15, new THREE.Vector3(1.15, 1.1, 1.3), 0);

const techoColGeometry16 = new THREE.BoxGeometry(0.2, 0.25, 1.25);
agregarTechoCol(techoColGeometry16, new THREE.Vector3(-1.4, 1.1, -0.775), 0);
agregarTechoCol(techoColGeometry16, new THREE.Vector3(1.4, 1.1, -0.775), 0);

const techoColGeometry17 = new THREE.BoxGeometry(1, 0.25, 0.2);
agregarTechoCol(techoColGeometry17, new THREE.Vector3(-0.9, 1.1, -1.3), 0);
agregarTechoCol(techoColGeometry17, new THREE.Vector3(0.9, 1.1, -1.3), 0);

//Grupo cupulas
const cupulas = new THREE.Group();
panteon.add(cupulas); 
//------------COMIENZO CUPULAS-----------------------------------
//------------CUPULA 1 (CUPULA MAS GRANDE)-----------------------
//Material de cupula
const cupulaMaterial = new THREE.MeshStandardMaterial({
  color: 0xeeece4,
  map: cupulaColorTexture, // Textura de color
  displacementMap: cupulaDisplaymentTexture, // Textura de desplazamiento
  normalMap: cupulaNormalDXTexture, // Textura normal
  roughnessMap: cupulaRoughnessTexture, // Textura de rugosidad
  aoMap: cupulaAmbientOclussionTexture, // Textura de oclusión ambiental
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

cupulas.add(cupula);

cupula.castShadow = true;
cupula.receiveShadow = true;

//---------------DETALLES CUPULA-------------------
//---------------bandas cupula---------------------
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


// Número de bandas
const numBandas = 8;

// Ángulo inicial
const angulo = Math.PI/4;

// Crear las bandas y agregarlas a la escena
for (let i = 1; i <= numBandas; i++) {
  // Crear una nueva banda
  const banda = new THREE.Mesh(bandaGeometry, materialBanda);

  // Posición, escala y rotación de la banda
  banda.position.set(0, 2.51, 0);
  banda.scale.set(0.053, 0.063, 0.053);
  cupulas.add(banda);
  // if (i = 3){
  // }
  // Calcular el ángulo de rotación
  const anguloRotacion = (i - 1) * angulo + 0.02;
  banda.rotation.y = anguloRotacion;
}

// Crear las bandas y agregarlas a la escena
for (let i = 1; i <= numBandas; i++) {
  // Crear una nueva banda
  const bandaA = new THREE.Mesh(bandaGeometry, materialBanda);

  // Posición, escala y rotación de la banda
  bandaA.position.set(0, 2.51, 0);
  bandaA.scale.set(0.053, 0.063, 0.053);
  cupulas.add(bandaA);
  
  const anguloRotacion = (i - 1) * angulo + 0.54;
  bandaA.rotation.y = anguloRotacion;
}
//---------------------fin bandas cupula------------------------

//---------------------tubitos de las bandas cupula-------------
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

// Número de tubos
const numTubos = 4;

// Crear una nueva instancia de la geometría del toro
const tuboGeometry = new THREE.TorusGeometry(15, 0.1, 6, 60, Math.PI);

// Crear los tubos y agregarlos a la escena
for (let i = 1; i <= numTubos; i++) {
  // Crear una nueva malla
  const tubo = new THREE.Mesh(tuboGeometry, materialTubo);

  // Posición, escala y rotación del tubo
  tubo.position.set(0, 2.51, 0);
  tubo.scale.set(0.053, 0.063, 0.053);
  cupulas.add(tubo);

  // Calcular el ángulo de rotación
  const anguloRotacion = (i - 1) * angulo+ 0.02;
  tubo.rotation.y = anguloRotacion;
}

// Crear los tubos y agregarlos a la escena
for (let i = 1; i <= numTubos; i++) {
  // Crear una nueva malla
  const tuboA = new THREE.Mesh(tuboGeometry, materialTubo);

  // Posición, escala y rotación del tubo
  tuboA.position.set(0, 2.51, 0);
  tuboA.scale.set(0.053, 0.063, 0.053);
  cupulas.add(tuboA);

  // Calcular el ángulo de rotación
  const anguloRotacion = (i - 1) * angulo+ 0.13;
  tuboA.rotation.y = anguloRotacion;
}

// Crear los tubos y agregarlos a la escena
for (let i = 1; i <= numTubos; i++) {
  // Crear una nueva malla
  const tuboB = new THREE.Mesh(tuboGeometry, materialTubo);

  // Posición, escala y rotación del tubo
  tuboB.position.set(0, 2.51, 0);
  tuboB.scale.set(0.053, 0.063, 0.053);
  cupulas.add(tuboB);

  // Calcular el ángulo de rotación
  const anguloRotacion = (i - 1) * angulo+ 0.54;
  tuboB.rotation.y = anguloRotacion;
}

// Crear los tubos y agregarlos a la escena
for (let i = 1; i <= numTubos; i++) {
  // Crear una nueva malla
  const tuboC = new THREE.Mesh(tuboGeometry, materialTubo);

  // Posición, escala y rotación del tubo
  tuboC.position.set(0, 2.51, 0);
  tuboC.scale.set(0.053, 0.063, 0.053);
  cupulas.add(tuboC);

  // Calcular el ángulo de rotación
  const anguloRotacion = (i - 1) * angulo+ 0.67;
  tuboC.rotation.y = anguloRotacion;
}
//----------------------fin tubitos cupula------------------------

//----------------------CUPULA MEDIO------------------------------
// Cupula Medio
const cupulaMedioGeometry = new THREE.CylinderGeometry(0.85, 0.85, 1.3, 30); // R top, R bot, H, R Seg
const cupulaMedio = new THREE.Mesh(cupulaMedioGeometry, cajaMaterial);
cupulaMedio.position.set(0, 1.8, 0);
cupulas.add(cupulaMedio);
cupulaMedio.castShadow = true;
cupulaMedio.receiveShadow = true;

//Textura banda Medio Superior
const materialBandaMedioSup = new THREE.MeshStandardMaterial({
  color: 0xfbd5cb,
  map: bandaColorTexture, // Textura de color
  //displacementMap: bandaDisplaymentTexture, // Textura de desplazamiento
  normalMap: bandaNormalGLTexture, // Textura normal
  roughnessMap: bandaRoughnessTexture, // Textura de rugosidad
  aoMap: bandaAmbientOclussionTexture, // Textura de oclusión ambiental
  //displacementScale: 0.05, // Escala del desplazamiento (ajústalo según sea necesario)

  // Ajustes adicionales para mejorar el realismo
  envMapIntensity: 1, // Intensidad del mapa de entorno (ajusta según sea necesario)
  side: THREE.DoubleSide, // Renderiza el material en ambas caras del objeto

  // Ajustes para la opacidad
  // transparent: true, // Habilita la transparencia
  // opacity: 1, // Ajusta la opacidad según sea necesario (valor entre 0 y 1)
});

//--------------------Detalles cupula medio superior-------------------------------------
const bandaMedioSupGeometry = new THREE.CylinderGeometry(0.82, 0.81, 0.1, 30); // R top, R bot, H, R Seg
const bandaMedioSup = new THREE.Mesh(bandaMedioSupGeometry, materialBandaMedioSup);
bandaMedioSup.position.set(0, 2.5, 0);
cupulas.add(bandaMedioSup);
bandaMedioSup.castShadow = true;
bandaMedioSup.receiveShadow = true;

const circuloMedioSupGeometry = new THREE.CylinderGeometry(0.89, 0.87, 0.05, 30); // R top, R bot, H, R Seg
const circuloMedioSup = new THREE.Mesh(circuloMedioSupGeometry, materialBandaMedioSup);
circuloMedioSup.position.set(0, 2.48, 0);
cupulas.add(circuloMedioSup);
circuloMedioSup.castShadow = true;
circuloMedioSup.receiveShadow = true;

const circuloMedioInfGeometry = new THREE.CylinderGeometry(0.95, 0.95, 0.05, 30); // R top, R bot, H, R Seg
const circuloMedioInf = new THREE.Mesh(circuloMedioInfGeometry, materialBandaMedioSup);
circuloMedioInf.position.set(0, 2.26, 0);
cupulas.add(circuloMedioInf);
circuloMedioInf.castShadow = true;
circuloMedioInf.receiveShadow = true;

//-------------------COLUMNA SUP Cupula medio---------------------------------------
const numVigas = 4;

const baseVigaSup1Geometry = new THREE.BoxGeometry(1.85, 0.03, 0.18); 
for (let i = 0; i < numVigas; i++) {
  const baseViga = new THREE.Mesh(baseVigaSup1Geometry, materialBandaMedioSup);
  baseViga.position.set(0, 2.49, 0);
  cupulas.add(baseViga);
  baseViga.castShadow = true;
  baseViga.receiveShadow = true;
  baseViga.rotation.set(0, (i-1) * angulo + 0.08, 0);
}
for (let i = 0; i < numVigas; i++) {
  const baseVigaA = new THREE.Mesh(baseVigaSup1Geometry, materialBandaMedioSup);
  baseVigaA.position.set(0, 2.49, 0);
  cupulas.add(baseVigaA);
  baseVigaA.castShadow = true;
  baseVigaA.receiveShadow = true;
  baseVigaA.rotation.set(0, (i-1) * angulo + 0.6, 0);
}

// Crear y agregar las vigas superiores
const vigaSupGeometry = new THREE.BoxGeometry(1.8, 0.2, 0.12);
for (let i = 0; i < numVigas; i++) {
  const viga = new THREE.Mesh(vigaSupGeometry, cajaMaterial);
  viga.position.set(0, 2.38, 0);
  cupulas.add(viga);
  viga.castShadow = true;
  viga.receiveShadow = true;
  viga.rotation.set(0, (i-1) * angulo + 0.08, 0);
}

for (let i = 0; i < numVigas; i++) {
  const vigaA = new THREE.Mesh(vigaSupGeometry, cajaMaterial);
  vigaA.position.set(0, 2.38, 0);
  cupulas.add(vigaA);
  vigaA.castShadow = true;
  vigaA.receiveShadow = true;
  vigaA.rotation.set(0, (i-1) * angulo +0.6, 0);
}

const detVigaMaterial = new THREE.MeshStandardMaterial({
  map: concreteTexture,
  color: "#BCA37F", // f4f4f4 dad2c5 #f4eadc BBAB8C
  roughness: 0.5, // Adjust roughness
  metalness: 0, // Adjust metalness
});
const detVigaSupGeometry = new THREE.BoxGeometry(1.82, 0.02, 0.14); 
for (let i = 0; i < numVigas; i++) {
  const detViga = new THREE.Mesh(detVigaSupGeometry, detVigaMaterial);
  detViga.position.set(0, 2.47, 0);
  cupulas.add(detViga);
  detViga.castShadow = true;
  detViga.receiveShadow = true;
  detViga.rotation.set(0, (i-1) * angulo + 0.08, 0);
}
for (let i = 0; i < numVigas; i++) {
  const detVigaA = new THREE.Mesh(detVigaSupGeometry, detVigaMaterial);
  detVigaA.position.set(0, 2.47, 0);
  cupulas.add(detVigaA);
  detVigaA.castShadow = true;
  detVigaA.receiveShadow = true;
  detVigaA.rotation.set(0, (i-1) * angulo + 0.6, 0);
}

const detVigaSup1Geometry = new THREE.BoxGeometry(1.815, 0.03, 0.13); 
for (let i = 0; i < numVigas; i++) {
  const detViga1 = new THREE.Mesh(detVigaSup1Geometry, detVigaMaterial);
  detViga1.position.set(0, 2.46, 0);
  cupulas.add(detViga1);
  detViga1.castShadow = true;
  detViga1.receiveShadow = true;
  detViga1.rotation.set(0, (i-1) * angulo + 0.08, 0);
}
for (let i = 0; i < numVigas; i++) {
  const detViga1A = new THREE.Mesh(detVigaSup1Geometry, detVigaMaterial);
  detViga1A.position.set(0, 2.46, 0);
  cupulas.add(detViga1A);
  detViga1A.castShadow = true;
  detViga1A.receiveShadow = true;
  detViga1A.rotation.set(0, (i-1) * angulo + 0.6, 0);
}

const detVigaSupCirculoGeometry = new THREE.CylinderGeometry(0.88, 0.88, 0.02, 30); // R top, R bot, H, R Seg
const detVigaSupCirculo = new THREE.Mesh(detVigaSupCirculoGeometry, detVigaMaterial);
detVigaSupCirculo.position.set(0, 2.46, 0);
cupulas.add(detVigaSupCirculo);
detVigaSupCirculo.castShadow = true;
detVigaSupCirculo.receiveShadow = true;

const baseVigaInfGeometry = new THREE.BoxGeometry(1.83, 0.05, 0.14); 
for (let i = 0; i < numVigas; i++) {
  const baseViga = new THREE.Mesh(baseVigaInfGeometry, detVigaMaterial);
  baseViga.position.set(0, 2.3, 0);
  cupulas.add(baseViga);
  baseViga.castShadow = true;
  baseViga.receiveShadow = true;
  baseViga.rotation.set(0, (i-1) * angulo + 0.08, 0);
}
for (let i = 0; i < numVigas; i++) {
  const baseVigaA = new THREE.Mesh(baseVigaInfGeometry, detVigaMaterial);
  baseVigaA.position.set(0, 2.3, 0);
  cupulas.add(baseVigaA);
  baseVigaA.castShadow = true;
  baseVigaA.receiveShadow = true;
  baseVigaA.rotation.set(0, (i-1) * angulo + 0.6, 0);
}

const baseDetVigaInfGeometry = new THREE.CylinderGeometry(0.87, 0.87, 0.05, 30); // R top, R bot, H, R Seg
const baseDetVigaInfCirculo = new THREE.Mesh(baseDetVigaInfGeometry, detVigaMaterial);
baseDetVigaInfCirculo.position.set(0, 2.3, 0);
cupulas.add(baseDetVigaInfCirculo);
baseDetVigaInfCirculo.castShadow = true;
baseDetVigaInfCirculo.receiveShadow = true;

const sobresaltadoVigaInfGeometry = new THREE.CylinderGeometry(0.98, 0.98 , 0.05, 30, 1,false , 0, Math.PI / 6); 
for (let i = 0; i < 8; i++) {
  const sobresaltadoViga = new THREE.Mesh(sobresaltadoVigaInfGeometry, materialBandaMedioSup);
  sobresaltadoViga.position.set(0, 2.26, 0);
  cupulas.add(sobresaltadoViga);
  sobresaltadoViga.castShadow = true;
  sobresaltadoViga.receiveShadow = true;
  sobresaltadoViga.rotation.set(0, (i-1) * angulo + 0.475 , 0);
}
//-------------------fin detalles cupula medio superior-------------------------

//-------------------detalles cupula medio inferior-----------------------------
//base superior de las columnas
const baseInfColGeometry = new THREE.BoxGeometry(1.78, 0.2, 0.35); 
for (let i = 0; i < 8; i++) {
  const baseInfCol = new THREE.Mesh(baseInfColGeometry, cajaMaterial);
  baseInfCol.position.set(0, 2.16, 0);
  cupulas.add(baseInfCol);
  baseInfCol.castShadow = true;
  baseInfCol.receiveShadow = true;
  baseInfCol.rotation.set(0, (i-1) * angulo + 0.735, 0);
}

const radioOrbita = 0.85;
const cantidadCilindros = 8;

//columnas inferior cupula medio 
const colInfCupulaMedioGeometry = new THREE.CylinderGeometry(0.055, 0.075, 1, 30); // R top, R bot, H, R Seg

for (let i = 0; i < cantidadCilindros; i++) {
  const angulo = (Math.PI / 4) * i + 0.7;

  const colInfCupulaMedio = new THREE.Mesh(colInfCupulaMedioGeometry, cajaMaterial);
  const posX = radioOrbita * Math.cos(angulo);
  const posY = 1.56;
  const posZ = radioOrbita * Math.sin(angulo);

  colInfCupulaMedio.position.set(posX, posY, posZ);
  cupulas.add(colInfCupulaMedio);
  colInfCupulaMedio.castShadow = true;
  colInfCupulaMedio.receiveShadow = true;
}

for (let i = 0; i < cantidadCilindros; i++) {
  const angulo = (Math.PI / 4) * i + 0.19;

  const colInfCupulaMedioA = new THREE.Mesh(colInfCupulaMedioGeometry, cajaMaterial);
  const posX = radioOrbita * Math.cos(angulo);
  const posY = 1.56;
  const posZ = radioOrbita * Math.sin(angulo);

  colInfCupulaMedioA.position.set(posX, posY, posZ);
  cupulas.add(colInfCupulaMedioA);
  colInfCupulaMedioA.castShadow = true;
  colInfCupulaMedioA.receiveShadow = true;
}

const detColInfCupulaMedioInfGeometry = new THREE.CylinderGeometry(0.87, 0.87, 0.03, 30); // R top, R bot, H, R Seg
const detColInfCupulaMedioInfCirculo = new THREE.Mesh(detColInfCupulaMedioInfGeometry, detVigaMaterial);
detColInfCupulaMedioInfCirculo.position.set(0, 2.22, 0);
cupulas.add(detColInfCupulaMedioInfCirculo);
detColInfCupulaMedioInfCirculo.castShadow = true;
detColInfCupulaMedioInfCirculo.receiveShadow = true;

const sobresaltadoColInfGeometry = new THREE.CylinderGeometry(0.95, 0.95 , 0.03, 30, 1,false , 0, Math.PI / 7); 
for (let i = 0; i < 8; i++) {
  const sobresaltadoColInf = new THREE.Mesh(sobresaltadoColInfGeometry, detVigaMaterial);
  sobresaltadoColInf.position.set(0, 2.22, 0);
  cupulas.add(sobresaltadoColInf);
  sobresaltadoColInf.castShadow = true;
  sobresaltadoColInf.receiveShadow = true;
  sobresaltadoColInf.rotation.set(0, (i-1) * angulo + 0.52 , 0);
}

const detColInf2CupulaMedioInfGeometry = new THREE.CylinderGeometry(0.86, 0.86, 0.02, 30); // R top, R bot, H, R Seg
const detColInfCupula2MedioInfCirculo = new THREE.Mesh(detColInf2CupulaMedioInfGeometry, cajaMaterial);
detColInfCupula2MedioInfCirculo.position.set(0, 2.12, 0);
cupulas.add(detColInfCupula2MedioInfCirculo);
detColInfCupula2MedioInfCirculo.castShadow = true;
detColInfCupula2MedioInfCirculo.receiveShadow = true;
//------------------------------CUPULA 2 PEQUEÑA---------------- 
//Cupula Medio pequeña de arriba donde esta la cruz
const cupulaMedioSmallGeometry = new THREE.CylinderGeometry(0.19, 0.19, 0.8, 30); // R top, R bot, H, R Seg
const cupulaMedioSmall = new THREE.Mesh(cupulaMedioSmallGeometry, cajaMaterial);
cupulaMedioSmall.position.set(0, 3.5, 0);
cupulas.add(cupulaMedioSmall);
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

cupulas.add(cupulaSmall);

cupulaSmall.castShadow = true;
cupulaSmall.receiveShadow = true;

//-------------------------TERMINO DE CUPULAS-----------------------------------------

//-------------------------BASE DE CUPULAS--------------------------------------------
const baseCupula = new THREE.Group(); 
panteon.add(baseCupula);

// Cupula Base
const cupulaBaseGeometry = new THREE.BoxGeometry(1.3,0.8,1.8) // Width, Height, Depth
const cupulaBase = new THREE.Mesh(cupulaBaseGeometry, cajaMaterial)
cupulaBase.position.set(0,1,0);
baseCupula.add(cupulaBase);
cupulaBase.castShadow = true;
cupulaBase.receiveShadow = true;

const cupulaBaseGeometry2 = new THREE.BoxGeometry(1.8,0.8,1.3) // Width, Height, Depth
const cupulaBase2 = new THREE.Mesh(cupulaBaseGeometry2, cajaMaterial)
cupulaBase2.position.set(0,1,0);
baseCupula.add(cupulaBase2);
cupulaBase2.castShadow = true;
cupulaBase2.receiveShadow = true;

const cupulaBaseGeometry3 = new THREE.BoxGeometry(1.3,0.05,1.8) // Width, Height, Depth
const cupulaBase3 = new THREE.Mesh(cupulaBaseGeometry3, baldosaMaterial2)
cupulaBase3.position.set(0,1.43,0);
baseCupula.add(cupulaBase3);
cupulaBase3.castShadow = true;
cupulaBase3.receiveShadow = true;

const cupulaBaseGeometry4 = new THREE.BoxGeometry(1.8,0.05,1.3) // Width, Height, Depth
const cupulaBase4 = new THREE.Mesh(cupulaBaseGeometry4, baldosaMaterial2)
cupulaBase4.position.set(0,1.43,0);
baseCupula.add(cupulaBase4);
cupulaBase4.castShadow = true;
cupulaBase4.receiveShadow = true;

//////// TECHO TRIANGULAR PIRAMIDE ///////////////////////////////////////////////

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

//////////////////////// PALABRA FRASE /////////////////////////
  const fontLoader = new FontLoader();
  fontLoader.load(
    'fonts/Cinzel_Regular.json',
    (font) => {
      const textGeometry = new TextGeometry('FIDES   ET   PATRIA', {
        font: font,
        size: 0.08,
        height: 0.9,
        curveSegments: 40, 
        bevelEnabled: false, 
        bevelThickness: 0.02,
        bevelSize: 5,
        bevelSegments: 5,
        letterSpacing: 10, // ESPACIADO q no sirve
      });
      const textMaterial = new THREE.MeshPhongMaterial({ color: "#746e6e" });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-0.5,0.85,2.58)
      panteon.add(textMesh);

    }
  );

/////////////////////////////////////////////////////////////////////

/// Ventanales laterales PRUEBA

const ventanal = crearVentana();
ventanal.position.set(-1.7, 0, -1)
ventanal.rotation.y = Math.PI / 2;  // Rotar 45 grados
panteon.add(ventanal);

// const ventanal2 = crearVentana();
// ventanal2.position.set(-1.7, 0.5, 0)
// ventanal2.rotation.y = Math.PI / 2;  // Rotar 45 grados
// panteon.add(ventanal2);


///



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


///////////////// BORDE PASTO /////////////////////////////////
const bordeMaterial = new THREE.MeshStandardMaterial({
  map: concreteTexture,
  color: "#f4f4f4", // f4f4f4 dad2c5 #f4eadc
  roughness: 0.5, // Adjust roughness
  metalness: 0, // Adjust metalness
});
function crearBordePasto(geometry, position, rotation) {
  const bordePasto = new THREE.Mesh(geometry, bordeMaterial);
  bordePasto.position.copy(position);
  bordePasto.rotation.y = rotation;
  panteon.add(bordePasto);
  bordePasto.castShadow = true;
  bordePasto.receiveShadow = true;
}

function crearBordePastoL(geometry, position) {
  const bordePastoLat = new THREE.Mesh(geometry, bordeMaterial);
  bordePastoLat.position.copy(position);
  panteon.add(bordePastoLat);
  bordePastoLat.castShadow = true;
  bordePastoLat.receiveShadow = true;
}

const bordePastoGeometria = new THREE.BoxGeometry(0.05, 0.05, 0.8);
const bordePastoGeometria3 = new THREE.BoxGeometry(0.05, 0.05, 0.65);
const bordePastoLGeometria = new THREE.BoxGeometry(0.05, 0.05, 3);
const bordePastoLGeometria2 = new THREE.BoxGeometry(0.05, 0.05, 1.6);

// Borde de pasto derecho
crearBordePasto(bordePastoGeometria, new THREE.Vector3(1.5, -0.95, 4.05), 0);
crearBordePasto(bordePastoGeometria, new THREE.Vector3(2.1, -0.95, 4.05), 0);
crearBordePasto(bordePastoGeometria3, new THREE.Vector3(1.8, -0.95, 3.65), Math.PI / 2);
crearBordePasto(bordePastoGeometria3, new THREE.Vector3(1.8, -0.95, 4.45), Math.PI / 2);

// Borde de pasto izquierdo
crearBordePasto(bordePastoGeometria, new THREE.Vector3(-1.5, -0.95, 4.05), 0);
crearBordePasto(bordePastoGeometria, new THREE.Vector3(-2.1, -0.95, 4.05), 0);
crearBordePasto(bordePastoGeometria3, new THREE.Vector3(-1.8, -0.95, 3.65), Math.PI / 2);
crearBordePasto(bordePastoGeometria3, new THREE.Vector3(-1.8, -0.95, 4.45), Math.PI / 2);
crearBordePastoL(bordePastoLGeometria, new THREE.Vector3(-2.9, -0.95, 2.95));
crearBordePastoL(bordePastoLGeometria, new THREE.Vector3(-2.3, -0.95, 2.95));
crearBordePasto(bordePastoGeometria3, new THREE.Vector3(-2.6, -0.95, 1.45), Math.PI / 2);
crearBordePasto(bordePastoGeometria3, new THREE.Vector3(-2.6, -0.95, 4.45), Math.PI / 2);
crearBordePasto(bordePastoGeometria3, new THREE.Vector3(-2.6, -0.95, -1.3), Math.PI / 2);
crearBordePasto(bordePastoGeometria3, new THREE.Vector3(-2.6, -0.95, 0.3), Math.PI / 2);
crearBordePastoL(bordePastoLGeometria2, new THREE.Vector3(-2.9, -0.95, -0.5));
crearBordePastoL(bordePastoLGeometria2, new THREE.Vector3(-2.3, -0.95, -0.5));


/////////////////////// REJAS /////////////////////// 
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
  rejaFina.castShadow = true;
  rejaFina.receiveShadow = true;
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
  rejaLateral.castShadow = true;
  rejaLateral.receiveShadow = true;
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

/////////////////// REJAS DEL TECHO ////////////////////////////
const rejaFgeometry2 = new THREE.BoxGeometry(0.008, 0.2, 0.008);
function crearRejaFina2(panteon, posX, posY, posZ) {
  const rejaFina = new THREE.Mesh(rejaFgeometry2, rejaMaterial);
  rejaFina.position.set(posX, posY, posZ);
  panteon.add(rejaFina);
  rejaFina.castShadow = true;
  rejaFina.receiveShadow = true;
}
// Función para crear rejas finas en un rango
function crearRejasFinasRango2(panteon, startPosX, endPosX, posY, posZ, step) {
  for (let posX = startPosX; posX <= endPosX; posX += step) {
    crearRejaFina2(panteon, posX, posY, posZ);
  }
}
function crearRejasFinasRangoLat2(panteon, posX, posY, startPosZ, endPosZ, step) {
  for (let posZ = startPosZ; posZ <= endPosZ; posZ += step) {
    crearRejaFina2(panteon, posX, posY, posZ);
  }
}

crearRejasFinasRango2(baseCupula, -0.64, -0.10, 1.55, 0.88, 0.02); // delantera izq
crearRejasFinasRango2(baseCupula, 0.10, 0.64, 1.55, 0.88, 0.02); // delantera der
crearRejasFinasRango2(baseCupula, -0.64, 0.64, 1.55, -0.88, 0.02); // trasera
crearRejasFinasRango2(baseCupula, -0.88, -0.64, 1.55, 0.60, 0.02); // del izq izq
crearRejasFinasRango2(baseCupula, 0.64, 0.88, 1.55, 0.60, 0.02); // del dere derecha
crearRejasFinasRango2(baseCupula, -0.88, -0.64, 1.55, -0.60, 0.02); // tras der derecha
crearRejasFinasRango2(baseCupula, 0.64, 0.88, 1.55, -0.60, 0.02); // tras izq izquierda

//escaleras camino
crearRejasFinasRangoLat2(baseCupula, -0.10, 1.55, 0.88, 1.2, 0.02); // del lat izq
crearRejasFinasRangoLat2(baseCupula, 0.10, 1.55, 0.88, 1.39, 0.02); // del lat der
crearRejasFinasRango2(baseCupula, -0.20, -0.10, 1.55, 1.2, 0.02); // del izq izq
crearRejasFinasRango2(baseCupula, -0.20, 0.10, 1.55, 1.39, 0.02); // del izq izq
// escaleras subida
const positions = [
  { x: -0.20, y: 1.55 },
  { x: -0.22, y: 1.533 },
  { x: -0.24, y: 1.516 },
  { x: -0.26, y: 1.499 },
  { x: -0.28, y: 1.481 },
  { x: -0.30, y: 1.464 },
  { x: -0.32, y: 1.446 },
  { x: -0.34, y: 1.429 },
  { x: -0.36, y: 1.411 },
  { x: -0.38, y: 1.394 },
  { x: -0.40, y: 1.377 },
  { x: -0.42, y: 1.359 },
  { x: -0.44, y: 1.342 },
  { x: -0.46, y: 1.324 },
  { x: -0.48, y: 1.307 },
  { x: -0.50, y: 1.290 },
  { x: -0.52, y: 1.272 },
  { x: -0.54, y: 1.255 },
  { x: -0.56, y: 1.237 },
  { x: -0.58, y: 1.220 },
  { x: -0.60, y: 1.203 },
  { x: -0.62, y: 1.185 },
  { x: -0.64, y: 1.168 },
  { x: -0.66, y: 1.150 },
  { x: -0.68, y: 1.133 },
  { x: -0.70, y: 1.115 },
  { x: -0.72, y: 1.098 },
  { x: -0.74, y: 1.081 },
];




positions.forEach(pos => crearRejaFina2(baseCupula, pos.x, pos.y, 1.2));
positions.forEach(pos => crearRejaFina2(baseCupula, pos.x, pos.y, 1.39));

crearRejasFinasRangoLat2(baseCupula, -0.64, 1.55, -0.88, -0.60, 0.02); //  tras lat izq
crearRejasFinasRangoLat2(baseCupula, -0.64, 1.55, 0.60, 0.88, 0.02); // del lat izq
crearRejasFinasRangoLat2(baseCupula, 0.64, 1.55, -0.88, -0.60, 0.02); // tras lat der
crearRejasFinasRangoLat2(baseCupula, 0.64, 1.55, 0.60, 0.88, 0.02); // del lat der
crearRejasFinasRangoLat2(baseCupula, -0.88, 1.55, -0.60, 0.60, 0.02); // lateral izq
crearRejasFinasRangoLat2(baseCupula, 0.88, 1.55, -0.60, 0.60, 0.02); // lateral der

//////// BARRAS REJA TECHO /////////////////////////
function crearBarraTecho(geometry, material, position, rotation) {
  const barraTecho = new THREE.Mesh(geometry, material);
  barraTecho.position.copy(position);
  barraTecho.rotation.y = rotation;
  baseCupula.add(barraTecho);
}

// Barra reja techo
const barraTGeometry = new THREE.BoxGeometry(0.008, 0.008, 0.54);
const barraTGeometryb = new THREE.BoxGeometry(0.008, 0.008, 0.54);
const barraTGeometry2 = new THREE.BoxGeometry(0.008, 0.008, 1.28);
const barraTGeometry3 = new THREE.BoxGeometry(0.008, 0.008, 1.2);
const barraTGeometry4 = new THREE.BoxGeometry(0.008, 0.008, 0.28);
const barraTGeometry5 = new THREE.BoxGeometry(0.008, 0.008, 0.25);


// Delantera izquierda
crearBarraTecho(barraTGeometry, rejaMaterial, new THREE.Vector3(-0.37, 1.646, 0.88), Math.PI / 2);
crearBarraTecho(barraTGeometry, rejaMaterial, new THREE.Vector3(-0.37, 1.62, 0.88), Math.PI / 2);

// Delantera derecha
crearBarraTecho(barraTGeometryb, rejaMaterial, new THREE.Vector3(0.37, 1.646, 0.88), Math.PI / 2);
crearBarraTecho(barraTGeometryb, rejaMaterial, new THREE.Vector3(0.37, 1.62, 0.88), Math.PI / 2);

// Trasera
crearBarraTecho(barraTGeometry2, rejaMaterial, new THREE.Vector3(0, 1.646, -0.88), Math.PI / 2);
crearBarraTecho(barraTGeometry2, rejaMaterial, new THREE.Vector3(0, 1.62, -0.88), Math.PI / 2);

// Laterales largas
crearBarraTecho(barraTGeometry3, rejaMaterial, new THREE.Vector3(-0.88, 1.62, 0), 0);
crearBarraTecho(barraTGeometry3, rejaMaterial, new THREE.Vector3(-0.88, 1.646, 0), 0);
crearBarraTecho(barraTGeometry3, rejaMaterial, new THREE.Vector3(0.88, 1.62, 0), 0);
crearBarraTecho(barraTGeometry3, rejaMaterial, new THREE.Vector3(0.88, 1.646, 0), 0);

// Lateral corta
crearBarraTecho(barraTGeometry4, rejaMaterial, new THREE.Vector3(-0.64, 1.646, 0.74), 0);
crearBarraTecho(barraTGeometry4, rejaMaterial, new THREE.Vector3(-0.64, 1.62, 0.74), 0);
crearBarraTecho(barraTGeometry4, rejaMaterial, new THREE.Vector3(0.64, 1.646, 0.74), 0);
crearBarraTecho(barraTGeometry4, rejaMaterial, new THREE.Vector3(0.64, 1.62, 0.74), 0);
crearBarraTecho(barraTGeometry4, rejaMaterial, new THREE.Vector3(-0.64, 1.646, -0.74), 0);
crearBarraTecho(barraTGeometry4, rejaMaterial, new THREE.Vector3(-0.64, 1.62, -0.74), 0);
crearBarraTecho(barraTGeometry4, rejaMaterial, new THREE.Vector3(0.64, 1.646, -0.74), 0);
crearBarraTecho(barraTGeometry4, rejaMaterial, new THREE.Vector3(0.64, 1.62, -0.74), 0);

// Izq Izq Frente
crearBarraTecho(barraTGeometry5, rejaMaterial, new THREE.Vector3(-0.76, 1.646, 0.6), Math.PI / 2);
crearBarraTecho(barraTGeometry5, rejaMaterial, new THREE.Vector3(-0.76, 1.62, 0.6), Math.PI / 2);
// Der Der Frente
crearBarraTecho(barraTGeometry5, rejaMaterial, new THREE.Vector3(0.76, 1.646, 0.6), Math.PI / 2);
crearBarraTecho(barraTGeometry5, rejaMaterial, new THREE.Vector3(0.76, 1.62, 0.6), Math.PI / 2);
// Izq Izq Tras
crearBarraTecho(barraTGeometry5, rejaMaterial, new THREE.Vector3(-0.76, 1.646, -0.6), Math.PI / 2);
crearBarraTecho(barraTGeometry5, rejaMaterial, new THREE.Vector3(-0.76, 1.62, -0.6), Math.PI / 2);
// Der Der Tras
crearBarraTecho(barraTGeometry5, rejaMaterial, new THREE.Vector3(0.76, 1.646, -0.6), Math.PI / 2);
crearBarraTecho(barraTGeometry5, rejaMaterial, new THREE.Vector3(0.76, 1.62, -0.6), Math.PI / 2);

//////// BARRA ESCALERA /////////////
const barraTGeometry6 = new THREE.BoxGeometry(0.7, 0.008, 0.008);
const barraEscaleraTecho = new THREE.Mesh(barraTGeometry6, rejaMaterial);
barraEscaleraTecho.position.set(-0.48, 1.41, 1.2);
barraEscaleraTecho.rotation.set(0, 0,(41 * Math.PI) / 180)
baseCupula.add(barraEscaleraTecho);

const barraEscaleraTecho2 = new THREE.Mesh(barraTGeometry6, rejaMaterial);
barraEscaleraTecho2.position.set(-0.48, 1.41, 1.39);
barraEscaleraTecho2.rotation.set(0, 0,(41 * Math.PI) / 180)
baseCupula.add(barraEscaleraTecho2);

const barraEscaleraTechoa = new THREE.Mesh(barraTGeometry6, rejaMaterial);
barraEscaleraTechoa.position.set(-0.48, 1.384, 1.2);
barraEscaleraTechoa.rotation.set(0, 0,(41 * Math.PI) / 180)
baseCupula.add(barraEscaleraTechoa);

const barraEscaleraTecho2a = new THREE.Mesh(barraTGeometry6, rejaMaterial);
barraEscaleraTecho2a.position.set(-0.48, 1.384, 1.39);
barraEscaleraTecho2a.rotation.set(0, 0,(41 * Math.PI) / 180)
baseCupula.add(barraEscaleraTecho2a);

const barraTGeometry7 = new THREE.BoxGeometry(0.3, 0.008, 0.008);
const barraEscaleraTecho3 = new THREE.Mesh(barraTGeometry7, rejaMaterial);
barraEscaleraTecho3.position.set(-0.05, 1.646, 1.39);
baseCupula.add(barraEscaleraTecho3);
const barraEscaleraTecho3a = new THREE.Mesh(barraTGeometry7, rejaMaterial);
barraEscaleraTecho3a.position.set(-0.05, 1.62, 1.39);
baseCupula.add(barraEscaleraTecho3a);

const barraTGeometry8 = new THREE.BoxGeometry(0.008, 0.008, 0.511);
const barraEscaleraTecho4 = new THREE.Mesh(barraTGeometry8, rejaMaterial);
barraEscaleraTecho4.position.set(0.1, 1.646, 1.135);
baseCupula.add(barraEscaleraTecho4);
const barraEscaleraTecho4a = new THREE.Mesh(barraTGeometry8, rejaMaterial);
barraEscaleraTecho4a.position.set(0.1, 1.62, 1.135);
baseCupula.add(barraEscaleraTecho4a);

const barraTGeometry9 = new THREE.BoxGeometry(0.008, 0.008, 0.32);
const barraEscaleraTecho5 = new THREE.Mesh(barraTGeometry9, rejaMaterial);
barraEscaleraTecho5.position.set(-0.1, 1.646, 1.04);
baseCupula.add(barraEscaleraTecho5);
const barraEscaleraTecho5a = new THREE.Mesh(barraTGeometry9, rejaMaterial);
barraEscaleraTecho5a.position.set(-0.1, 1.62, 1.04);
baseCupula.add(barraEscaleraTecho5a);

const barraTGeometry10 = new THREE.BoxGeometry(0.11, 0.008, 0.008);
const barraEscaleraTecho6 = new THREE.Mesh(barraTGeometry10, rejaMaterial);
barraEscaleraTecho6.position.set(-0.15, 1.646, 1.2);
baseCupula.add(barraEscaleraTecho6);

const barraEscaleraTecho6a = new THREE.Mesh(barraTGeometry10, rejaMaterial);
barraEscaleraTecho6a.position.set(-0.15, 1.62, 1.2);
baseCupula.add(barraEscaleraTecho6a);

/////////   BASE ESCALERA ////////////
const baseEscaleraTechoGeometry = new THREE.BoxGeometry(0.2, 0.5, 0.8);
const baseEscaleraTecho = new THREE.Mesh(baseEscaleraTechoGeometry, cajaMaterial);
baseEscaleraTecho.position.set(0,1.15,1);
baseEscaleraTecho.castShadow = true;
baseEscaleraTecho.receiveShadow = true;
baseCupula.add(baseEscaleraTecho);
const baseEscaleraTechoGeometry2 = new THREE.BoxGeometry(0.2, 0.055, 0.8);
const baseEscaleraTecho2 = new THREE.Mesh(baseEscaleraTechoGeometry2, baldosaMaterial2);
baseEscaleraTecho2.position.set(0,1.43,1);
baseEscaleraTecho2.castShadow = true;
baseEscaleraTecho2.receiveShadow = true;
baseCupula.add(baseEscaleraTecho2);
const baseEscaleraTechoGeometry3 = new THREE.BoxGeometry(0.15, 0.055, 0.2);
const baseEscaleraTecho3 = new THREE.Mesh(baseEscaleraTechoGeometry3, baldosaMaterial2);
baseEscaleraTecho3.position.set(-0.15,1.43,1.3);
baseEscaleraTecho3.castShadow = true;
baseEscaleraTecho3.receiveShadow = true;
baseCupula.add(baseEscaleraTecho3);
const baseEscaleraTechoGeometry4 = new THREE.BoxGeometry(0.15, 0.5, 0.2);
const baseEscaleraTecho4 = new THREE.Mesh(baseEscaleraTechoGeometry4, cajaMaterial);
baseEscaleraTecho4.position.set(-0.15,1.15,1.3);
baseEscaleraTecho4.castShadow = true;
baseEscaleraTecho4.receiveShadow = true;
baseCupula.add(baseEscaleraTecho4);

function crearEscaleraTecho(baseCupula, cantidad, posX, posY, posZ) {
  const baseEscaleraTechoGeometry3 = new THREE.BoxGeometry(0.05, 0.5, 0.2);
  for (let i = 0; i < cantidad; i++) {
    const baseEscaleraTecho = new THREE.Mesh(baseEscaleraTechoGeometry3, cajaMaterial);
    baseEscaleraTecho.position.set(posX, posY, posZ);
    baseEscaleraTecho.castShadow = true;
    baseEscaleraTecho.receiveShadow = true;
    baseCupula.add(baseEscaleraTecho);

    // Actualizar las posiciones para el siguiente elemento en el patrón
    posX -= 0.04;
    posY -= 0.03;
    posZ = 1.3; // Ajusta esto según tu necesidad
  }
}

// Llamada a la función
crearEscaleraTecho(baseCupula, 13, -0.25, 1.15, 1.3);


//Mover cupulas y base de cupula hacia la derecha 
cupulas.position.set(0, 0.55, 0.4); // Mover el grupo
baseCupula.position.set(0, 0, 0.4);

//baseCupula.scale.set(1.1, 1, 1.1);
cupulas.scale.set(0.85, 0.85, 0.85);
////////////////////////////////////////////////////


//OPCIONES DE LUZ
const lightProperties = {
  color: 0xffffff,
  intensity: 1,
  distance: 0,
  position: { x: 2.2, y: 33.6, z: 11.2},
  target: {x: -2, y: -7, z: -2},
  angle: 1,
  penumbra: 0.5
};

// Light
const light = new THREE.DirectionalLight(lightProperties.color, lightProperties.intensity, lightProperties.distance);
light.position.set(lightProperties.x, lightProperties.y, lightProperties.z);
scene.add(light);
light.castShadow = true;
light.shadow.camera.width = 100;
light.shadow.camera.height = 100;
light.shadow.mapSize.width = 2048; // Resolución de sombra (ajusta según sea necesario)
light.shadow.mapSize.height = 2048;
light.shadow.filter = THREE.PCFSoftShadowMap;  // Filtrado suave para las sombras
//light.shadow.bias = 0.001;  // Ajusta según sea necesario

//camara para shadows
const dLightShadowHelper = new THREE.CameraHelper(light.shadow.camera);
scene.add(dLightShadowHelper);

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
renderer.antialias = true;

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
