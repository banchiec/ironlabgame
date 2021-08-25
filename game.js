const Game = {

  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,

  FPS: 60,
  framesCounter: 0,

  gametime: 0,
  frametime: 0,

  background: undefined,
  player: undefined,
  // player2: undefined,
  obstacles: [],
  cacaolats: [],
  // obstacleRandom: [],

  // collision
  contadorCollision: 0,

  //points
  counterCacaolat: 0,

  //bulletCollsion
  text: "CACAOLAT",

  // images 
  imgCacaolat: new Image(),


  keys: {
    TOP: 38,
    SPACE: 32
  },

  init() {
    this.canvas = document.getElementById("myCanvas")
    this.ctx = this.canvas.getContext("2d")
    // this.counterPoints = 0
    this.setDimensions()
    this.start()
  },

  setDimensions() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas.width = this.width
    this.canvas.height = this.height
  },

  start() {

    this.reset()

    this.interval = setInterval(() => {

      this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

      // this.car()
      this.drawAll()

      this.generateObstacles()
      this.clearObstacles()
      this.generateCacaolat()
      this.clearCacaolats()
      this.score()

      if (this.frametime % this.FPS === 0) {
        this.gametime++
      }
      // console.log(this.gametime)
      if (this.gametime >= 60) {
        this.gameOver()
      }

      this.isFailed() === 3 ? this.gameOver() : null

      // pick cacaolat
      this.isPickCacaolat()

      this.isCollisionBullets()


      this.frametime++

    }, 1000 / this.FPS)
  },
  score() {
    this.ctx.fillStyle = "black"
    this.ctx.font = '28px serif'
    this.imgCacaolat.src = "./img/cacaolatOne.png"
    this.ctx.drawImage(this.imgCacaolat, this.width - this.player.width * 3, 0)
    this.ctx.fillText(this.counterCacaolat, this.width - this.player.width, 100, 500)
  },

  isFailed() {
    // console.log(("collision " + this.contadorCollision))
    if (this.isCollision()) {
      this.contadorCollision++
    }
    return this.contadorCollision
  },

  isPickCacaolat() {
    // console.log(this.counterCacaolat)
    if (this.isCollisionCacaolat()) {
      this.counterCacaolat++
    }
    return this.counterCacaolat
  },

  reset() {

    this.background = new Background(this.ctx, this.width, this.height, "./img/background.png")
    this.player = new Player(this.ctx, 300, this.width, this.height, this.keys)

    this.enemy = new Enemy(this.ctx, 80, this.width, this.height)
    // this.cacaolat = new Cacaolat(this.ctx, this.width, this.height, this.player.height, 20, 50)

    this.obstacles = []
    this.cacaolats = []


  },

  drawAll() {
    this.background.draw()
    this.player.draw(this.framesCounter)

    this.enemy.draw(this.contadorCollision, this.framesCounter)

    // this.cacaolat.draw(this.framesCounter)
    this.obstacles.forEach(obs => obs.draw())
    this.cacaolats.forEach(cacaolat => cacaolat.draw())
  },

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  },

  generateObstacles() {

    if (this.framesCounter % (Math.floor(Math.random() * (750 - 150)) + 150) === 0) {
      this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height))
    }
    if (this.framesCounter % (Math.floor(Math.random() * (450 - 380)) + 380) === 0) {
      this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height, 75, 75))
    }
    if (this.framesCounter % (Math.floor(Math.random() * (650 - 250)) + 250) === 0) {
      this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height, 150, 150))
    }
  },

  // CACAOLAT

  generateCacaolat() {
    if (this.framesCounter % (Math.floor(Math.random() * (750 - 150)) + 150) === 0) {
      this.cacaolats.push(
        new Cacaolat(this.ctx, this.width, this.height, this.player.height, 20, 50))
    }
    if (this.framesCounter % (Math.floor(Math.random() * (750 - 150)) + 150) === 0) {
      this.cacaolats.push(
        new Cacaolat(this.ctx, this.width, this.height - 100, this.player.height, 20, 50))
    }
    if (this.framesCounter % (Math.floor(Math.random() * (750 - 150)) + 150) === 0) {
      this.cacaolats.push(
        new Cacaolat(this.ctx, this.width, this.height + this.player.height, this.player.height, 20, 50))
    }
  },
  clearCacaolats() {
    this.cacaolats = this.cacaolats.filter(cacaolat => cacaolat.posX >= 0)

  },

  clearObstacles() {
    this.obstacles = this.obstacles.filter(obs => obs.posX >= 0)
  },

  isCollision() {
    return this.obstacles.some(obs => {
      if (
        this.player.posX + this.player.width >= obs.posX &&
        this.player.posY + this.player.height >= obs.posY &&
        this.player.posX <= obs.posX + obs.width && !obs.playerCollision
      ) {
        obs.playerCollision = true
        return true
      } else {
        return false
      }
    })
  },

  isCollisionCacaolat() {

    return this.cacaolats.some((obs, index) => {
      if (

        this.player.posX + this.player.width >= obs.posX &&
        this.player.posY <= obs.posY &&
        this.player.posX <= obs.posX + obs.width && !obs.cacaolatCollision) {

        delete this.cacaolats.splice(index, 1)[0]
        obs.cacaolatCollision = true

        return true
      } else {
        return false
      }
    })
  },


  isCollisionBullets() {

    this.player.bullets.forEach((bullet, i) => {
      this.obstacles.forEach((obs, j) => {

        if (bullet.posX + bullet.width >= obs.posX &&
          bullet.posY <= obs.posY + obs.height &&
          bullet.posX <= obs.posX + obs.width && bullet.posY + bullet.width >= obs.posY
        ) {

          obs.liveObstacles--
          if (obs.liveObstacles === 0) {
            delete this.obstacles.splice(j, 1)[0]
          }
          console.log(obs.liveObstacles)

          delete this.player.bullets.splice(i, 1)[0]

        }
      })
    })
  },

  gameOver() {
    clearInterval(this.interval)
  }
}
