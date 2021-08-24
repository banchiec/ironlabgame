
class Enemy {

    constructor(ctx, posx, gameWidth, gameHeight) {
        this.ctx = ctx
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.posx = posx
        this.posx0 = this.posx
        this.height = 150
        this.width = 75
        this.posy = this.gameHeight - this.height * 2
        this.posy0 = this.posy
        this.momentum = new Date().getTime() / 30
        this.velY = 0
        this.gravity = 0.8
        this.setListeners()
        this.posY = this.gameHeight - this.height - 20;


        // this.image = new Image()
        // this.image.src = "./img/player.png"
        // this.ctx.drawImage(this.image, 0, 0)
    }
    draw(lives) {
        // console.log("1")
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(this.posx, this.posy, this.width, 100)
        this.move(lives)
    }
    move(lives) {
        // this.posy += this.velY
        // this.velY += this.gravity
        // console.log(this.momentum)
        this.posx = this.posx0 + 75 * lives
        this.posy = this.posy0 + 75 * lives
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
    jump() {
        if (this.posx === this.posx0) {
            // this.posy -= 80
            this.velY = 0
        } else {
            this.posx = this.posX0
            this.gravity = 0
        }


    }
}