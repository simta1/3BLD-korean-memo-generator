let cube;
let m2memo;
let r2memo;

function setup() {
    createCanvas(600, 600, WEBGL).style('border', '2px solid black').parent('left');
    camera(300, -300, 750, 0, 0, 0, 0, 1, 0);
    orbitControl();
    
	cube = new Cube();

    m2memo = createP('M2:<br>' + cube.getM2Memo()).style('font-family', "'JetBrains Mono', monospace").parent('right');
    r2memo = createP('R2:<br>' + cube.getR2Memo()).style('font-family', "'JetBrains Mono', monospace").parent('right');
    createButton('큐브 섞기').mousePressed(mixCube).parent('right');
}

function draw() {
	background(255);
	orbitControl();
	cube.run();

    noFill();
    stroke(0);
    rect(-width / 2, -height / 2, width, height);

    m2memo.html('M2:<br>' + cube.getM2Memo());
    r2memo.html('R2:<br>' + cube.getR2Memo());
}

function keyReleased() {
    if (key == 'z' || key == 'Z') cube.undoMove();
    else if (key == 'y' || key == 'Y') cube.redoMove();
    //
    else if (key == 'F') cube.applyMove(Move.F, false);
    else if (key == 'S') cube.applyMove(Move.S, false);
    else if (key == 'B') cube.applyMove(Move.B, false);
    else if (key == 'R') cube.applyMove(Move.R, false);
    else if (key == 'M') cube.applyMove(Move.M, false);
    else if (key == 'L') cube.applyMove(Move.L, false);
    else if (key == 'U') cube.applyMove(Move.U, false);
    else if (key == 'E') cube.applyMove(Move.E, false);
    else if (key == 'D') cube.applyMove(Move.D, false);
    //
    else if (key == 'f') cube.applyMove(Move.f, false);
    else if (key == 'b') cube.applyMove(Move.b, false);
    else if (key == 'r') cube.applyMove(Move.r, false);
    else if (key == 'l') cube.applyMove(Move.l, false);
    else if (key == 'u') cube.applyMove(Move.u, false);
    else if (key == 'd') cube.applyMove(Move.d, false);
}

function mixCube() {
    for (let cnt = 15; cnt--;) cube.applyMove(randomMove(), false);
}