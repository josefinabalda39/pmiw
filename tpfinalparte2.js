let objJuego;

let imgPiso, imgCamino, imgCasa; 
let imgInicio, imgCasaInterior, imgPantallaPerdiste, imgCreditos; 
let imgChica, imgChico;
let enemigos = [];
let fuenteMonster, fuenteThisNight;
let sonidoInicio, sonidoJuego; // Variables globales para los sonidos

function preload() {
  imgPiso = loadImage('Data/Piso.png');
  imgCamino = loadImage('Data/camino.png'); 
  imgCasa = loadImage('Data/casaabandonada.png');

  imgInicio = loadImage('Data/inicio.jpg');
  imgCasaInterior = loadImage('Data/casainterior.png');
  imgPantallaPerdiste = loadImage('Data/pantallaperdiste.jpg');
  imgCreditos = loadImage('Data/creditos.jpg');

  imgChica = loadImage('Data/chica1.png');
  imgChico = loadImage('Data/chico2.png');

  enemigos.push(loadImage('Data/enemigo.png'));

  fuenteMonster = loadFont('Data/Monster.ttf');
  fuenteThisNight = loadFont('Data/ThisNight.ttf');

  // Carga de sonidos en el preload
  sonidoInicio = loadSound('Data/alex-morgan-horror-suspense-tune-579472.mp3');
  sonidoJuego = loadSound('Data/spmusic-escape-150046.mp3');
}

function setup() {
  createCanvas(800, 400);
  
  // Pasamos los recursos y los sonidos por parámetro al constructor de Juego
  objJuego = new Juego(
    imgPiso, imgCamino, imgCasa, 
    imgInicio, imgCasaInterior, imgPantallaPerdiste, imgCreditos, 
    imgChica, imgChico, enemigos, 
    fuenteMonster, fuenteThisNight,
    sonidoInicio, sonidoJuego
  );
}

function draw() {
  if (objJuego) {
    objJuego.actualizar();
    objJuego.dibujar();
  }
}

function keyPressed() {
  if (objJuego) {
    objJuego.tecla(keyCode, key);
  }
}

function mousePressed() {
  if (objJuego) {
    objJuego.verificarClic(mouseX, mouseY);
  }
}
