import * as THREE from 'three';

export function crearVentana() {

    console.log("Hola");
    // Crear la geometría del rectángulo
const ancho = 0.25;  //
const alto = 0.5;  //2
const rectanguloGeometry = new THREE.PlaneGeometry(ancho, alto);


const texturaRec = new THREE.TextureLoader().load('texture/ventana/ventanaAbajoRec.png');
const texturaSemi = new THREE.TextureLoader().load('texture/ventana/semiBlanco.jpg');
//textura para ventana Cupula o paredes
// if (x == 1) {
//   const texturaRec = new THREE.TextureLoader().load('texture/ventana/cupulaRec.png');
//   const texturaSemi = new THREE.TextureLoader().load('texture/ventana/cupulaSemi.png');
// }



// Crear el material del rectángulo
const rectanguloMaterial = new THREE.MeshBasicMaterial({
  map: texturaRec, // Asignar la textura al mapa de textura
  //color: 0x00ffff, // Color del rectángulo
  side: THREE.DoubleSide, // Mostrar el material en ambas caras del rectángulo
  transparent: true,
  opacity: 0.8,
});

// Crear la malla del rectángulo
const rectanguloMesh = new THREE.Mesh(rectanguloGeometry, rectanguloMaterial);

// Crear un shape para el semicírculo
const semicirculoShape = new THREE.Shape();

// Definir el arco del semicírculo
const radio = 0.125;
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
  map: texturaSemi, // Color del semicírculo
  //color: 0x00ffff,
  side: THREE.DoubleSide, // Mostrar el material en ambas caras del semicírculo
  transparent: true,
  opacity: 0.8,
});

// Crear la malla del semicírculo
const semicirculoMesh = new THREE.Mesh(semicirculoGeometry, semicirculoMaterial);

// Posicionar el semicírculo en la escena
semicirculoMesh.position.set(0, 0.25, 0); // Ajustar las coordenadas según sea necesario

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

export function crearVentanaCupula() {

  console.log("Hola");
  // Crear la geometría del rectángulo
const ancho = 0.25;  //
const alto = 0.5;  //2
const rectanguloGeometry = new THREE.PlaneGeometry(ancho, alto);



const texturaRec = new THREE.TextureLoader().load('texture/ventana/cupulaRec.png');
const texturaSemi = new THREE.TextureLoader().load('texture/ventana/cupulaSemi.png');


// Crear el material del rectángulo
const rectanguloMaterial = new THREE.MeshBasicMaterial({
map: texturaRec, // Asignar la textura al mapa de textura
//color: 0x00ffff, // Color del rectángulo
side: THREE.DoubleSide, // Mostrar el material en ambas caras del rectángulo
transparent: true,
opacity: 1,
});

// Crear la malla del rectángulo
const rectanguloMesh = new THREE.Mesh(rectanguloGeometry, rectanguloMaterial);

// Crear un shape para el semicírculo
const semicirculoShape = new THREE.Shape();

// Definir el arco del semicírculo
const radio = 0.125;
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
map: texturaSemi, // Color del semicírculo
//color: 0x00ffff,
side: THREE.DoubleSide, // Mostrar el material en ambas caras del semicírculo
transparent: true,
opacity: 0.8,
});

// Crear la malla del semicírculo
const semicirculoMesh = new THREE.Mesh(semicirculoGeometry, semicirculoMaterial);

// Posicionar el semicírculo en la escena
semicirculoMesh.position.set(0, 0.25, 0); // Ajustar las coordenadas según sea necesario

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

export function crearArco() {
  

  // Crear un shape para el arco
const arcoShape = new THREE.Shape();

// Definir el arco (en sentido horario)
const radio = 0.7;
const inicioAngulo = 0; // ángulo inicial
const finAngulo = Math.PI; // ángulo final (semicírculo)
arcoShape.absarc(0, 0, radio, inicioAngulo, finAngulo, false);

// Crear la geometría extruida del arco
const extrusionSettings = {
  depth: 0.3, // Grosor del arco
  bevelEnabled: false, // Desactivar el biselado
};

const arcoGeometry = new THREE.ExtrudeGeometry(arcoShape, extrusionSettings);

// Crear el material del arco
const concreteTexture = new THREE.TextureLoader().load('./pared.jpg');
//const arcoMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // Puedes ajustar el color
const arcoMaterial = new THREE.MeshBasicMaterial({
  map: concreteTexture,
  color: "#dad2c5", // f4f4f4 dad2c5 #f4eadc
  roughness: 0.5, // Adjust roughness
  metalness: 0, // Adjust metalness
});

// Crear la malla del arco
const arcoMesh = new THREE.Mesh(arcoGeometry, arcoMaterial);




// Crear un grupo para las figuras
const grupoArco = new THREE.Group();
// Agregar el semicírculo al grupo
grupoArco.add(arcoMesh);

// Agregar la línea al mismo grupo que el semicírculo
//grupoArco.add(lineaSemicircular);

// Añadir el arco a la escena
return(arcoMesh);


}

export function crearBordeSemi(){

  // Parámetros de la línea semicircular
const radioLinea = 0.7;
const segmentos = 32; // Ajusta según sea necesario
const grosorLinea = 100; // Ajusta el grosor según sea necesario

// Crear una geometría de buffer para la línea semicircular
const geometriaLinea = new THREE.BufferGeometry();
const materialLinea = new THREE.LineBasicMaterial({ color: 0x000000 }); // Puedes ajustar el color

// Añadir vértices a la geometría
const verticesLinea = [];
for (let i = 0; i <= segmentos; i++) {
  const angulo = (i / segmentos) * Math.PI;
  const x = radioLinea * Math.cos(angulo);
  const y = radioLinea * Math.sin(angulo);
  verticesLinea.push(x, y, 0); // Agregar coordenadas a la lista de vértices
}
geometriaLinea.setAttribute('position', new THREE.Float32BufferAttribute(verticesLinea, 3));

// Crear la línea semicircular
const lineaSemicircular = new THREE.Line(geometriaLinea, materialLinea);

// Escalar la línea en Z para ajustar el grosor
lineaSemicircular.scale.set(1, 1, grosorLinea);
// Posicionar la línea en la escena
lineaSemicircular.position.set(0, 0, 0); // Ajusta las coordenadas según sea necesario

return lineaSemicircular;

}

