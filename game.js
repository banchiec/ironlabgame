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

  counterLives: 0,
  //points
  counterCacaolat: 0,


  //bulletCollsion

  // images 
  imgCacaolat: new Image(),
  imgLogo: new Image(),
  imgLive: new Image(),
  imgClock: new Image(),


  imgGameover: new Image(),
  imgWin: new Image(),

  posxflag: null,
  isflag: false,

  // audios
  audioCacaolat: new Audio(),
  audioGameSong: new Audio(),
  audioYouLose: new Audio(),
  audioYouWin: new Audio(),





  keys: {
    TOP: 38,
    SPACE: 32
  },

  init() {
    this.canvas = document.getElementById("myCanvas")
    this.ctx = this.canvas.getContext("2d")
    this.imgGameover.src = "./img/YOU_LOSE.jpg"
    this.imgWin.src = "./img/YOU_WIN.jpg"
    this.audioCacaolat.src = "./song/cacaolat.mp3"
    this.audioGameSong.src = "./song/game_sound.mp3"
    this.audioYouLose.src = "./song/you_lose.mp3"
    this.audioYouWin.src = "./song/you_win.mp3"
    // this.counterPoints = 0
    this.setDimensions()
    this.posxflag = this.width
    this.start()
  },

  setDimensions() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas.width = this.width
    this.canvas.height = this.height
  },

  start() {
    console.log('object')
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

      this.counterLives = this.contadorCollision

      if (this.frametime % this.FPS === 0) {
        this.gametime++
      }

      if (this.gametime === 58 && !this.isflag) {
        this.flag = new Flag(this.ctx, "./img/bandera.png", this.width, this.height)
        this.isflag = true
      }
      if (this.gametime >= 60) {
        this.gameOver()
      }

      this.isFailed() === 3 ? this.gameOver() : null

      this.isCollisionFlag() ? this.gameWin() : null

      // pick cacaolat
      this.isPickCacaolat()

      this.isCollisionBullets()


      this.frametime++

    }, 1000 / this.FPS)
  },
  score() {
    this.ctx.fillStyle = "black"

    this.imgLogo.src = "./img/logo_interface.png"
    this.ctx.drawImage(this.imgLogo, this.width / 2 - 50, 20)

    this.imgCacaolat.src = "./img/puntos.png"
    this.ctx.drawImage(this.imgCacaolat, this.width / 2 + 280, 50)

    this.imgLive.src = "./img/vida.png"
    this.ctx.drawImage(this.imgLive, this.width / 2 - 300, 50)

    this.ctx.fillStyle = "white"
    this.ctx.font = "50px 'Chewy'"
    this.ctx.fillText(this.counterCacaolat * 100, this.width / 2 + 150, 90)

    this.ctx.font = "30px 'Chewy'"
    // this.ctx.fillText("time:", this.width - 200, 90)

    this.imgClock.src = "./img/timer.png"
    this.ctx.drawImage(this.imgClock, this.width - 180, 50)
    this.ctx.fillText(this.gametime, this.width - 100, 88)

    this.live = new Live(this.ctx, this.counterLives)

    this.live.draw()

    // this.ctx.fillStyle = "white"
    // this.ctx.fillRect(464, 63, 44, 34)


    // this.ctx.fillText("Live", this.width / 2 - 200, 90)
    // console.log(this.contadorCollision)

  },

  isFailed() {

    // console.log(("collision " + this.contadorCollision))

    if (this.isCollision()) {
      this.contadorCollision++
    }
    // console.log(this.contadorCollision)
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

    this.background = new Background(this.ctx, this.width, this.height, "./img/sky.png", 12)
    this.clouds = new Background(this.ctx, this.width, this.height, "./img/clouds.png", 1)
    this.edificios = new Background(this.ctx, this.width, this.height, "./img/edificios_fondo.png", 2)
    this.madrid = new Background(this.ctx, this.width, this.height, "./img/madrid.png", 3)
    this.floor = new Background(this.ctx, this.width, this.height, "./img/floor.png", 8)

    this.player = new Player(this.ctx, 300, this.width, this.height, this.keys)

    this.enemy = new Enemy(this.ctx, 80, this.width, this.height)
    // this.cacaolat = new Cacaolat(this.ctx, this.width, this.height, this.player.height, 20, 50)

    this.obstacles = []
    this.cacaolats = []


  },

  drawAll() {
    this.background.draw()
    this.clouds.draw()
    this.edificios.draw()
    this.madrid.draw()
    this.floor.draw()
    this.player.draw(this.framesCounter)

    this.enemy.draw(this.contadorCollision, this.framesCounter)
    if (this.flag)
      this.flag.draw()

    // this.cacaolat.draw(this.framesCounter)
    this.obstacles.forEach(obs => obs.draw())
    this.cacaolats.forEach(cacaolat => cacaolat.draw())
  },

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  },

  generateObstacles() {

    if (this.framesCounter % (Math.floor(Math.random() * (750 - 150)) + 150) === 0) {
      this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height, "./img/bloque1x2.png"))
    }
    if (this.framesCounter % (Math.floor(Math.random() * (650 - 250)) + 250) === 0) {
      this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height, "./img/bloque_2x2.png", 150, 150))
    }
    if (this.framesCounter % (Math.floor(Math.random() * (450 - 380)) + 380) === 0) {
      this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height, "./img/bloque1x1.png", 75, 75))
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
        new Cacaolat(this.ctx, this.width, this.height - this.player.height, this.player.height, 20, 50))
    }
  },
  clearCacaolats() {
    this.cacaolats = this.cacaolats.filter(cacaolat => cacaolat.posX >= 0)

  },

  clearObstacles() {
    this.obstacles = this.obstacles.filter(obs => obs.posX >= 0)
  },

  isCollisionFlag() {
    if (this.flag && this.flag.posx <= this.player.posX + this.player.width) {
      return true
    } else {
      return false
    }
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
        this.audioCacaolat.play()

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
          // console.log(obs.liveObstacles)

          delete this.player.bullets.splice(i, 1)[0]

        }
      })
    })
  },

  gameOver() {
    clearInterval(this.interval)
    this.ctx.drawImage(this.imgGameover, 0, 0, this.width, this.height)
    this.audioYouLose.play()
  },
  gameWin() {
    clearInterval(this.interval)
    this.ctx.drawImage(this.imgWin, 0, 0, this.width, this.height)
    this.audioYouWin.play()

  }
}
