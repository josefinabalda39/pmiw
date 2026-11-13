class Obstaculos {
  constructor(multiplicadorVelocidad = 1, carrilAsignado = 0, listaEnemigos = []) {
    this.carril = carrilAsignado;
    this.listaEnemigos = listaEnemigos;

    this.progreso = 0;
    this.velocidad = random(0.008, 0.013) * multiplicadorVelocidad;
    this.golpeado = false;
    
    this.tipoEnemigo = floor(random(this.listaEnemigos.length));
  }

  actualizar() {
    this.progreso += this.velocidad;
  }

  dibujar() {
    let posiciones = [200, 400, 600];

    let xBase = lerp(400, posiciones[this.carril], this.progreso);
    let y = lerp(145, 325, this.progreso);

    let desplazamientoDerecha = map(this.progreso, 0, 1, 0, 40); 
    let x = xBase + desplazamientoDerecha;

    let escala = map(this.progreso, 0, 1, 0.5, 1.8);

    push();
    translate(x, y);
    scale(escala);

    imageMode(CENTER);
    if (this.listaEnemigos && this.listaEnemigos.length > 0) {
      image(this.listaEnemigos[this.tipoEnemigo], 0, 0, 140, 140);
    }
    imageMode(CORNER);

    pop();
  }

  colisiona(personaje) {
    if (
      !this.golpeado &&
      this.progreso >= 0.85 &&
      this.progreso <= 1.05 &&
      this.carril === personaje.carril
    ) {
      return true;
    }

    return false;
  }

  fueraDePantalla() {
    return this.progreso > 1.15;
  }
}
