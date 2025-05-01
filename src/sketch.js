let cube;
let m2memo;
let r2memo;
let m2btn;

function setup() {
    createCanvas(600, 600, WEBGL).style('border', '2px solid black').parent('left');
    camera(300, -300, 750, 0, 0, 0, 0, 1, 0);
    orbitControl();
    
	cube = new Cube();

    m2memo = createP('M2:<br>' + cube.getM2Memo()).style('font-family', "'JetBrains Mono', monospace").parent('right');
    r2memo = createP('R2:<br>' + cube.getR2Memo()).style('font-family', "'JetBrains Mono', monospace").parent('right');
    createButton('큐브 섞기').mousePressed(mixCube).style('margin-left', '0px').parent('right');
    m2btn = createButton('M2 사용').mousePressed(applyM2memo).parent('right');
}

function draw() {
	background(255);
	orbitControl();
	cube.run();

    noFill();
    stroke(0);
    rect(-width / 2, -height / 2, width, height);

    if (!cube.isRotating()) {
        m2memo.html('M2:<br>' + cube.getM2Memo());
        r2memo.html('R2:<br>' + cube.getR2Memo());
    }
}

function keyReleased() {
    // if (key == 'r') applyM2("가+종");
    // else if (key == 's') applyM2("나+종");
    // else if (key == 'e') applyM2("다+종");
    // else if (key == 'f') applyM2("라+종");
    // else if (key == 'a') applyM2("마+종");
    // else if (key == 'q') applyM2("바+종");
    // else if (key == 't') applyM2("사+종");
    // else if (key == 'd') applyM2("아+종");
    // else if (key == 'w') applyM2("자+종");
    // else if (key == 'c') applyM2("차+종");
    // else if (key == 'z') applyM2("카+종");

    // if (key == 'Z') cube.undoMove();
    // else if (key == 'Y') cube.redoMove();
    //
    // else if (key == 'F') cube.applyMove(Move.F);
    // else if (key == 'S') cube.applyMove(Move.S);
    // else if (key == 'B') cube.applyMove(Move.B);
    // else if (key == 'R') cube.applyMove(Move.R);
    // else if (key == 'M') cube.applyMove(Move.M);
    // else if (key == 'L') cube.applyMove(Move.L);
    // else if (key == 'U') cube.applyMove(Move.U);
    // else if (key == 'E') cube.applyMove(Move.E);
    // else if (key == 'D') cube.applyMove(Move.D);
    // //
    // else if (key == 'f') cube.applyMove(Move.f);
    // else if (key == 'b') cube.applyMove(Move.b);
    // else if (key == 'r') cube.applyMove(Move.r);
    // else if (key == 'l') cube.applyMove(Move.l);
    // else if (key == 'u') cube.applyMove(Move.u);
    // else if (key == 'd') cube.applyMove(Move.d);
}

function mixCube() {
    for (let move of mixMoves(20 + Math.floor(Math.random() * 2))) cube.applyMove(move);
}

function applyM2memo() {
    if (cube.isRotating()) return;

    let str = cube.getM2Memo().split('<br>')[0];
    if (str.length == 0) return;
    let [a, b] = str.split(',');
    b = b.split('(')[0];
    // console.log(a, b);
    
    // M-Slice 고려
    let { first, middle, last } = decomposeKorean(b[0]);
    if (first === 'ㄹ') first = 'ㅊ';
    else if (first === 'ㅊ') first = 'ㄹ';
    b = composeKorean(first, middle, last) + b.slice(1);
    applyM2(a);
    applyM2(b);
}

function applyM2(m2piece) {
    for (let move of m2algorithm[m2piece]) cube.applyMove(move);
}