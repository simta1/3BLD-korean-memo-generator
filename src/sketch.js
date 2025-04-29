let cube;

function setup() {
    createCanvas(600, 600, WEBGL);
	cube = new Cube();
    
    createButton('큐브 섞기').mousePressed(mixCube);
    createP('현재 구현한 회전 : F, S, B, R, M, L, U, E, D, f, b, r, l, u, d');
}

function draw() {
	background(255);
	orbitControl();
	cube.run();
}

function keyReleased() {
    if (key == 'F') cube.applyMove(Move.F);
    else if (key == 'S') cube.applyMove(Move.S);
    else if (key == 'B') cube.applyMove(Move.B);
    else if (key == 'R') cube.applyMove(Move.R);
    else if (key == 'M') cube.applyMove(Move.M);
    else if (key == 'L') cube.applyMove(Move.L);
    else if (key == 'U') cube.applyMove(Move.U);
    else if (key == 'E') cube.applyMove(Move.E);
    else if (key == 'D') cube.applyMove(Move.D);
    //
    else if (key == 'f') cube.applyMove(Move.f);
    else if (key == 'b') cube.applyMove(Move.b);
    else if (key == 'r') cube.applyMove(Move.r);
    else if (key == 'l') cube.applyMove(Move.l);
    else if (key == 'u') cube.applyMove(Move.u);
    else if (key == 'd') cube.applyMove(Move.d);
}

function mixCube() {
    for (let cnt = 15; cnt--;) cube.applyMove(randomMove());
}