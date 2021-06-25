class Game {
    constructor(name, time, canvas, countdown, question) {
        this._name = name
        this._time = time
        this._canvas = canvas
        this._countdown = countdown
        this._question = question
    }
    get name() {
        return this._name
    }
    get time() {
        return this._time
    }
    get canvas() {
        return this._canvas
    }
    get countdown() {
        return this._countdown
    }
    get game() {
        return this._game
    }
    get question() {
        return this._question
    }
}

class SnakeGame extends Game {
    start() {
        let end = () => {
            clearInterval(this.countdownInterval)
            clearInterval(this.gameInterval)
            $("#" + questions.id).empty()
            startGame()
        }

        let objectives = ["Erreiche eine Größe von 10", "Erreiche eine Größe von 15", "Sammle kein Essen ein"]
        let objective = objectives[Math.floor(objectives.length * Math.random() | 0)]
        let ctx = this.canvas.getContext('2d')

        this.question.innerText = "Snake Game - " + objective
        this._countdown.innerText = "Noch " + this._time + " Sekunde" + (this._time != 1 ? "n" : "") + " verbleibend"
        var userPositions = [[4, 7], [5, 7]]
        var foodPosition = [12, 7]
        var direction = 1
        var snakeLength = 2
        this.renderBasicField(ctx)
        this.countdownInterval = setInterval(() => {
            this._time--
            this._countdown.innerText = "Noch " + this._time + " Sekunde" + (this._time != 1 ? "n" : "") + " verbleibend"
            if (this._time <= 0) {
                end()
                if ((objective == objectives[0] && snakeLength < 10) || (objective == objectives[1] && snakeLength < 15)) {
                    hearts--
                    if (hearts == 0) {
                        gameOver()
                        return
                    }
                }
            }
        }, 1000)
        ctx.font = "20px Arial"
        this.gameInterval = setInterval(() => {
            var canvasPositions = []
            userPositions.forEach((userPosition) => {
                canvasPositions.push(this.coords(userPosition[0], userPosition[1]))
            })
            this.renderBasicField(ctx)
            ctx.fillStyle = "#009999"
            ctx.fillText(snakeLength, 5, 20, 1000)
            ctx.fillStyle = "#ff0000"
            var canvasFood = this.coords(foodPosition[0], foodPosition[1])
            ctx.fillRect(canvasFood[0] + 5, canvasFood[1] + 5, this.canvas.width / 15 - 12, this.canvas.height / 15 - 12)
            var head = userPositions.slice(-1)[0]
            var newHead = Object.assign({}, head)
            switch (direction) {
                case 1:
                    newHead[0] = head[0] + 1
                    break
                case 2:
                    newHead[1] = head[1] + 1
                    break
                case 3:
                    newHead[0] = head[0] - 1
                    break
                case 4:
                    newHead[1] = head[1] - 1
                    break
                default:
                    alert("SYSTEM ERROR!!! EVACUATE!!!")
                    break
            }
            userPositions.push(newHead)
            if (snakeLength == userPositions.length - 1)
                userPositions.shift()
            if (newHead[0] == foodPosition[0] && newHead[1] == foodPosition[1]) {
                if (objective == objectives[2]) {
                    end()
                    hearts--
                    if (hearts == 0) {
                        gameOver()
                        return
                    }
                }
                foodPosition = this.randomArray(1, 15)
                snakeLength++
            }
            ctx.fillStyle = "#32a852";
            canvasPositions = []
            userPositions.forEach((userPosition) => {
                canvasPositions.push(this.coords(userPosition[0], userPosition[1]))
            })
            canvasPositions.forEach((canvasPosition) => {
                ctx.fillRect(canvasPosition[0], canvasPosition[1], this.canvas.width / 15 - 1, this.canvas.height / 15 - 1)
            })
            var canvasHead = this.coords(head[0], head[1])
            if (canvasHead[0] > this.canvas.width - 1 || canvasHead[1] > this.canvas.height - 1 || canvasHead[0] < 0 || canvasHead[1] < 0
                || userPositions.slice(0, -1).some((body) => body[0] == newHead[0] && body[1] == newHead[1])) {
                end()
                hearts--
                if (hearts == 0) {
                    gameOver()
                    return
                }
            }
        }, 250)

        document.onkeydown = e => {
            if (e.key == 'w' || e.key == "ArrowUp" && direction != 2) {
                direction = 4
            } else if (e.key == 'a' || e.key == "ArrowLeft" && direction != 1) {
                direction = 3
            } else if (e.key == 's' || e.key == "ArrowDown" && direction != 4) {
                direction = 2
            } else if (e.key == 'd' || e.key == "ArrowRight" && direction != 3) {
                direction = 1
            }
        }
    }
    index(x, y) {
        return [Math.ceil((x / this.canvas.width * 15)), Math.ceil(y / this.canvas.height * 15)]
    }
    coords(x, y) {
        return [Math.floor(this.canvas.width / 15 * x), Math.floor(this.canvas.height / 15 * y)]
    }
    renderBasicField(ctx) {
        ctx.strokeStyle = "#fff"
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, 500, 500)
        for (var i = 0; i < 50; i++) {
            ctx.moveTo(i * (this.canvas.width / 15) - 1, 0)
            ctx.lineTo(i * (this.canvas.width / 15) - 1, this.canvas.height)
            ctx.moveTo(0, i * (this.canvas.height / 15) - 1)
            ctx.lineTo(this.canvas.width, i * (this.canvas.height / 15) - 1)
            ctx.stroke()
        }
    }
    randomArray(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return [Math.floor(Math.random() * (max - min) + min), Math.floor(Math.random() * (max - min) + min)]
    }
}