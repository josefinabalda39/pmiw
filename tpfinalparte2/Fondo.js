class Fondo {
  constructor(piso, camino, casa) {
    this.imgPiso = piso;
    this.imgCamino = camino;
    this.imgCasa = casa;
  }

  actualizar() {
   
  }

  dibujar() {
    image(this.imgPiso, 0, 0, 800, 400);
    image(this.imgCamino, 0, 0, 800, 400);

    imageMode(CENTER);
    if (this.imgCasa) {
      image(this.imgCasa, 400, 115, 260, 200); 
    }
    imageMode(CORNER);
  }
}
