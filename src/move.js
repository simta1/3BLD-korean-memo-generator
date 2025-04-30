const Move = {
    F: 0,
    B: 1,
    R: 2,
    L: 3,
    U: 4,
    D: 5,

    f: 6,
    b: 7,
    r: 8,
    l: 9,
    u: 10,
    d: 11,
    
    S: 12,
    M: 13,
    E: 14,
}

const moves = Object.values(Move);
function randomMove() {
    return moves[Math.floor(Math.random() * 6)];
}