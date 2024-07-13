import { checkWin } from "../Game/API";
import Color from "../types/Color";
import { getNextBoard } from "../Game/API";

interface MinMaxValue {
    score: number,
    move: number
}


export const getBestMove = (grid: Color[][], forPlayer: Color): number => {
   return minimax(grid, forPlayer, forPlayer).move
}


const minimax = (grid: Color[][], forPlayer: Color,  playerToMove: Color): MinMaxValue => {
    const winner = getWinner(grid)
    if (winner !== Color.NONE) {
        return {score: score(winner, playerToMove), move: -1}
    }

    const moves: number[] = []
    const scores: number[] = []

    const availableMoves = getAvailableMoves(grid)

    availableMoves.forEach(move => {
        const possibleGame: Color[][] = getNextBoard(grid, move, playerToMove);
        const nextPlayer: Color = Color.RED === playerToMove ? Color.YELLOW : Color.RED
        moves.push(move)
        scores.push(minimax(possibleGame, forPlayer, nextPlayer).score)
    })

    if (forPlayer === playerToMove) {
        let maxScore = -10000
        let maxScoreIdx: number = -1
        for (let i = 0; i < scores.length; i++) {
            if (scores[i] >= maxScore) {
                maxScore = scores[i]
                maxScoreIdx = i;
            }
        }
        return {score: maxScore, move: moves[maxScoreIdx]}
    } else {
        let minScore = +10000
        let minScoreIdx: number = -1
        for (let i = 0; i < scores.length; i++) {
            if (scores[i] <= minScore) {
                minScore = scores[i]
                minScoreIdx = i;
            }
        }
        return {score: minScore, move: moves[minScoreIdx]}
    }
}

const getAvailableMoves = (grid: Color[][]): number[] => {
    const moves: number[] = []
    grid.forEach((column, columnIndex) => {
        if (column.findIndex(i => i === Color.NONE)) {
            moves.push(columnIndex)
        }
    })
    return moves;
}

const score = (winner: Color, forPlayer: Color): number => {
    switch (winner) {
        case Color.NONE:
            return 0;
        case forPlayer:
            return 10;
        default:
            return -10;
    }
}

const getWinner = (grid: Color[][]): Color => {
    let winner = Color.NONE
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            winner = checkWin(grid, col, row);
            if (winner !== Color.NONE) {
                break;
            }
        }
        if (winner !== Color.NONE) {
            break;
        }
    }
    return winner;
}