class Player {
  constructor(ctx, posX, gameW, gameH, keys) {
    this.ctx = ctx;
    this.width = 100;
    this.height = 100;
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
    this.maxJump = 2
    this.velY = 0;
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
    // console.log(this.image.height)
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
      this.counterJump = 0
    }
  }
  setListeners() {
    document.addEventListener("keydown", e => {
      switch (e.key) {
        case 'w':
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
    console.log(this.counterJump)
    // importante
    // Necesitamos modificar el rango de salto del player en el doublejum
    this.counterJump++
    if (this.posY === this.posY0 && this.counterJump < 2) {
      this.posY -= 80;
      this.velY -= 8;
    }
    if (this.counterJump === 2 && this.posY < this.posY0) {
      this.doubleJump = false
      // mantenemos al player levitando
      // volvemos a poner la referencia del player a la posicion inicial
      //this.posY = this.gameHeight - this.height - 20;
      this.velY -= 15
      this.jump()
    }
  }
  // doubleJump(counter) {
  //   // console.log("doublejump")
  //   this.posY = this.posY0 - this.height
  //   // console.log(this.posY)
  //   if (this.posY - this.height >= this.posY0) {
  //     this.posY = this.posY0 - this.jumpLength
  //     this.velY -= 10
  //   }
  // }
  shoot() {
    this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posY0, this.width, this.height));
  }
  clearBullets() {
    this.bullets = this.bullets.filter(bull => bull.posX <= this.gameWidth)
  }
}