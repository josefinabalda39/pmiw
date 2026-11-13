class Personaje {
  constructor(chica, chico) {
    this.imgChica = chica;
    this.imgChico = chico;
    
    this.carril = 1;
    this.posX = 400;
    this.posY = 285;
    this.vida = 4; 
  }

  cambiarCarril(direccion) {
    this.carril += direccion;
    this.carril = constrain(this.carril, 0, 2);
  }

  actualizar() {
    let posiciones = [270, 400, 530];

    // Movimiento suave entre carriles
    this.posX = lerp(
      this.posX,
      posiciones[this.carril],
      0.2
    );
  }

  dibujar() {
    imageMode(CENTER);

    // Usamos frameCount dividido por un número.
    // Si el resultado es par, suben un poco; si es impar, bajan.
    let paso = Math.floor(frameCount / 15) % 2;
    let reboteY = 0;

    if (paso === 0) {
      reboteY = -4; // Sube 4 píxeles
    } else {
      reboteY = 0;  // Vuelve a su lugar
    }

    // Nico (Chico2.png)
    image(
      this.imgChico,
      this.posX - 90,
      this.posY + reboteY,
      180,
      270
    );

    // Emma (Chica1.png) - Le sumamos el paso al revés para que se alternen
    let pasoEmma = Math.floor((frameCount + 7) / 15) % 2;
    let reboteEmma = (pasoEmma === 0) ? -4 : 0;

    image(
      this.imgChica,
      this.posX + 90,
      this.posY + reboteEmma,
      180,
      270
    );

    imageMode(CORNER);
  }

  estaVivo() {
    return this.vida > 0;
  }
}
