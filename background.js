class Background {

  constructor(ctx, w, h, imgSource, velX = 7) {
    this.ctx = ctx;
    this.width = w;
    this.height = h;

    this.image = new Image();
    this.image.src = imgSource;

    this.posX = 0;
    this.posY = 0;

    this.velX = velX;
  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    this.ctx.drawImage(this.image, this.posX + this.width, this.posY, this.width, this.height);
    this.move()
  }

  move() {
    
    this.posX -= this.velX;
    this.posX %= -this.width;
  }
}
