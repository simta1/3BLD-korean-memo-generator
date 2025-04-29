const Move = {
    F: 0,
    S: 1,
    B: 2,
    R: 3,
    M: 4,
    L: 5,
    U: 6,
    E: 7,
    D: 8,
}

const moves = Object.values(Move);
function randomMove() {
    return moves[Math.floor(Math.random() * moves.length)];
}