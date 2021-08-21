class Player {

  constructor(ctx, posX, gameW, gameH, keys) {

    this.ctx = ctx;

    this.width = 80;
    this.height = 80;

    this.image = new Image();
    this.image.src = "./img/player.png";

    this.image.frames = 3;
    this.image.framesIndex = 0;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.posX = 300;
    this.posY = this.gameHeight - this.height - 20;
    this.posY0 = this.posY;

    this.jumpLength = 100
    this.doubleJump = true
    this.counterJump = 0

    this.velY = 100;
    this.gravity = 0.8;

    this.keys = keys;

    this.bullets = [];

    this.setListeners();
  }

  draw(framesCounter) {

    this.walk(framesCounter)

    this.move()

    this.bullets.forEach(bullet => bullet.draw())
    this.clearBullets()
  }

  walk(framesCounter) {

    this.ctx.drawImage(
      this.image,
      // number frames 
      this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
      0,
      Math.floor(this.image.width / this.image.frames),
      this.image.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    )

    this.animateSprite(framesCounter)
  }

  animateSprite(framesCounter) {
    if (framesCounter % 3 == 0) {
      this.image.framesIndex++;
    }
    if (this.image.framesIndex >= this.image.frames) {
      this.image.framesIndex = 0;
    }
  }

  move() {

    if (this.posY < this.posY0) {   // Está saltando!
      this.posY += this.velY;
      this.velY += this.gravity;
    } else {
      this.posY = this.posY0;
      this.velY = 1;
    }
  }

  setListeners() {

    document.addEventListener("keydown", e => {

      switch (e.key) {
        case 'w':
          this.counterJump++
          this.jump()
          break;
        case 's':
          this.shoot();
          break;
      }
    });
  }

  // JUMPFUNCTION

  jump() {

    if (this.posY >= this.posY0) {
      this.posY -= 100;
      this.doubleJump = true
      this.velY -= 8;
      this.gravity = 0.8
    }
    if (this.counterJump === 2 && this.doubleJump) {
      this.doubleJump = false
      // console.log(this.counterJump)

      this.counterJump = 0
      // mantenemos al player levitando
      this.gravity = 0
      this.velY = 0

      // console.log(this.posY)
      // volvemos a poner la referencia del player a la posicion inicial
      this.posY = this.gameHeight - this.height - 20;
      // console.log(this.posY0)
      this.jump()
    }
  }

  doubleJump(counter) {

    // console.log("doublejump")

    this.posY = this.posY0 - this.height
    console.log(this.posY)
    if (this.posY - this.height >= this.posY0) {
      this.posY = this.posY0 - this.jumpLength
      this.velY -= 10
    }

  }

  shoot() {
    this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posY0, this.width, this.height));
  }

  clearBullets() {
    this.bullets = this.bullets.filter(bull => bull.posX <= this.gameWidth)
  }
}
