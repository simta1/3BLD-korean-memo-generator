let cube;

function setup() {
    createCanvas(600, 600, WEBGL);
	cube = new Cube();
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
}