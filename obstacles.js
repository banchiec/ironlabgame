class Obstacle {
  constructor(ctx, gameWidth, playerPosY0, playerHeight, width = 75, height = 150) {

    this.ctx = ctx;
    this.numberRandom = 15 + Math.floor(Math.random() * 10)
    this.width = width
    // this.width = this.numberRandom;
    // this.height = this.width * 4;
    this.height = height

    this.playerCollision = false
    this.posX = gameWidth
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