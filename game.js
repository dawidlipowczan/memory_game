const canvas = document.getElementById("game_board")
canvas.width = innerWidth
canvas.height = innerHeight
BOARDELEMENTSROW = 2
BOARDELEMENTSCOLUMN = 4
// Listeners

const ctx = canvas.getContext("2d")
const startWidthPosition = canvas.width / (BOARDELEMENTSROW + 2)
const startHeightPosition = canvas.height / (BOARDELEMENTSCOLUMN + 2)
const distanceWidth = canvas.width / (BOARDELEMENTSROW + 2)
const distanceHeight = canvas.height / (BOARDELEMENTSCOLUMN + 2)

class Puzzle{
    constructor(x,y,value){
        this.x = x
        this.y = y
        this.value = value
        this.is_beeing_guesed = false
        this.was_guessed = false

        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = "150px";
        this.element.style.height = "150px";
        this.element.style.backgroundColor = "black";

        canvas.parentElement.appendChild(this.element);

        this.element.addEventListener("click", () => {
            this.handleGuess()
        });
    }
    draw() {
        ctx.beginPath()
        ctx.rect(this.x, this.y,30,30)
        ctx.fill()
    }

    handleGuess() {
        
        let guessedPuzzles = puzzlesArray.filter(puzzle => puzzle.is_beeing_guesed)
        
        let guessedPuzzlesCount = guessedPuzzles.length
        if (guessedPuzzlesCount >= 2) {
            if(guessedPuzzles[0].value == guessedPuzzles[1].value){
                triggerGreenFlash()
                guessedPuzzles[0].was_guessed = true
                guessedPuzzles[1].was_guessed = true
                guessedPuzzles.forEach(
                    puzzle => {
                        puzzle.element.disabled = true
                        puzzle.is_beeing_guesed = false
                })
            }
            else{
                guessedPuzzles.forEach(
                    puzzle => {
                        if (puzzle.was_guessed == false){
                            puzzle.element.style.backgroundColor = "black"
                        }
                        puzzle.is_beeing_guesed = false
                        
                })
            }
            
        }
        this.is_beeing_guesed = !this.is_beeing_guesed;
        this.element.style.backgroundColor = this.is_beeing_guesed ? this.value : "black";

        puzzlesArray.forEach(puzzle => puzzle.draw());
    }
}

function getRandomColor(amountOfColors) {
    colorsArray = []
    for (let i=0; i<amountOfColors; i++){
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        colorsArray.push(color)
    }
    
    return colorsArray;
  }
  
function triggerGreenFlash() {
    document.body.classList.add("green-flash");

    setTimeout(() => {
        document.body.classList.add("fade-out");
    }, 500);
    document.body.classList.remove("green-flash");
    document.body.classList.remove("fade-out");
}
  

function shuffle(array) {
    var m = array.length, t, i;
    
    while (m) {
    
        i = Math.floor(Math.random() * m--);
    
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    
    return array;
    }


widthPosition = startWidthPosition
heightPosition = startHeightPosition
puzzlesArray = []
colorsArrayOnce = getRandomColor(BOARDELEMENTSROW * BOARDELEMENTSCOLUMN/2)
colorsArrayTwice = [...colorsArrayOnce, ...colorsArrayOnce]
colorsArrayTwiceShuffled = shuffle(colorsArrayTwice)
colorIndex = 0
for (let i = 0; i < BOARDELEMENTSCOLUMN; i++){
    for (let j = 0; j < BOARDELEMENTSROW; j++){
        puzzleElement = new Puzzle(widthPosition, heightPosition, colorsArrayTwiceShuffled[colorIndex])
        colorIndex += 1
        puzzlesArray.push(puzzleElement)
        widthPosition += distanceWidth
    }
    widthPosition = startWidthPosition
    heightPosition += distanceHeight
}
puzzlesArray.forEach(puzzle => puzzle.draw())