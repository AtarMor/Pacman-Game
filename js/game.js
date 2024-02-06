'use strict'

const WALL = '🟫'
const FOOD = '.'
const SUPER_FOOD = '✨'
const EMPTY = ' '
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gFoodCount
var gCherryInterval

function onInit() {
    hideModal()
    gFoodCount = -5
    updateScore(0)
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    clearInterval(gCherryInterval)
    gCherryInterval = setInterval(addCherry, 15000)
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gFoodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gFoodCount--
            }
        }
    }
    board[1][1] = board[1][size - 2] =
        board[size - 2][1] = board[size - 2][size - 2] = SUPER_FOOD

    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            const className = `cell cell-${i}-${j}`
            if (cell === PACMAN) cell = PACMAN_IMG
            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(score) {
    if (!score) gGame.score = 0
    else gGame.score += score
    document.querySelector('span.score').innerText = gGame.score
}

function gameOver() {
    renderCell(gPacman.location, '🪦')
    endGame('Game Over!')
}

function checkVictory() {
    if (gFoodCount !== gGame.score) return
    endGame('You Won!')
}

function endGame(msg) {
    const elModalH3 = document.querySelector('.modal h3')
    elModalH3.innerText = msg
    showModal()
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame.isOn = false
}

function superPowerMode() {
    gPacman.isSuper = true
    gRemovedGhosts = []
    setTimeout(() => {
        gPacman.isSuper = false
        gGhosts = gGhosts.concat(gRemovedGhosts)
    }, 5000)
}

function addCherry() {
    const emptyCell = getRandEmptyCell()
    if (!emptyCell) return
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)
    gFoodCount += 10
}