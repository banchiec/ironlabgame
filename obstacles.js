class Obstacle {

  constructor(ctx, gameWidth, playerPosY0, playerHeight, pathImg, width = 75, height = 150) {

    this.ctx = ctx;
    this.width = width
    this.height = height
    this.posX = gameWidth
    this.posY = playerPosY0 + playerHeight - this.height;
    this.posY0 = playerPosY0

    // this.width = this.numberRandom;
    // this.height = this.width * 4;
    this.img = new Image()
    this.img.src = pathImg

    this.playerCollision = false


    this.liveObstacles = 3

    this.velX = 10;
  }

  draw() {
    console.log(this)
    this.ctx.drawImage(
      this.img,
      //   // number frames
      //   // this.image.framesIndex * Math.floor(900 / ),//posicion en x de cada frame

      //   this.posX,

      //   this.posY0,
      this.posX,//posicion en y de cada frame
      this.posY,  // Math.floor(900 / this.image.frame),//ancho que mide cada frame
      //   // 110,//alto de cada frame
      //   // this.posx,//posicion x absoluta en el canvas
      //   // this.posy,//posicion y absoluta en el canvas
      //   // this.width,
      this.width,
      this.height
    )

    // this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    this.move()
  }

  move() {
    this.posX -= this.velX;
  }
}