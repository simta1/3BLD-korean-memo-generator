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
    s: 10,
    b: 11,
    r: 12,
    m: 13,
    l: 14,
    u: 15,
    e: 16,
    d: 17,
}

const moves = Object.values(Move);
function randomMove() {
    return moves[Math.floor(Math.random() * moves.length)];
}