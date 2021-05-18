const elementBuilder = new ElementBuilder()
const game_states = {
    START: "Start",
    INGAME_QUESTION: "Frage",
    INGAME_GAME: "Spiel",
    END: "Ende"
}
let game_state = game_states.START
const debug = (message) => {
    console.debug(message)
}
let currentInterval
let currentQuestion
let currentTime
let nextQuestion
let hearts = 3
let questionsSolved = 0
let heartsHeaderElement
let heartsContainer = elementBuilder.newDiv("heartsContainer", "container text-end", document.getElementsByTagName("body")[0])
const startButton = elementBuilder.newButton("start", "start-btn", "Start", document.getElementsByTagName("body")[0])
startButton.style.display = "none"
const questions = elementBuilder.newDiv("questions", "container", document.getElementsByTagName("body")[0])
const getNextQuestion = async () => {
    const result = await $.ajax({
        url: "https://questions-game-swp.herokuapp.com/new/random",
        type: 'GET'
    });
    return JSON.parse(result)
}
const getSuggestedRemainingTime = () => {
    if (questionsSolved == 20) {
        return -1
    } else if (questionsSolved >= 15) {
        return 3
    } else if (questionsSolved >= 10) {
        return 5
    } else if (questionsSolved >= 5) {
        return 7
    } else {
        return 10
    }
}
const setGameState = (gameState) => {
    game_state = gameState
    debug("Current game state was changed to " + gameState)
}
const gameOver = () => {
    startButton.style.display = "block"
    questions.style.display = "none"
    heartsHeaderElement = elementBuilder.newHeader(4, "", "", "color: red;", "Du hast keine Herzen mehr", startButton)
    $("#" + heartsContainer.id).empty()
    setGameState(game_states.START)
    questionsSolved = 0
    hearts = 3
    $("#questions").empty()
}
const startMinigame = () => {
    setGameState(game_states.INGAME_GAME)
    $("#questions").empty()
    $("#" + heartsContainer.id).empty()
    let question = elementBuilder.newHeader(3, "", "", "", "Snake - Ziel: Keins", questions)
    let countdown = elementBuilder.newHeader(6, "", "", "", "5 Sekunden verbleibend", questions)
    let canvas = elementBuilder.newCanvas("game", 500, 500, questions)
    let ctx = canvas.getContext('2d')
}
const renderHearts = () => {    
    for (i = 0; i < hearts; i++) {
        elementBuilder.newImage("", "", "margin: 10px;", "./assets/img/full_heart.svg", heartsContainer)
    }
    for (i = hearts-3; i < 0; i++) {
        elementBuilder.newImage("", "", "margin: 10px;", "./assets/img/empty_heart.svg", heartsContainer)
    }
}
const startGame = () => {
    renderHearts()
    startButton.style.display = "none"
    setGameState(game_states.INGAME_QUESTION)
    currentTime = getSuggestedRemainingTime()

    currentQuestion = nextQuestion
    getNextQuestion().then((question) => {
        console.debug("Fetched question")
        nextQuestion = question
    })

    answers = currentQuestion._answers
    shuffle(answers)

    questions.style = "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;"

    let question = elementBuilder.newHeader(3, "", "", "", currentQuestion._question, questions)
    let countdown = elementBuilder.newHeader(6, "", "", "", "Noch " + currentTime + " Sekunde" + (currentTime != 1 ? "n" : ""), questions)
    let firstRow = questions.appendChild(elementBuilder.newDiv("", "row"))
    let secondRow = questions.appendChild(elementBuilder.newDiv("", "row"))

    currentInterval = setInterval(async () => {
        currentTime--
        countdown.innerText = "Noch " + currentTime + " Sekunde" + (currentTime != 1 ? "n" : "")
        if (currentTime <= 0) {
            startMinigame()
            clearInterval(currentInterval)
        }
    }, 1000)

    question.style = "text-transform: uppercase"
    countdown.style = "text-transform: uppercase"
    firstRow.style = "text-align: center"
    secondRow.style = "text-align: center"

    let firstColumn = firstRow.appendChild(elementBuilder.newDiv("", "col-md-6 p-3"))
    let secondColumn = firstRow.appendChild(elementBuilder.newDiv("", "col-md-6 p-3"))
    let thirdColumn = secondRow.appendChild(elementBuilder.newDiv("", "col-md-6 p-3"))
    let fourthColumn = secondRow.appendChild(elementBuilder.newDiv("", "col-md-6 p-3"))

    elementBuilder.newButton("answer1", "answer-btn", answers[0]._name, firstColumn)
    elementBuilder.newButton("answer2", "answer-btn", answers[1]._name, secondColumn)
    elementBuilder.newButton("answer3", "answer-btn", answers[2]._name, thirdColumn)
    elementBuilder.newButton("answer4", "answer-btn", answers[3]._name, fourthColumn)
}
startButton.onclick = () => {
    if (game_state == game_states.START) {
        startGame()
        if (heartsHeaderElement) {
            heartsHeaderElement.style.display = "none"
        }
    } else {
        alert("What are you doing?")
    }
}
getNextQuestion().then((question) => {
    console.debug("Fetched question")
    startButton.style.display = "block"
    nextQuestion = question
})