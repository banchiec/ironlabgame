class Cacaolat {
    constructor(ctx, gameWidth, gameHeight, playerHeight, width = 70, height = 75) {

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
        this.image.frame = 2
        this.image.framesIndex = 0

        // despues
        this.cacaolatCollision = false

        this.posX = this.gameWidth

        this.posY = this.gameHeight - this.playerHeight * 2;

        this.velX = 10;
    }

    draw(framesCounter) {
        // this.ctx.fillStyle = "green"
        // this.ctx.drawImage(0, 0, 10, 200)
        // this.ctx.fillRect(this.posX, this.posY, this.width, this.height);

        this.fly(framesCounter)

        this.move()
    }
    fly(framesCounter) {

        this.ctx.drawImage(this.image,
            this.image.framesIndex * Math.floor(70 / this.image.frame),
            0, 35, 75, this.posX, this.posY, 35, 75)
        this.animateSprite(framesCounter)

    }

    animateSprite(framesCounter) {
        if (framesCounter % 2 === 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex >= this.image.frame) {
            this.image.framesIndex = 0;
        }
    }

    move() {
        this.posX -= this.velX;
    }
}