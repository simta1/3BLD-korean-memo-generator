const M2algorithm = {
    "가": [Move.L, Move.U_, Move.L_, Move.U, Move.M_, Move.M_, Move.U_, Move.L, Move.U, Move.L_ ],
    "나": [Move.M_, Move.M_],
    "다": [Move.R_, Move.U, Move.R, Move.U_, Move.M_, Move.M_, Move.U, Move.R_, Move.U_, Move.R],
    "라": [Move.U_, Move.U_, Move.M_, Move.U_, Move.U_, Move.M_],
    "마": [Move.U_, Move.L_, Move.U, Move.M_, Move.M_, Move.U_, Move.L, Move.U],
    "바": [Move.U_, Move.L, Move.U, Move.M_, Move.M_, Move.U_, Move.L_, Move.U],
    "사": [Move.U, Move.R_, Move.U_, Move.M_, Move.M_, Move.U, Move.R, Move.U_],
    "아": [Move.U, Move.R, Move.U_, Move.M_, Move.M_, Move.U, Move.R_, Move.U_],
    "자": [Move.U_, Move.L, Move.L, Move.U, Move.M_, Move.M_, Move.U_, Move.L, Move.L, Move.U],
    "차": [Move.M, Move.U_, Move.U_, Move.M, Move.U_, Move.U_],
    "카": [Move.U, Move.R, Move.R, Move.U_, Move.M_, Move.M_, Move.U, Move.R, Move.R, Move.U_],
    "가+종": [Move.B, Move.L_, Move.B_, Move.M_, Move.M_, Move.B, Move.L, Move.B_],
    "나+종": [Move.U_, Move.M_, Move.U_, Move.M_, Move.U_, Move.M_, Move.U_, Move.M, Move.U_, Move.M_, Move.U_, Move.M_, Move.U_, Move.M_, Move.U_, Move.M_],
    "다+종": [Move.B_, Move.R, Move.B, Move.M_, Move.M_, Move.B_, Move.R_, Move.B],
    "라+종": [Move.D, Move.M_, Move.U, Move.R, Move.R, Move.U_, Move.M, Move.U, Move.R, Move.R, Move.U_, Move.D_, Move.M_, Move.M_],
    "마+종": [Move.B, Move.L, Move.L, Move.B_, Move.M_, Move.M_, Move.B, Move.L, Move.L, Move.B_],
    "바+종": [Move.r_, Move.U, Move.L, Move.U_, Move.M_, Move.M_, Move.U, Move.L_, Move.U_, Move.r],
    "사+종": [Move.l, Move.U_, Move.R_, Move.U, Move.M_, Move.M_, Move.U_, Move.R, Move.U, Move.l_],
    "아+종": [Move.B_, Move.R, Move.R, Move.B, Move.M_, Move.M_, Move.B_, Move.R, Move.R, Move.B],
    "자+종": [Move.B, Move.L, Move.B_, Move.M_, Move.M_, Move.B, Move.L_, Move.B_],
    "차+종": [Move.M_, Move.M_, Move.D, Move.U, Move.R, Move.R, Move.U_, Move.M_, Move.U, Move.R, Move.R, Move.U_, Move.M, Move.D_],
    "카+종": [Move.B_, Move.R_, Move.B, Move.M_, Move.M_, Move.B_, Move.R, Move.B]
};

const R2algorithm = {
    "고": [Move.L, Move.U_, Move.L_, Move.U, Move.L_, Move.U_, Move.L, Move.U, Move.R, Move.R, Move.U_, Move.L_, Move.U, Move.L, Move.U_, Move.L, Move.U, Move.L_],
    "노": [Move.L_, Move.U_, Move.L, Move.U, Move.R, Move.R, Move.U_, Move.L_, Move.U, Move.L],
    "도": [Move.R, Move.R],
    "로": [Move.U_, Move.R, Move.F_, Move.r, Move.U, Move.R, Move.R, Move.U_, Move.r_, Move.F, Move.R, Move.U, Move.R, Move.R],
    "모": [Move.U_, Move.L, Move.L, Move.U, Move.R, Move.R, Move.U_, Move.L, Move.L, Move.U],
    "보": [Move.U_, Move.L, Move.L, Move.U, Move.L_, Move.U_, Move.L, Move.U, Move.R, Move.R, Move.U_, Move.L_, Move.U, Move.L, Move.U_, Move.L, Move.L, Move.U],
    "소": [Move.R, Move.R, Move.U_, Move.R_, Move.F_, Move.r, Move.U, Move.R, Move.R, Move.U_, Move.r_, Move.F, Move.R_, Move.U],
    "가": [Move.L_, Move.U_, Move.L_, Move.U, Move.R, Move.R, Move.U_, Move.L, Move.U, Move.L],
    "나": [Move.U_, Move.L_, Move.U, Move.R, Move.R, Move.U_, Move.L, Move.U],
    "다": [Move.U_, Move.L, Move.U, Move.L_, Move.U_, Move.L, Move.U, Move.R, Move.R, Move.U_, Move.L_, Move.U, Move.L, Move.U_, Move.L_, Move.U],
    "라": [Move.F_, Move.R, Move.U, Move.R, Move.R, Move.U_, Move.R_, Move.F, Move.R, Move.U, Move.R, Move.R, Move.U_, Move.R],
    "마": [Move.L_, Move.L_, Move.U_, Move.L_, Move.U, Move.R, Move.R, Move.U_, Move.L, Move.U, Move.L, Move.L],
    "바": [Move.L, Move.U_, Move.L_, Move.U, Move.R, Move.R, Move.U_, Move.L, Move.U, Move.L_],
    "사": [Move.R_, Move.U, Move.R, Move.R, Move.U_, Move.R_, Move.F_, Move.R, Move.U, Move.R, Move.R, Move.U_, Move.R_, Move.F],
    "가+종": [Move.R_, Move.U, Move.L, Move.U_, Move.R, Move.R, Move.U, Move.L_, Move.U_, Move.R],
    "나+종": [Move.B, Move.U, Move.B, Move.B, Move.U_, Move.B_, Move.R, Move.R, Move.B, Move.U, Move.B, Move.B, Move.U_, Move.B_],
    "다+종": [Move.U_, Move.L_, Move.U, Move.L, Move.U_, Move.L_, Move.U, Move.R, Move.R, Move.U_, Move.L, Move.U, Move.L_, Move.U_, Move.L, Move.U],
    "라+종": [Move.R_, Move.D, Move.U, Move.r, Move.r, Move.U_, Move.R_, Move.U, Move.r, Move.r, Move.D_, Move.R, Move.U_, Move.R_],
    "마+종": [Move.U_, Move.L_, Move.U, Move.L_, Move.U_, Move.L, Move.U, Move.R, Move.R, Move.U_, Move.L_, Move.U, Move.L, Move.U_, Move.L, Move.U],
    "바+종": [Move.U_, Move.L, Move.U, Move.R, Move.R, Move.U_, Move.L_, Move.U],
    "사+종": [Move.R, Move.U, Move.R_, Move.D, Move.r, Move.r, Move.U_, Move.R, Move.U, Move.r, Move.r, Move.U_, Move.D_, Move.R]
};

const PLLalgorithm = [
    Move.F, Move.F, // 셋업무브
    Move.R_, Move.U, Move.R, Move.U_, Move.R_, Move.F_, Move.U_, Move.F, Move.R, Move.U, Move.R_, Move.F, Move.R_, Move.F_, Move.R, Move.U_, Move.R, // PLL (N Perm)
    Move.U, Move.U, // n perm 정렬
    Move.F, Move.F // 역셋업무브
];