let cube;
let M2memo;
let R2memo;
let slider;
let orientationHighlightToggle;

function setup() {
    let canvas = createCanvas(600, 600, WEBGL).style('border', '2px solid black').parent('canvas');
    select('#bottom').style('width', `${canvas.elt.offsetWidth}px`);

    camera(300, -300, 750, 0, 0, 0, 0, 1, 0);
    orbitControl();
	cube = new Cube();

    M2memo = select('#M2memo');
    R2memo = select('#R2memo');

    createButton('큐브 섞기')
        .mousePressed(mixCube)
        .style('margin-left', '0px')
        .style('display', 'block')
        .parent('right');

    createButton('M2R2 사용')
        .mousePressed(applyM2R2)
        .style('margin-left', '0px')
        .parent('right');

    orientationHighlightToggle = createCheckbox('오리엔테이션 강조 표시', highlightMisorientedPieces)
        .style('margin-top', '3px')
        .parent('bottom');

    orientationHighlightToggle.changed(() => {
        highlightMisorientedPieces = orientationHighlightToggle.checked();
    });

    slider = createSlider(1, 60, rotatingAnimationLength, 1)
        .style('width', '200px')
        .style('margin-top', '10px')
        .style('display', 'block')
        .parent('bottom');

    slider.input(() => {
        rotatingAnimationLength = slider.value();
        sliderValueDisplay.html(`회전당 프레임 수 : ${rotatingAnimationLength}`);
    });

    sliderValueDisplay = createSpan(`회전당 프레임 수 : ${rotatingAnimationLength}`)
        .style('margin-top', '4px')
        .parent('bottom');

    setTimeout(() => {
        const canvasWidth = min(600, windowWidth - select('#right').elt.offsetWidth - 20);
        const canvasHeight = min(600, windowHeight - select('#bottom').elt.offsetHeight - 20);
        resizeCanvas(canvasWidth, canvasHeight);
    }, 0);
}

function draw() {
    background(255);
    orbitControl();
    cube.run();

    // noFill();
    // stroke(0);
    // rect(-width / 2, -height / 2, width, height);

    if (!cube.isRotating()) {
        M2memo.html('M2:<br>' + cube.getM2memo());
        R2memo.html('R2:<br>' + cube.getR2memo());
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
    if (cube.isRotating()) return;

    for (let move of mixMoves(20 + Math.floor(Math.random() * 2))) cube.applyMove(move);
}

function applyM2R2() {
    if (cube.isRotating()) return;

    if (!cube.M2finished()) {
        let str = cube.getM2memo().split("<br>")[0];
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
    else if (!cube.R2finished()) {
        let str = cube.getR2memo().split("<br>")[0];
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

function applyM2(M2piece) {
    for (let move of M2algorithm[M2piece]) cube.applyMove(move);
}

function applyR2(R2piece) {
    for (let move of R2algorithm[R2piece]) cube.applyMove(move);
}

function applyPLL() {
    for (let move of PLLalgorithm) cube.applyMove(move);
}