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
    f: 9,
    b: 10,
    r: 11,
    l: 12,
    u: 13,
    d: 14,
}

const moves = Object.values(Move);
function randomMove() {
    return moves[Math.floor(Math.random() * moves.length)];
}