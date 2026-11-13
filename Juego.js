class Juego {
  constructor(piso, camino, casa, inicio, interior, perdiste, creditos, chica, chico, listaEnemigos, fMonster, fThisNight, sInicio, sJuego) {
    
    this.imgInicio = inicio;
    this.imgCasaInterior = interior;
    this.imgPantallaPerdiste = perdiste;
    this.imgCreditos = creditos;
    this.fuenteMonster = fMonster;
    this.fuenteThisNight = fThisNight;
    
    this.listaEnemigos = listaEnemigos;

    this.sonidoInicio = sInicio;
    this.sonidoJuego = sJuego;

    this.fondo = new Fondo(piso, camino, casa);
    this.personaje = new Personaje(chica, chico);
    this.obstaculos = [];

    this.estado = "inicio";
    this.tiempo = 0;
    this.ultimoCarril = -1;
    this.yCreditos = 400; 

    if (this.sonidoInicio) {
      this.sonidoInicio.loop();
    }
  }

  iniciar() {
    this.personaje = new Personaje(this.personaje.imgChica, this.personaje.imgChico);
    this.obstaculos = [];
    this.tiempo = 0;
    this.ultimoCarril = -1;
    this.estado = "jugando";

    if (this.sonidoInicio && this.sonidoInicio.isPlaying()) {
      this.sonidoInicio.stop();
    }
    if (this.sonidoJuego && !this.sonidoJuego.isPlaying()) {
      this.sonidoJuego.loop();
    }
  }

  reiniciar() {
    this.iniciar();
  }

  actualizar() {
    if (this.estado === "gano") {
      this.personaje.posY = max(180, this.personaje.posY - 1.5);
      return;
    }

    // Bucle y velocidad de los créditos 
    if (this.estado === "creditos") {
      this.yCreditos -= 4; 
      
      // Cuando el texto sube y desaparece por arriba, vuelve a empezar abajo (bucle)
      if (this.yCreditos < -350) {
        this.yCreditos = 400; 
      }
      return;
    }

    if (this.estado !== "jugando") {
      return;
    }

    this.fondo.actualizar();
    this.tiempo++;

    this.personaje.actualizar();

    let factorDificultad = 1 + (this.tiempo / 900);
    let intervaloAparicion = max(35, 90 - Math.floor(this.tiempo / 120) * 10);

    if (this.tiempo % intervaloAparicion === 0) {
      let carrilElegido = floor(random(0, 3));

      if (carrilElegido === this.ultimoCarril) {
        carrilElegido = floor(random(0, 3));
      }

      this.ultimoCarril = carrilElegido;
    
      let nuevoObstaculo = new Obstaculos(factorDificultad, carrilElegido, this.listaEnemigos);

      for (let obstaculoExistente of this.obstaculos) {
        if (obstaculoExistente.progreso < 0.35 && obstaculoExistente.carril === nuevoObstaculo.carril) {
          nuevoObstaculo.carril = (nuevoObstaculo.carril + 1) % 3;
          this.ultimoCarril = nuevoObstaculo.carril;
          break;
        }
      }

      this.obstaculos.push(nuevoObstaculo);
    }
    
    for (let i = this.obstaculos.length - 1; i >= 0; i--) {
      let obstaculo = this.obstaculos[i];

      obstaculo.actualizar();

      if (obstaculo.colisiona(this.personaje)) {
        this.personaje.vida--;
        obstaculo.golpeado = true;
      }

      if (obstaculo.fueraDePantalla() || obstaculo.golpeado) {
        this.obstaculos.splice(i, 1);
      }
    }

    // SI PIERDE
    if (!this.personaje.estaVivo()) {
      this.estado = "perdio";
      if (this.sonidoJuego && this.sonidoJuego.isPlaying()) {
        this.sonidoJuego.stop();
      }
      if (this.sonidoInicio && !this.sonidoInicio.isPlaying()) {
        this.sonidoInicio.loop();
      }
    }

    // SI GANA
    if (this.tiempo >= 1800) {
      this.estado = "gano";
      this.personaje.carril = 1;
      if (this.sonidoJuego && this.sonidoJuego.isPlaying()) {
        this.sonidoJuego.stop();
      }
      if (this.sonidoInicio && !this.sonidoInicio.isPlaying()) {
        this.sonidoInicio.loop();
      }
    }
  }

  dibujar() {
    if (this.estado === "inicio") {
      if (this.imgInicio) {
        image(this.imgInicio, 0, 0, 800, 400);
      }
      this.dibujarInicio();
    } else if (this.estado === "jugando") {
      this.fondo.dibujar();
      for (let obstaculo of this.obstaculos) {
        obstaculo.dibujar();
      }

      this.personaje.dibujar();
      this.dibujarInformacion();
    } else if (this.estado === "gano") {
      if (this.imgCasaInterior) {
        image(this.imgCasaInterior, 0, 0, 800, 400);
      }
      this.dibujarFinal("¡LLEGARON AL REFUGIO!", "¡GANASTE!");
    } else if (this.estado === "perdio") {
      if (this.imgPantallaPerdiste) {
        image(this.imgPantallaPerdiste, 0, 0, 800, 400);
      }
      this.dibujarFinal("Los monstruos los alcanzaron...", "¡PERDISTE!");
    } else if (this.estado === "creditos") {
      this.dibujarCreditos();
    }
  }

  dibujarInicio() {
    push();
    fill(0, 0, 0, 175);
    rect(0, 0, 800, 400);

    textAlign(CENTER);
    fill(255);

    textFont(this.fuenteMonster);
    textSize(34);
    text("EL REFUGIO", 400, 85);

    textFont(this.fuenteThisNight);
    textSize(17);
    fill(255);
    text("Emma y Nico deben escapar del monstruo.", 400, 135);
    text("Usa las flechas IZQUIERDA y DERECHA", 400, 190);
    text("para cambiar de carril y esquivar obstaculos.", 400, 220);
    text("Tenes 4 vidas para llegar al refugio.", 400, 250);

    push();
    noStroke();
    fill(0, 150);
    rectMode(CENTER);
    rect(400, 310, 420, 40, 4);
    pop();

    let alphaParpadeo = map(sin(frameCount * 0.1), -1, 1, 80, 255);

    textFont(this.fuenteMonster);
    textSize(23);
    fill(139, 0, 0, alphaParpadeo);
    text("PRESIONA ENTER PARA COMENZAR", 400, 318);

    pop();
  }

  dibujarInformacion() {
    push();
    textFont(this.fuenteThisNight);
    textSize(18);

    fill(0, 180);          
    stroke(120, 0, 0);     
    strokeWeight(2);       
    rect(15, 10, 110, 35, 3); 

    noStroke();
    fill(255);
    textAlign(LEFT, CENTER);
    text("Vidas: " + this.personaje.vida, 25, 28);

    fill(0, 180);
    stroke(120, 0, 0);
    strokeWeight(2);
    rect(635, 10, 145, 35, 3);

    noStroke();
    fill(255);
    let segundos = Math.floor(this.tiempo / 60);
    text("Tiempo: " + segundos + " s", 645, 28);

    pop();
  }

  dibujarFinal(titulo, resultado) {
    push();
    fill(0, 0, 0, 190);
    rect(0, 0, 800, 400);

    textAlign(CENTER);
    fill(255);

    textFont(this.fuenteMonster);
    textSize(32);
    text(titulo, 400, 95);

    push();
    noStroke();
    fill(0, 150);
    rectMode(CENTER);
    rect(400, 150, 300, 45, 4);
    pop();

    textSize(38);
    if (resultado === "¡GANASTE!") {
      fill(255, 255, 255);
    } else {
      fill(139, 0, 0);
    }
    text(resultado, 400, 162);

    let alphaParpadeoR = map(sin(frameCount * 0.1), -1, 1, 80, 255);
    textFont(this.fuenteThisNight);
    textSize(18);
    fill(255, 255, 255, alphaParpadeoR);
    text("Presiona R para volver a jugar", 400, 225);

    fill(0, 200);          
    stroke(139, 0, 0);     
    strokeWeight(2);
    rectMode(CENTER);
    rect(400, 300, 150, 32, 4);

    noStroke();
    fill(255);
    textFont(this.fuenteMonster);
    textSize(15);
    text("CREDITOS", 400, 306);

    pop();
  }

  dibujarCreditos() {
    push();
    if (this.imgCreditos) {
      image(this.imgCreditos, 0, 0, 800, 400);
    } else {
      background(15);
    }

    fill(0, 0, 0, 200);
    rect(0, 0, 800, 400);

    textAlign(CENTER);

    textFont(this.fuenteMonster);
    textSize(32);
    fill(139, 0, 0);
    text("CREDITOS", 400, this.yCreditos);

    textFont(this.fuenteThisNight);
    textSize(20);
    fill(255);
    text("Videojuego web realizado por:", 400, this.yCreditos + 70);

    textFont(this.fuenteMonster);
    textSize(24);
    fill(180, 20, 20);
    text("Josefina Balda", 400, this.yCreditos + 125);
    text("y", 400, this.yCreditos + 160);
    text("Juana Burgos", 400, this.yCreditos + 195);

    let alphaVolver = map(sin(frameCount * 0.1), -1, 1, 100, 255);
    textFont(this.fuenteThisNight);
    textSize(18);
    fill(255, 255, 255, alphaVolver);
    text("Presiona R para volver al inicio", 400, this.yCreditos + 270);

    pop();
  }

  verificarClic(mx, my) {
    if ((this.estado === "gano" || this.estado === "perdio") &&
        mx > 325 && mx < 475 && my > 284 && my < 316) {
      this.yCreditos = 400; 
      this.estado = "creditos";
    }
  }

  tecla(codigo, tecla) {
    if (this.sonidoInicio && !this.sonidoInicio.isPlaying() && this.estado === "inicio") {
      this.sonidoInicio.loop();
    }

    if (this.estado === "inicio" && codigo === ENTER) {
      this.iniciar();
      return;
    }

    if (this.estado === "jugando") {
      if (codigo === LEFT_ARROW) {
        this.personaje.cambiarCarril(-1);
      }

      if (codigo === RIGHT_ARROW) {
        this.personaje.cambiarCarril(1);
      }
    }

    if ((this.estado === "gano" || this.estado === "perdio" || this.estado === "creditos") &&
        (tecla === "r" || tecla === "R")) {
      this.estado = "inicio";
      this.yCreditos = 400; 

      if (this.sonidoJuego && this.sonidoJuego.isPlaying()) {
        this.sonidoJuego.stop();
      }
      if (this.sonidoInicio && !this.sonidoInicio.isPlaying()) {
        this.sonidoInicio.loop();
      }
    }
  }
}
