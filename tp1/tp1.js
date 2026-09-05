//josefina balda
//comision 2
//legajo 125517/7

let estadoActual = "PANTALLA_INICIO"; 
let imgFondo;                 
let framesCaminata = [];  
let framesSalto = [];     
let velocidadAnimacion = 120; 
let xPos = -50; 
let yPos = 365; 
let inicioEstado = 0;
let xFondo = 0;
let velocidadFondo = 4;
let tipografia;

function preload() {
  imgFondo = loadImage("fondoooo.jpg.jpg");
  tipografia = loadFont("tipografia.ttf");

  //sprites personaje caminando
  for (let i = 0; i < 5; i++) {
    framesCaminata[i] = loadImage("sprite_" + i + ".png.png");
  }

  //sprites personaje saltando
  framesSalto[0] = loadImage("sprite_7.png.png");
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
  inicioEstado = millis(); // Inicia el temporizador general al empezar
} 

function draw() {
  let tiempoRelativo = millis() - inicioEstado;

  
  if (estadoActual === "PANTALLA_INICIO") {
    image(imgFondo, width / 2, height / 2, width, height);

    textAlign(CENTER, CENTER);
    textFont(tipografia);
    textSize(64); 
    fill(255);
    stroke(0);
    strokeWeight(4);
     
    text("START", width / 2, height / 2);

    if (tiempoRelativo > 3000) {  // Cambia al siguiente estado después de 3 segundos
      estadoActual = "CAMINANDO";
      xPos = -50; 
      yPos = 365; 
      inicioEstado = millis(); 
    }

  //animacion caminando
  } else if (estadoActual === "CAMINANDO") {
    actualizarFondo();

    let frameActual = obtenerFrameActual(5, velocidadAnimacion, tiempoRelativo);
     
    dibujarPersonaje(framesCaminata, frameActual, xPos, yPos, 260, 200);
     
    xPos += 2;  // Mueve al personaje hacia la derecha
     
    if (xPos >= width / 2) {   // Si llega a la mitad de la pantalla, pasa al estado de salto
      estadoActual = "SALTANDO";
      xPos = width / 2; 
      inicioEstado = millis(); 
    }

  //animacion saltando
  } else if (estadoActual === "SALTANDO") {
    actualizarFondo();

    let alturaSalto = 150;  
    yPos = 365 - sin((tiempoRelativo / 1200) * 3.1416) * alturaSalto; // Simula una curva de salto suave

    let anchoDelSalto = 260;
    let altoDelSalto = 330; 

    image(framesSalto[0], xPos, yPos, anchoDelSalto, altoDelSalto);

    if (tiempoRelativo > 1200) {   
      estadoActual = "CAMINANDO_FINAL";
      yPos = 365;
      inicioEstado = millis();
    }

  //al final vuelve a caminar
  } else if (estadoActual === "CAMINANDO_FINAL") {
    actualizarFondo();

    let frameActual = obtenerFrameActual(5, velocidadAnimacion, tiempoRelativo);
     
    dibujarPersonaje(framesCaminata, frameActual, xPos, yPos, 260, 200);
     
    xPos += 2;  

    if (xPos > width + 50 || tiempoRelativo > 4000) { //cuando pasa el tiempo limite se reinicia todo
      estadoActual = "PANTALLA_INICIO";
      xPos = -50;                     
      yPos = 365;
      inicioEstado = millis(); 
    }
  }
}

// Función auxiliar para mover el fondo en parallax
function actualizarFondo() {
  xFondo -= velocidadFondo; 
  if (xFondo <= -width) {
    xFondo = 0; 
  }
  image(imgFondo, xFondo + width / 2, height / 2, width, height);
  image(imgFondo, xFondo + width + width / 2, height / 2, width, height);
}

function obtenerFrameActual(totalFrames, velocidad, tiempo) {   // Calcula qué imagen del arreglo se debe mostrar según el tiempo transcurrido
  let indice = int(tiempo / velocidad) % totalFrames;
  return indice; 
}
// Dibuja al personaje en pantalla tomando las medidas y la imagen correspondiente
function dibujarPersonaje(arrayFrames, indiceFrame, x, y, ancho, alto) {
  let imgActual = arrayFrames[indiceFrame];
  image(imgActual, x, y, ancho, alto);
}
