const Move = {
    F: 0,
    B: 1,
    R: 2,
    L: 3,
    U: 4,
    D: 5,
    f: 6, //
    b: 7,
    r: 8,
    l: 9,
    u: 10,
    d: 11,
    S: 12, //
    M: 13,
    E: 14,
    
    F_: 15,
    B_: 16,
    R_: 17,
    L_: 18,
    U_: 19,
    D_: 20,
    f_: 21,
    b_: 22,
    r_: 23,
    l_: 24,
    u_: 25,
    d_: 26,
    S_: 27,
    M_: 28,
    E_: 29,

    // F2: 30,
    // B2: 31,
    // R2: 32,
    // L2: 33,
    // U2: 34,
    // D2: 35,
    // f2: 36,
    // b2: 37,
    // r2: 38,
    // l2: 39,
    // u2: 40,
    // d2: 41,
    // S2: 42,
    // M2: 43,
    // E2: 44,
}

function charToMove(ch) {
    let idx = "FBRLUDfbrlud".indexOf(ch);
    if (idx === -1) throw new Error(`회전기호 잘못됨: ${ch}`);
    return idx;
}

function inverseMove(move) {
    switch (move) {
        case Move.F: return Move.F_;
        case Move.B: return Move.B_;
        case Move.R: return Move.R_;
        case Move.L: return Move.L_;
        case Move.U: return Move.U_;
        case Move.D: return Move.D_;
        case Move.f: return Move.f_;
        case Move.b: return Move.b_;
        case Move.r: return Move.r_;
        case Move.l: return Move.l_;
        case Move.u: return Move.u_;
        case Move.d: return Move.d_;
        case Move.S: return Move.S_;
        case Move.M: return Move.M_;
        case Move.E: return Move.E_;

        case Move.F_: return Move.F;
        case Move.B_: return Move.B;
        case Move.R_: return Move.R;
        case Move.L_: return Move.L;
        case Move.U_: return Move.U;
        case Move.D_: return Move.D;
        case Move.f_: return Move.f;
        case Move.b_: return Move.b;
        case Move.r_: return Move.r;
        case Move.l_: return Move.l;
        case Move.u_: return Move.u;
        case Move.d_: return Move.d;
        case Move.S_: return Move.S;
        case Move.M_: return Move.M;
        case Move.E_: return Move.E;

        // case Move.F2: case Move.B2: case Move.R2: case Move.L2: case Move.U2: case Move.D2: case Move.f2: case Move.b2: case Move.r2: case Move.l2: case Move.u2: case Move.d2: case Move.S2: case Move.M2: case Move.E2: return move;

        default: throw new Error("회전기호 잘못됨: " + move);
    }
}

const moves = Object.values(Move);
function mixMoves(cnt = 20) {
    return Array.from({ length: cnt }, () => moves[Math.floor(Math.random() * 6)]);
}