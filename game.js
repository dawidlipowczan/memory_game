const canvas = document.getElementById("game_board")
canvas.width = innerWidth
canvas.height = innerHeight
BOARDELEMENTSROW = 5
BOARDELEMENTSCOLUMN = 4
const ctx = canvas.getContext("2d")

class Puzzle{
    constructor(x,y,value){
        this.x = x
        this.y = y
        this.value = value
    }
    draw() {
        ctx.beginPath()
        ctx.rect(dump_puzzle.x, dump_puzzle.y,30,30)
        ctx.stroke()
    }
}

puzzlesArray = []
for (let i = 0; i < BOARDELEMENTSCOLUMN; i++){
    for (let j = 0; j < BOARDELEMENTSROW; j++){
        new Puzzle(100)
    }
}