import * as THREE from 'three';
/*
export function crearVentana() {

    //console.log("Hola");
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
// const rectanguloMaterial = new THREE.MeshBasicMaterial({
//   //map: texturaRec, // Asignar la textura al mapa de textura
//   color: "#dad2c5", // Color del rectángulo
//   side: THREE.DoubleSide, // Mostrar el material en ambas caras del rectángulo
//   transparent: true,
//   opacity: 1,
// });
const rectanguloMaterial = new THREE.MeshPhysicalMaterial({  
  color: "#dad2c5",
  side: THREE.DoubleSide,
  roughness: 0,  
  transmission: 1,  
  thickness: 0.5, // refraction
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
// const semicirculoMaterial = new THREE.MeshBasicMaterial({
//   //map: texturaSemi, // Color del semicírculo
//   color: "#dad2c5",
//   side: THREE.DoubleSide, // Mostrar el material en ambas caras del semicírculo
//   transparent: true,
//   opacity: 1,
// });

const semicirculoMaterial = new THREE.MeshPhysicalMaterial({  
  color: "#dad2c5",
  side: THREE.DoubleSide,
  roughness: 0,  
  transmission: 1,  
  thickness: 0.5, // refraction
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

  //console.log("Hola");
  // Crear la geometría del rectángulo
const ancho = 0.25;  //
const alto = 0.4;  //2
const rectanguloGeometry = new THREE.PlaneGeometry(ancho, alto);



const texturaRec = new THREE.TextureLoader().load('texture/ventana/5491.jpg');
const texturaSemi = new THREE.TextureLoader().load('texture/ventana/5491.jpg');


// Crear el material del rectángulo
const rectanguloMaterial = new THREE.MeshBasicMaterial({
map: texturaRec, // Asignar la textura al mapa de textura
//color: 0x00ffff, // Color del rectángulo
side: THREE.DoubleSide, // Mostrar el material en ambas caras del rectángulo
transparent: true,
opacity: 1,
});
rectanguloMaterial.map.wrapS = THREE.RepeatWrapping;
rectanguloMaterial.map.wrapT = THREE.RepeatWrapping;
rectanguloMaterial.map.repeat.set(1, 1); // Ajusta el número de repeticiones en dirección S y T





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
semicirculoMaterial.map.wrapS = THREE.RepeatWrapping;
semicirculoMaterial.map.wrapT = THREE.RepeatWrapping;
semicirculoMaterial.map.repeat.set(1, 1); // Ajusta el número de repeticiones en dirección S y T


// Crear la malla del semicírculo
const semicirculoMesh = new THREE.Mesh(semicirculoGeometry, semicirculoMaterial);

// Posicionar el semicírculo en la escena
semicirculoMesh.position.set(0, 0.20, 0); // Ajustar las coordenadas según sea necesario

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
//const arcoShape = new THREE.Shape();
const radioX = 0.48; // Radio en el eje X (horizontal)
const radioY = 0.48; // Radio en el eje Y (vertical)
const segmentos = 64;

// Definir el arco (en sentido horario)
// const radio = 0.48;
// const inicioAngulo = 0; // ángulo inicial
//const finAngulo = Math.PI; // ángulo final (semicírculo)
//arcoShape.absarc(0, 0, radio, inicioAngulo, finAngulo, false);

const arcoShape = new THREE.Shape();

  for (let i = 0; i <= segmentos; i++) {
    const angulo = (i / segmentos) * Math.PI;
    const x = radioX * Math.cos(angulo);
    const y = radioY * Math.sin(angulo);
    arcoShape.lineTo(x, y);
  }

  const extrusionSettings = {
    depth: 0.3,
    bevelEnabled: false,
  };
// Crear la geometría extruida del arco
// const extrusionSettings = {
//   depth: 0.3, // Grosor del arco
//   bevelEnabled: false, // Desactivar el biselado
// };

const arcoGeometry = new THREE.ExtrudeGeometry(arcoShape, extrusionSettings);

// Crear el material del arco
const concreteTexture = new THREE.TextureLoader().load('./pared.jpg');
//const arcoMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // Puedes ajustar el color
const arcoMaterial = new THREE.MeshStandardMaterial({
  map: concreteTexture,
  color: "#dad2c5", // f4f4f4 dad2c5 #f4eadc
  roughness: 0.5, // Adjust roughness
  metalness: 0, // Adjust metalness
  side: THREE.DoubleSide,
});
arcoMaterial.map.wrapS = THREE.RepeatWrapping;
arcoMaterial.map.wrapT = THREE.RepeatWrapping;
arcoMaterial.map.repeat.set(6, 6); // Ajusta el número de repeticiones en dirección S y T



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

  const radius =  0.48;  

  const tubeRadius =  0.03;  

  const radialSegments = 30;  

  const tubularSegments = 24;  

  const arc = 3.2;

  const bordeGeometry = new THREE.TorusGeometry(
    radius, tubeRadius,
    radialSegments, tubularSegments, arc );

    // Crear el material del arco
const concreteTexture = new THREE.TextureLoader().load('./pared.jpg');
//const arcoMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // Puedes ajustar el color
const BordeMaterial = new THREE.MeshStandardMaterial({
  map: concreteTexture,
  color: "#dad2c5", // f4f4f4 dad2c5 #f4eadc
  //color: 0x00ff00,
  roughness: 0.5, // Adjust roughness
  metalness: 0, // Adjust metalness
  side: THREE.DoubleSide,
});

// Crear la malla del arco
const bordeMesh = new THREE.Mesh(bordeGeometry, BordeMaterial);




  return(bordeMesh)

//   // Parámetros de la línea semicircular
// const radioLinea = 0.48;
// const segmentos = 32; // Ajusta según sea necesario
// const grosorLinea = 100; // Ajusta el grosor según sea necesario

// // Crear una geometría de buffer para la línea semicircular
// const geometriaLinea = new THREE.BufferGeometry();
// const materialLinea = new THREE.LineBasicMaterial({ color: 0x000000 }); // Puedes ajustar el color

// // Añadir vértices a la geometría
// const verticesLinea = [];
// for (let i = 0; i <= segmentos; i++) {
//   const angulo = (i / segmentos) * Math.PI;
//   const x = radioLinea * Math.cos(angulo);
//   const y = radioLinea * Math.sin(angulo);
//   verticesLinea.push(x, y, 0); // Agregar coordenadas a la lista de vértices
// }
// geometriaLinea.setAttribute('position', new THREE.Float32BufferAttribute(verticesLinea, 3));

// // Crear la línea semicircular
// const lineaSemicircular = new THREE.Line(geometriaLinea, materialLinea);

// // Escalar la línea en Z para ajustar el grosor
// lineaSemicircular.scale.set(1, 1, grosorLinea);
// // Posicionar la línea en la escena
// lineaSemicircular.position.set(0, 0, 0); // Ajusta las coordenadas según sea necesario

// return lineaSemicircular;

}

export function crearVentanaSemi() {
  

  // Crear un shape para el arco
//const arcoShape = new THREE.Shape();
const radioX = 0.25; // Radio en el eje X (horizontal)
const radioY = 0.25; // Radio en el eje Y (vertical)
const segmentos = 64;

// Definir el arco (en sentido horario)
// const radio = 0.48;
// const inicioAngulo = 0; // ángulo inicial
//const finAngulo = Math.PI; // ángulo final (semicírculo)
//arcoShape.absarc(0, 0, radio, inicioAngulo, finAngulo, false);

const arcoShape = new THREE.Shape();

  for (let i = 0; i <= segmentos; i++) {
    const angulo = (i / segmentos) * Math.PI;
    const x = radioX * Math.cos(angulo);
    const y = radioY * Math.sin(angulo);
    arcoShape.lineTo(x, y);
  }

  const extrusionSettings = {
    depth: 0.01,
    bevelEnabled: false,
  };
// Crear la geometría extruida del arco
// const extrusionSettings = {
//   depth: 0.3, // Grosor del arco
//   bevelEnabled: false, // Desactivar el biselado
// };

const arcoGeometry = new THREE.ExtrudeGeometry(arcoShape, extrusionSettings);

// Crear el material del arco
const semiVentanaTexture = new THREE.TextureLoader().load('texture/ventana/5491.jpg');
//const arcoMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // Puedes ajustar el color
const arcoMaterial = new THREE.MeshBasicMaterial({
  map: semiVentanaTexture, // Asignar la textura al mapa de textura
  //color: 0x00ffff, // Color del rectángulo
  side: THREE.DoubleSide, // Mostrar el material en ambas caras del rectángulo
  transparent: true,
  opacity: 1,
});
arcoMaterial.map.wrapS = THREE.RepeatWrapping;
arcoMaterial.map.wrapT = THREE.RepeatWrapping;
arcoMaterial.map.repeat.set(1, 1); // Ajusta el número de repeticiones en dirección S y T


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

export function crearVentanaTransparente(){
  // Crear la geometría de la ventana (puedes usar un Rectángulo o un Plano según tus necesidades)
const ancho = 2;
const alto = 2;
const geometriaVentana = new THREE.PlaneGeometry(ancho, alto);

// Configurar el material de la ventana con transparencia
const materialVentana = new THREE.MeshStandardMaterial({
  color: 0xffffff,  // Color de la ventana
  transparent: true, // Activar transparencia
  opacity: 0.5,      // Ajustar opacidad (0 completamente transparente, 1 completamente opaco)
});

// Crear el objeto Mesh de la ventana
const ventana = new THREE.Mesh(geometriaVentana, materialVentana);

// Posicionar la ventana en el espacio
ventana.position.set(0, 1, 0); // Ajusta según tus necesidades

// Añadir la ventana a la escena
return(ventana);
}
*/