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
const setGameState = (gameState) => {
    game_state = gameState
    debug("Current game state was changed to " + gameState)
}
const startGame = () => {
    startButton.style.display = "none"
}

const canvas = elementBuilder.newCanvas("game", 500, 500, document.getElementsByTagName("body")[0])
const startButton = elementBuilder.newButton("start", "btn", "Start", document.getElementsByTagName("body")[0])
const questions = elementBuilder.newDiv("questions", "", document.getElementsByTagName("body")[0])
canvas.style.display = "none"
const ctx = canvas.getContext('2d')

startButton.onclick = () => {
    if (game_state == game_states.START) {
        setGameState(game_states.INGAME_QUESTION)
        startGame()
    } else {
        alert("What are you doing?")
    }
}