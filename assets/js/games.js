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
    get question() {
        return this._question
    }
}

class SnakeGame extends Game {
    start() {
        let objectives = ["Erreiche eine Größe von 10", "Erreiche eine Größe von 15", "Sammle kein Essen ein"]
        let objective = objectives[Math.floor(objectives.length * Math.random() | 0)]
        let ctx = this.canvas.getContext('2d')

        this.question.innerText = "Snake Game - " + objective
        this._countdown.innerText = "Noch " + this._time + " Sekunde" + (this._time != 1 ? "n" : "") + " verbleibend"

        this.countdownInterval = setInterval(() => {
            this._time--
            this._countdown.innerText = "Noch " + this._time + " Sekunde" + (this._time != 1 ? "n" : "") + " verbleibend"
            if (this._time <= 0) {
                clearInterval(this.countdownInterval)
                // checks
                $("#" + questions.id).empty()
                hearts--
                if (hearts == 0) {
                    gameOver()
                    return
                }
                startGame()
            }
        }, 1000)

        ctx.strokeStyle = "#fff"
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, 500, 500)

        for (var i = 0; i < 50; i++) {
            ctx.moveTo(i * (this.canvas.width / 15) - 1, 0)
            ctx.lineTo(i * (this.canvas.width / 15) - 1, this.canvas.height)
            ctx.moveTo(0, i * (this.canvas.height / 15) - 1)
            ctx.lineTo(ctx.canvas.width, i * (this.canvas.height / 15) - 1)
            ctx.stroke()
        }
    }
}