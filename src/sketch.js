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
    m2btn = createButton('M2R2 사용').mousePressed(applyM2R2).parent('right');
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
    // if (key == 'r') applyR2("고");
    // else if (key == 's') applyR2("노");
    // else if (key == 'e') applyR2("도");
    // else if (key == 'f') applyR2("로");
    // else if (key == 'a') applyR2("모");
    // else if (key == 'q') applyR2("보");
    // else if (key == 't') applyR2("소");
    // else if (key == 'd') applyR2("오");
    // else if (key == 'w') applyR2("조");
    // else if (key == 'c') applyR2("초");
    // else if (key == 'z') applyR2("코");

    // if (key == 'Z') cube.undoMove();
    // else if (key == 'Y') cube.redoMove();
    
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

function applyM2R2() {
    if (cube.isRotating()) return;

    if (!cube.m2Finished()) {
        let str = cube.getM2Memo().split("<br>")[0];
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
    else if (!cube.r2Finished()) {
        let str = cube.getR2Memo().split("<br>")[0];
        let [a, b] = str.split(',');
        b = b.split('(')[0];
        // console.log(a, b);
        
        // R-Slice
        let { first, middle, last } = decomposeKorean(b[0]);
        if (first === 'ㄹ') first = 'ㅅ';
        else if (first === 'ㅅ') first = 'ㄹ';
        b = composeKorean(first, middle, last) + b.slice(1);
        applyR2(a);
        applyR2(b);
    }
    else if (!cube.isSolved()) {
        applyPLL();
    }
}

function applyM2(m2piece) {
    for (let move of m2algorithm[m2piece]) cube.applyMove(move);
}

function applyR2(r2piece) {
    for (let move of r2algorithm[r2piece]) cube.applyMove(move);
}

function applyPLL() {
    for (let move of PLLalgorithm) cube.applyMove(move);
}