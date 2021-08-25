
class Enemy {

    constructor(ctx, posx, gameWidth, gameHeight) {
        this.ctx = ctx
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.posx = posx

        this.image = new Image()
        this.image.src = "./img/reloj.png"
        this.image.frame = 6

        this.image.framesIndex = 0

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


        // this.ctx.drawImage(this.image, 0, 0)
    }
    draw(lives, framesCounter) {
        // console.log("1")
        // this.ctx.fillStyle = "red"
        // this.ctx.fillRect(this.posx, this.posy, this.width, 100)
        // console.log("frames" + framesCounter)
        this.fly(framesCounter)
        this.move(lives)
    }
    fly(framesCounter) {
        // console.log(this.image.framesIndex * Math.floor(900 / this.image.frame))
        this.ctx.drawImage(
            this.image,
            // number frames
            this.image.framesIndex * Math.floor(900 / this.image.frame),
            0,
            Math.floor(900 / this.image.frame),
            110,
            this.posx,
            this.posy,
            150,
            // this.width,
            110
        )
        this.animateSprite(framesCounter)
    }

    animateSprite(framesCounter) {
        if (framesCounter % 6 === 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex >= this.image.frame) {
            this.image.framesIndex = 0;
        }
    }

    move(lives) {
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
    shoot() {
    }


}