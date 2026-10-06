let pantalla = 1;

// Variable para la animación de créditos
let yCreditos = 450;

// Variable para la transparencia del texto en la pantalla de inicio
let alphaTexto = 0;

// Arreglos para las imágenes y los textos de cada pantalla
let imagenes = [];
let textosPantalla = [];

// Variables para el monstruo animado en los créditos
let monsterFrames = [];
let monsterX = -150; // Posición inicial fuera de la pantalla a la izquierda
let contadorMonstruo = 0;

// Música y Fuentes
let musica;
let sonidoInterferencia;
let fuenteTitulo;
let fuenteTexto;

function preload() {
  fuenteTitulo = loadFont('Data/Damned.ttf');
  fuenteTexto = loadFont('Data/SpecialElite-Regular.ttf');
  musica = loadSound('Data/musica.mp3');
  sonidoInterferencia = loadSound('Data/interferencia.mp3');

  // Cargamos las imágenes en el arreglo
  imagenes[1] = loadImage('Data/inicio.jpg');
  imagenes[2] = loadImage('Data/casa.png');
  imagenes[3] = loadImage('Data/cocina.png');
  imagenes[4] = loadImage('Data/sotano.png');
  imagenes[5] = loadImage('Data/saliendo.png');
  imagenes[6] = loadImage('Data/bosque.png');
  imagenes[7] = loadImage('Data/ruta.png');
  imagenes[8] = loadImage('Data/estacion.png');
  imagenes[9] = loadImage('Data/frecuencia.png');
  imagenes[10] = loadImage('Data/senal.png');
  imagenes[11] = loadImage('Data/refugio.png');
  imagenes[12] = loadImage('Data/activar.png');
  imagenes[13] = loadImage('Data/entrada.png');
  imagenes[14] = loadImage('Data/pantalla14.png');
  imagenes[15] = loadImage('Data/pantalla15.png');
  imagenes[16] = loadImage('Data/pantalla16.png');
  imagenes[17] = loadImage('Data/pantalla17.png');
  imagenes[18] = loadImage('Data/creditos.jpg');

  // Cargamos los fotogramas del monstruo para la animación
  monsterFrames[0] = loadImage('Data/monstersprite1.png');
  monsterFrames[1] = loadImage('Data/monstersprite2.png');
  monsterFrames[2] = loadImage('Data/monstersprite3.png');
  monsterFrames[3] = loadImage('Data/monstersprite4.png');

  // Definimos los textos para cada pantalla usando arreglos
  textosPantalla[1] = [
    "Una ciudad queda abandonada después de la aparición de unas criaturas extrañas.",
    "La protagonista Emma y su amigo Nicolás deben refugiarse."
  ];

  textosPantalla[2] = [
    "Emma y Nico necesitan permanecer dentro de la casa.",
    "Hay dos lugares que pueden revisar."
  ];

  textosPantalla[3] = [
    "Encuentran comida y una botella de agua.",
    "De repente escuchan un ruido proveniente del exterior."
  ];

  textosPantalla[4] = [
    "El sótano está oscuro y lleno de objetos abandonados.",
    "Encuentran algunas provisiones y una vieja radio."
  ];

  textosPantalla[5] = [
    "Emma y Nico se preparan para salir de la casa.",
    "Antes de salir encuentran un mapa que señala dos caminos.",
    "¿Por dónde deben avanzar?"
  ];

  textosPantalla[6] = [
    "Toman el camino más largo para ir con más tranquilidad.",
    "Encuentran una mochila abandonada."
  ];

  textosPantalla[7] = [
    "Toman el camino más corto, pero escuchan ruidos.",
    "No saben qué puede haber adelante."
  ];

  textosPantalla[8] = [
    "Llegan a una antigua estación abandonada.",
    "Encuentran una radio, entre otros objetos.",
    "La radio parece tener un mensaje."
  ];

  textosPantalla[9] = [
    "Lara les cuenta que descubrió que las criaturas reaccionan",
    "a ciertas frecuencias de radio.",
    "Decide ayudarlos a llegar al refugio."
  ];

  textosPantalla[10] = [
    "Mientras avanzan, un objeto cae cerca de ellos.",
    "Las criaturas se acercan rápidamente."
  ];

  textosPantalla[11] = [
    "Llegan finalmente al refugio abandonado.",
    "Parece antiguo y está bastante deteriorado.",
    "Pero encuentran una herramienta que podría ayudarlos."
  ];

  textosPantalla[12] = [
    "La radio comienza a emitir un mensaje.",
    "Hay una posibilidad de escapar del refugio.",
    "Pero deben decidir qué hacer."
  ];

  textosPantalla[13] = [
    "Llegan la entrada del refugio.",
    "La señal de radio continúa guiándolos.",
    "Ahora deben tomar una última decisión."
  ];

  textosPantalla[14] = [
    "Cada alternativa puede cambiar el destino de Emma y Nico.",
    "Las criaturas están cada vez más cerca."
  ];

  textosPantalla[15] = [
    "Emma y Nico logran llegar al refugio.",
    "Finalmente encuentran un lugar seguro."
  ];

  textosPantalla[16] = [
    "Logran llegar a la entrada, pero las criaturas los alcanzan.",
    "La señal de radio deja de funcionar."
  ];

  textosPantalla[17] = [
    "La distracción funciona y las criaturas se alejan.",
    "Emma y Nico consiguen escapar por otra salida.",
    "Pero no saben qué encontrarán afuera."
  ];
}

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(15);

  if (pantalla == 1) {
    mostrarPantallaJuego(1, "EL REFUGIO");
    boton(325, 330, 150, 55, "COMENZAR");
  } 
  else if (pantalla == 2) {
    mostrarPantallaJuego(2, "LA CASA ABANDONADA");
    boton(180, 310, 180, 55, "IR A LA COCINA");
    boton(440, 310, 180, 55, "IR AL SÓTANO");
  } 
  else if (pantalla == 3) {
    mostrarPantallaJuego(3, "LA COCINA");
    boton(150, 315, 220, 55, "MIRAR POR LA VENTANA");
    boton(430, 315, 220, 55, "IGNORAR EL RUIDO");
  } 
  else if (pantalla == 4) {
    mostrarPantallaJuego(4, "EL SOTANO");
    boton(120, 315, 230, 55, "QUEDARSE Y REVISAR");
    boton(385, 315, 280, 55, "SALIR POR LA PUERTA TRASERA");
  } 
  else if (pantalla == 5) {
    mostrarPantallaJuego(5, "PREPARÁNDOSE PARA SALIR");
    boton(180, 320, 180, 55, "BOSQUE");
    boton(440, 320, 180, 55, "RUTA");
  } 
  else if (pantalla == 6) {
    mostrarPantallaJuego(6, "EL BOSQUE");
    boton(150, 320, 220, 55, "REVISAR");
    boton(430, 320, 220, 55, "SEGUIR CAMINANDO");
  } 
  else if (pantalla == 7) {
    mostrarPantallaJuego(7, "LA RUTA");
    boton(150, 320, 220, 55, "REVISAR");
    boton(430, 320, 220, 55, "SEGUIR CAMINANDO");
  } 
  else if (pantalla == 8) {
    mostrarPantallaJuego(8, "LA ESTACION ABANDONADA");
    boton(300, 325, 200, 55, "CONFIAR EN LARA");
  } 
  else if (pantalla == 9) {
    mostrarPantallaJuego(9, "LA FRECUENCIA");
    boton(280, 325, 240, 55, "SEGUIR LA SEÑAL");
  } 
  else if (pantalla == 10) {
    mostrarPantallaJuego(10, "EL ATAQUE");
    boton(100, 320, 170, 55, "ESCONDERSE");
    boton(315, 320, 170, 55, "CREAR DISTRACCIÓN");
    boton(530, 320, 170, 55, "CORRER");
  } 
  else if (pantalla == 11) {
    mostrarPantallaJuego(11, "EL REFUGIO");
    boton(280, 325, 240, 55, "ACTIVAR LA RADIO");
  } 
  else if (pantalla == 12) {
    mostrarPantallaJuego(12, "LA TRANSMISION");
    boton(120, 320, 250, 55, "SALIR AHORA");
    boton(430, 320, 250, 55, "ESPERAR HASTA MAÑANA");
  } 
  else if (pantalla == 13) {
    mostrarPantallaJuego(13, "ULTIMO TRAMO");
    boton(70, 320, 190, 55, "USAR LA FRECUENCIA");
    boton(305, 320, 190, 55, "ESPERAR");
    boton(540, 320, 190, 55, "DEJAR LA RADIO");
  } 
  else if (pantalla == 14) {
    mostrarPantallaJuego(14, "LA ULTIMA PUERTA");
    boton(70, 320, 190, 55, "SEGUIR LA FRECUENCIA");
    boton(305, 320, 190, 55, "ABRIR LA PUERTA");
    boton(540, 320, 190, 55, "DEJAR LA SEÑAL");
  } 
  else if (pantalla == 15) {
    mostrarPantallaJuego(15, "FINAL 1");
    boton(325, 330, 150, 55, "CREDITOS");
  } 
  else if (pantalla == 16) {
    mostrarPantallaJuego(16, "FINAL 2");
    boton(325, 330, 150, 55, "CREDITOS");
  } 
  else if (pantalla == 17) {
    mostrarPantallaJuego(17, "FINAL 3");
    boton(325, 330, 150, 55, "CREDITOS");
  } 
  else if (pantalla == 18) {
    pantalla18();
  }
}

// Funcion general con parametros para cada pantalla
function mostrarPantallaJuego(numImagen, textoTitulo) {
  image(imagenes[numImagen], 0, 0, 800, 450);
  titulo(textoTitulo);

  let textosDeEstaPantalla = textosPantalla[numImagen];
  let posYInicial = 185;
  
  // Si estamos en la pantalla 1 el texto aparece de a poco 
  if (numImagen == 1) {
    if (alphaTexto < 255) {
      alphaTexto += 7; 
    }
    textoCentroConAlfa(textosDeEstaPantalla[0], posYInicial, alphaTexto);
    textoCentroConAlfa(textosDeEstaPantalla[1], posYInicial + 35, alphaTexto);
  } else {
    // Para el resto de las pantallas, mostramos las dos primeras líneas
    textoCentro(textosDeEstaPantalla[0], posYInicial);
    textoCentro(textosDeEstaPantalla[1], posYInicial + 35);
    
    // Si la pantalla tiene una tercera línea, la mostramos también 
    if (numImagen == 5 || numImagen == 8 || numImagen == 9 || numImagen == 11 || numImagen == 12 || numImagen == 13 || numImagen == 17) {
      textoCentro(textosDeEstaPantalla[2], posYInicial + 70);
    }
  }
}

// Funciones generales de diseño
function titulo(textoTitulo) {
  fill(255);
  textFont(fuenteTitulo);
  textAlign(CENTER);
  textSize(38);
  text(textoTitulo, 400, 90);
}

function textoCentro(texto, posicionY) {
  textFont(fuenteTexto);
  textAlign(CENTER);
  textSize(18);

  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = "rgba(0, 0, 0, 180)";
  fill(245);
  text(texto, 400, posicionY);
  drawingContext.shadowBlur = 0;
}

//transparencia para el texto en la pantalla 1
function textoCentroConAlfa(texto, posicionY, alfa) {
  textFont(fuenteTexto);
  textAlign(CENTER);
  textSize(18);

  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = "rgba(0, 0, 0, 180)";
  fill(245, alfa);
  text(texto, 400, posicionY);
  drawingContext.shadowBlur = 0;
}

function boton(x, y, ancho, alto, textoBoton) {
  let sobreElBoton = mouseDentro(x, y, ancho, alto);
  
  let titileo = map(sin(frameCount * 0.35), -1, 1, 80, 255);

  if (sobreElBoton) {
    fill(90, 90, 95);
    stroke(255);
    strokeWeight(3);
    rect(x - 2, y - 2, ancho + 4, alto + 4, 12);
  } else {
    fill(60, 60, 65);
    stroke(255, titileo);
    strokeWeight(3);
    rect(x, y, ancho, alto, 10);
  }

  strokeWeight(1);
  fill(255);
  noStroke();
  textFont(fuenteTexto);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(textoBoton, x + ancho / 2, y + alto / 2);
}

function pantalla18() {
  image(imagenes[18], 0, 0, 800, 450);

  // Interferencia de radio
  interferencia();

  // mounstro mas arriba
  contadorMonstruo += 0.125;
  let indexFrame = int(contadorMonstruo) % 4;
  
  image(monsterFrames[indexFrame], monsterX, 245, 130, 150);
  
  // Movimiento horizontal
  monsterX += 1.5;
  if (monsterX > 900) {
    monsterX = -150;
  }
  

  textoCentro("EL REFUGIO", yCreditos);
  textoCentro("Aventura gráfica interactiva", yCreditos + 40);
  textoCentro("Juana Burgos y Josefina Balda", yCreditos + 90);
  textoCentro("Basado en la obra Un lugar en silencio", yCreditos + 130);

  yCreditos -= 1.2;

  if (yCreditos < -150) {
    yCreditos = 450;
  }

  boton(300, 350, 200, 50, "VOLVER AL INICIO");
}

// Animación de interferencia de radio
function interferencia() {
  // La interferencia aparece cada cierto tiempo
  if (frameCount % 180 < 12) {

    // Reproducimos el sonido una sola vez
    if (frameCount % 180 == 0) {
      sonidoInterferencia.play();
    }

    // Pequeño cambio de brillo
    fill(255, 35);
    noStroke();
    rect(0, 0, 800, 450);

    // Líneas de interferencia
    stroke(255, 90);
    strokeWeight(1);

    for (let y = 0; y < 450; y += 8) {
      line(0, y, 800, y);
    }

    // Algunas líneas más fuertes
    stroke(255, 140);

    for (let i = 0; i < 5; i++) {
      let y = random(0, 450);
      line(0, y, 800, y);
    }
  }
}

// Interacciones con el mouse
function mousePressed() {
  if (pantalla == 1) {
    if (mouseDentro(325, 330, 150, 55)) {
      pantalla = 2;
      if (!musica.isPlaying()) {
        musica.loop();
      }
    }
  }
  else if (pantalla == 2) {
    if (mouseDentro(180, 310, 180, 55)) {
      pantalla = 3;
    } else if (mouseDentro(440, 310, 180, 55)) {
      pantalla = 4;
    }
  }
  else if (pantalla == 3) {
    if (mouseDentro(150, 315, 220, 55)) {
      pantalla = 5;
    } else if (mouseDentro(430, 315, 220, 55)) {
      pantalla = 5;
    }
  }
  else if (pantalla == 4) {
    if (mouseDentro(120, 315, 230, 55)) {
      pantalla = 5;
    } else if (mouseDentro(385, 315, 280, 55)) {
      pantalla = 5;
    }
  }
  else if (pantalla == 5) {
    if (mouseDentro(180, 320, 180, 55)) {
      pantalla = 6;
    } else if (mouseDentro(440, 320, 180, 55)) {
      pantalla = 7;
    }
  }
  else if (pantalla == 6 || pantalla == 7) {
    if (mouseDentro(150, 320, 220, 55)) {
      pantalla = 8;
    } else if (mouseDentro(430, 320, 220, 55)) {
      pantalla = 8;
    }
  }
  else if (pantalla == 8) {
    if (mouseDentro(300, 325, 200, 55)) {
      pantalla = 9;
    }
  }
  else if (pantalla == 9) {
    if (mouseDentro(280, 325, 240, 55)) {
      pantalla = 10;
    }
  }
  else if (pantalla == 10) {
    if (mouseDentro(100, 320, 170, 55)) {
      pantalla = 11;
    } else if (mouseDentro(315, 320, 170, 55)) {
      pantalla = 11;
    } else if (mouseDentro(530, 320, 170, 55)) {
      pantalla = 11;
    }
  }
  else if (pantalla == 11) {
    if (mouseDentro(280, 325, 240, 55)) {
      pantalla = 12;
    }
  }
  else if (pantalla == 12) {
    if (mouseDentro(120, 320, 250, 55)) {
      pantalla = 13;
    } else if (mouseDentro(430, 320, 250, 55)) {
      pantalla = 13;
    }
  }
  else if (pantalla == 13) {
    if (mouseDentro(70, 320, 190, 55)) {
      pantalla = 14;
    } else if (mouseDentro(305, 320, 190, 55)) {
      pantalla = 14;
    } else if (mouseDentro(540, 320, 190, 55)) {
      pantalla = 14;
    }
  }
  else if (pantalla == 14) {
    if (mouseDentro(70, 320, 190, 55)) {
      pantalla = 15;
    } else if (mouseDentro(305, 320, 190, 55)) {
      pantalla = 16;
    } else if (mouseDentro(540, 320, 190, 55)) {
      pantalla = 17;
    }
  }
  else if (pantalla == 15 || pantalla == 16 || pantalla == 17) {
    if (mouseDentro(325, 330, 150, 55)) {
      pantalla = 18;
      yCreditos = 450;
      monsterX = -150; // Reinicia la posición del monstruo al entrar a créditos
    }
  }
  else if (pantalla == 18) {
    if (mouseDentro(300, 350, 200, 50)) {
      pantalla = 1;
      alphaTexto = 0; // Reiniciamos la transparencia al volver al inicio
    }
  }
}

function mouseDentro(x, y, ancho, alto) {
  if (
    mouseX >= x &&
    mouseX <= x + ancho &&
    mouseY >= y &&
    mouseY <= y + alto
  ) {
    return true;
  } else {
    return false;
  }
}
