class Enemy {

    constructor(ctx, posx, gameWidth, gameHeight) {
        this.ctx = ctx
        this.posx = posx
        this.width = 80
        this.height = 80
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.posy = this.gameHeight - this.height - 20;

        this.ctx.fillStyle = "red"
        this.ctx.fillRect(this.pox, 200, this.gameWidth - this.width, 20)

        // this.image = new Image()
        // this.image.src = "./img/player.png"
        // this.ctx.drawImage(this.image, 0, 0)

    }
}