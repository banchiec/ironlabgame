class Flag {

    constructor(ctx, pathImg, gameWidth, gameHeigth) {

        this.ctx = ctx;
        this.gameWidth = gameWidth
        this.gameHeigth = gameHeigth

        this.img = new Image()
        this.img.src = pathImg

        this.playerCollision = false


        this.liveObstacles = 5

        this.posx = gameWidth
        this.width = 160
        this.height = 390
        this.posy = gameHeigth
        this.velX = 10;
    }

    draw() {
        this.ctx.drawImage(this.img, this.posx, this.posy - 450, this.width, this.height)
        this.move()
    }

    move() {
        this.posx -= this.velX;
    }
}