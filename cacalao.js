class Cacaolat {
    constructor(ctx, gameWidth, gameHeight, playerHeight, width = 70, height = 150) {

        this.ctx = ctx;
        this.width = width
        this.height = height
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.playerHeight = playerHeight
        this.isStrong = false

        // Image
        this.image = new Image()
        this.image.src = "./img/cacaolat.png"
        // despues
        this.cacaolatCollision = false

        this.posX = this.gameWidth

        this.posY = this.gameHeight - this.playerHeight * 2;

        this.velX = 10;
    }

    draw() {
        // this.ctx.fillStyle = "green"
        // this.ctx.drawImage(0, 0, 10, 200)
        // this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.move()
    }

    move() {
        this.posX -= this.velX;
    }
}