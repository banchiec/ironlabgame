// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");
// var c = {}
// var cw = canvas.width = 300;
// c.x = cw / 2;
// var ch = canvas.height = 300;
// c.y = ch / 2;


// var rad = Math.PI / 180;

function Particula(ctx, gameWidth, gameHeight) {
    this.ctx = ctx
    this.cw = gameWidth = 300
    this.ch = gameHeight = 300
    this.c = {}
    this.c.x = this.cw / 2
    this.c.h = this.ch / 2
    this.x = -this.r;
    this.y = -this.r;
    this.rad = Math.PI / 180
    this.frames = 0;

    this.r = 10;

    this.dibujar = function () {
        this.ctx.fillStyle = "#6ab150";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    this.actualizar = function (momento, frames) { //53, 59, 61, 67 números primos!
        this.x = this.c.x + Math.cos(momento / 23 + Math.cos(momento / 29 + this.frames * this.rad)) * (this.c.x - 2 * this.r);
        this.y = this.c.y + Math.sin(momento / 31 + Math.cos(momento / 37 + this.frames * this.rad)) * (this.c.y - 2 * this.r);
    }
}

// particula = new Particula();
// particula.dibujar();

function Animar() {
    //   elId = window.requestAnimationFrame(Animar);
    this.frames += .25;
    this.ctx.clearRect(0, 0, cw, ch);
    let momento = new Date().getTime() / 30;
    particula.actualizar(momento, this.frames);
    particula.dibujar();

}

// requestId = window.requestAnimationFrame(Animar);

// class Enemy {

//     constructor(ctx, posx, gameWidth, gameHeight) {
//         this.ctx = ctx
//         this.gameWidth = gameWidth
//         this.gameHeight = gameHeight
//         this.posx = posx
//         this.posx0 = this.posx
//         this.height = 150
//         this.width = 75
//         this.posy = this.gameHeight - this.height * 2
//         this.posy0 = this.posy
//         this.momentum = new Date().getTime() / 30
//         this.velY = 0
//         this.gravity = 0.8
//         this.setListeners()
//         // this.posY = this.gameHeight - this.height - 20;


//         // this.image = new Image()
//         // this.image.src = "./img/player.png"
//         // this.ctx.drawImage(this.image, 0, 0)
//     }
//     draw() {
//         console.log("1")
//         this.ctx.fillStyle = "red"
//         this.ctx.fillRect(this.posx - 300 + this.width * 2, this.posy, this.width, 100)
//         this.move()
//     }
//     move() {
//         // this.posy += this.velY
//         // this.velY += this.gravity
//         // console.log(this.momentum)

//     }
//     setListeners() {
//         document.addEventListener("keydown", e => {
//             switch (e.key) {
//                 case 'w':
//                     this.jump()
//                     break;
//                 case 's':
//                     this.shoot();
//                     break;
//             }
//         });
//     }
//     jump() {
//         if (this.posx === this.posx0) {
//             // this.posy -= 80
//             this.velY = 0
//         } else {
//             this.posx = this.posX0
//             this.gravity = 0
//         }


//     }
// }