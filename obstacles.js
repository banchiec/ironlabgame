class Obstacle {

  constructor(ctx, gameWidth, playerPosY0, playerHeight, width = 75, height = 150, pathImg) {

    this.ctx = ctx;
    this.numberRandom = 15 + Math.floor(Math.random() * 10)
    this.width = width
    // this.width = this.numberRandom;
    // this.height = this.width * 4;
    this.height = height
    this.img = new Image()
    this.img.src = pathImg

    this.playerCollision = false
    this.posX = gameWidth
    this.posY = playerPosY0 + playerHeight - this.height;


    this.liveObstacles = 3

    this.velX = 10;
  }

  draw() {

    // this.ctx.drawImage(
    //   this.image,
    //   // number frames
    //   // this.image.framesIndex * Math.floor(900 / this.image.frame),//posicion en x de cada frame
    //   0,
    //   0,//posicion en y de cada frame
    //   Math.floor(900 / this.image.frame),//ancho que mide cada frame
    //   110,//alto de cada frame
    //   this.posx,//posicion x absoluta en el canvas
    //   this.posy,//posicion y absoluta en el canvas
    //   150,
    //   // this.width,
    //   110
    // )

    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    this.move()
    // console.log(this.numberRandom)
  }

  move() {
    this.posX -= this.velX;
  }
}