'use strict'

const PACMAN = '😀'
var PACMAN_IMG = '<img src="img/pacman.png">'
var gPacman
const eatingSound = new Audio('audio/crunchy-bite.mp3')

function createPacman(board) {
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) {
        if (gPacman.isSuper) removeGhost(nextLocation)
        else {
            gameOver()
            return
        } 
    }

    if (nextCell === FOOD || nextCell === CHERRY) {
        eatingSound.play()
        nextCell === FOOD ? updateScore(1) : updateScore(10)
        checkVictory()
    }

    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        superPowerMode()
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    renderCell(nextLocation, PACMAN_IMG)
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    var direction
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            direction = 'up'
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            direction = 'down'
            break;
        case 'ArrowLeft':
            nextLocation.j--
            direction = 'left'
            break;
    }
    PACMAN_IMG = `<img class="${direction}" src="img/pacman.png">`
    return nextLocation
}