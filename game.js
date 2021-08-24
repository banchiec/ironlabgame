const Game = {

  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,

  contadorCollision: 0,
  FPS: 60,
  framesCounter: 0,

  background: undefined,
  player: undefined,
  // player2: undefined,
  obstacles: [],
  // obstacleRandom: [],

  keys: {
    TOP: 38,
    SPACE: 32
  },

  init() {
    this.canvas = document.getElementById("myCanvas")
    this.ctx = this.canvas.getContext("2d")
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

      this.clear()
      this.drawAll()

      this.generateObstacles()
      this.clearObstacles()


      this.isFailed() === 3 ? this.gameOver() : null
      // this.isFailed()
      // this.isCollision() ? this.gameOver() : null

    }, 1000 / this.FPS)
  },
  isFailed() {

    console.log(("collision " + this.contadorCollision))
    // console.log(this.isCollision())
    if (this.isCollision()) {
      this.contadorCollision++
    }
    return this.contadorCollision
  },

  reset() {

    this.background = new Background(this.ctx, this.width, this.height, "./img/bg.png")
    this.player = new Player(this.ctx, 300, this.width, this.height, this.keys)

    this.enemy = new Enemy(this.ctx, 80, this.width, this.height)

    this.obstacles = []
  },

  drawAll() {
    this.background.draw()
    this.player.draw(this.framesCounter)
    this.enemy.draw()
    // this.player2.draw(this.framesCounter)
    this.obstacles.forEach(obs => obs.draw())
  },

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  },

  generateObstacles() {

    if (this.framesCounter % (Math.floor(Math.random() * (750 - 150)) + 150) === 0) {
      // hemos cambia la referencia de this.posY0 por 600 para mantener fija  la coordenada y de
      // obstacles
      this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height))
    }
    if (this.framesCounter % (Math.floor(Math.random() * (450 - 380)) + 380) === 0) {
      this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height, 75, 75))
    }
    if (this.framesCounter % (Math.floor(Math.random() * (650 - 250)) + 250) === 0) {
      this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height, 150, 150))
    }
  },





  // Retorna un entero aleatorio entre min (incluido) y max (excluido)
  // ¡Usando Math.round() te dará una distribución no-uniforme!
  //   function getRandomInt(min, max) {
  //     return;
  //   }

  //   if (this.framesCounter % (Math.floor(Math.random() * (100 - 80)) + 80) === 0) {
  //     // hemos cambia la referencia de this.posY0 por 600 para mantener fija  la coordenada y de
  //     // obstacles
  //     this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height))
  //   }
  //   if (this.framesCounter % (Math.floor(Math.random() * (100 - 10)) + 20) === 0) {
  //     this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height, 75, 75))
  //   }
  // },

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

  gameOver() {
    clearInterval(this.interval)
  }
}
