class Live {

    constructor(ctx, live) {
        this.ctx = ctx
        this.posx = 440
        this.posy = 60
        this.posXMove = 180
        this.live = live
    }

    draw() {
        // console.log(this.live)
        if (this.live === 0) {
            this.ctx.fillStyle = "orange"
            this.ctx.fillRect(this.posx, this.posy, this.posXMove, 30)
        }
        if (this.live === 1) {
            this.ctx.fillStyle = "orange"
            this.ctx.fillRect(this.posx, this.posy, this.posXMove - 120, 30)
        }
        if (this.live === 2) {
            this.ctx.fillStyle = "orange"
            this.ctx.fillRect(this.posx, this.posy, this.posXMove - 160, 30)
        }
        if (this.live === 3) {
            this.ctx.fillStyle = "orange"
            this.ctx.fillRect(this.posx, this.posy, this.posXMove - 180, 30)
        }
    }
}