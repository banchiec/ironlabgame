class Obstacle {
  constructor(ctx, gameWidth, playerPosY0, playerHeight) {

    this.ctx = ctx;
    this.numberRandom = 20 + Math.floor(Math.random() * (5 - 1) + 5)
    this.width = this.numberRandom;
    this.height = this.width * 2;

    this.posX = gameWidth;
    this.posY = playerPosY0 + playerHeight - this.height;

    this.velX = 10;

  }

  draw() {

    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    this.move()
    // console.log(this.numberRandom)

  }

  move() {
    this.posX -= this.velX;
  }
}