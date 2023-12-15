import * as THREE from 'three';

export function crearVentana() {

    console.log("Hola");
    // Crear la geometría del rectángulo
const ancho = 0.5;  //
const alto = 1;  //2
const rectanguloGeometry = new THREE.PlaneGeometry(ancho, alto);

//textura para ventana
const textura = new THREE.TextureLoader().load('texture/ventana/ventana_vieja.jpg');
// Crear el material del rectángulo
const rectanguloMaterial = new THREE.MeshBasicMaterial({
  map: textura, // Asignar la textura al mapa de textura
  //color: 0x00ffff, // Color del rectángulo
  side: THREE.DoubleSide, // Mostrar el material en ambas caras del rectángulo
  transparent: true,
  opacity: 0.5,
});

// Crear la malla del rectángulo
const rectanguloMesh = new THREE.Mesh(rectanguloGeometry, rectanguloMaterial);

// Crear un shape para el semicírculo
const semicirculoShape = new THREE.Shape();

// Definir el arco del semicírculo
const radio = 0.25;
const inicioAngulo = 0;
const finAngulo = Math.PI; // Semicírculo

semicirculoShape.absarc(0, 0, radio, inicioAngulo, finAngulo, false);

// Crear la geometría extruida del semicírculo
const extrusionSettings = {
  depth: 0, // Grosor del semicírculo
  bevelEnabled: false, // Desactivar el biselado
};

const semicirculoGeometry = new THREE.ExtrudeGeometry(semicirculoShape, extrusionSettings);

// Crear el material del semicírculo
const semicirculoMaterial = new THREE.MeshBasicMaterial({
  map: textura, // Color del semicírculo
  //color: 0x00ffff,
  side: THREE.DoubleSide, // Mostrar el material en ambas caras del semicírculo
  transparent: true,
  opacity: 0.5,
});

// Crear la malla del semicírculo
const semicirculoMesh = new THREE.Mesh(semicirculoGeometry, semicirculoMaterial);

// Posicionar el semicírculo en la escena
semicirculoMesh.position.set(0, 0.5, 0); // Ajustar las coordenadas según sea necesario

//GRUPO
// Crear un grupo para las figuras
const grupoVentana = new THREE.Group();

// Agregar el rectángulo al grupo
grupoVentana.add(rectanguloMesh);

// Agregar el semicírculo al grupo
grupoVentana.add(semicirculoMesh);



return grupoVentana;

// Posicionar el rectángulo en la escena
//rectanguloMesh.position.set(x, y, z); // Ajustar las coordenadas según sea necesario

// Añadir el rectángulo a la escena
//scene.add(rectanguloMesh);
  }
