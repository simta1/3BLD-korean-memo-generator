let cube;
let M2memo;
let R2memo;
let slider;
let orientationHighlightToggle;

let scrambleInput, applyInputBtn;

function setup() {
    let canvas = createCanvas(600, 600, WEBGL).style('border', '2px solid black').parent('canvas');

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
        .style('width', '80px')
        .style('margin-top', '10px')
        .style('vertical-align', 'middle')
        .parent('bottom');

    slider.input(() => {
        rotatingAnimationLength = slider.value();
        sliderValueDisplay.html(`회전당 프레임 수 : ${rotatingAnimationLength}`);
    });

    sliderValueDisplay = createSpan(`회전당 프레임 수 : ${rotatingAnimationLength}`)
        .style('margin-top', '4px')
        .style('vertical-align', 'middle')
        .parent('bottom');

    setTimeout(() => {
        const canvasWidth = min(600, windowWidth - select('#right').elt.offsetWidth - 20);

        scrambleInput = createElement('textarea')
            .style('display', 'block')
            .style('resize', 'none')
            .style('width', `${canvasWidth}px`)
            .style('margin-top', '5px')
            .style('margin-bottom', '5px')
            .parent('bottom');

        applyInputBtn = createButton("스크램블 적용")
            .mousePressed(applyScramble)
            .style('margin-top', '0px')
            .parent('bottom');

        const canvasHeight = min(600, windowHeight - select('#bottom').elt.offsetHeight - 20);
        resizeCanvas(canvasWidth, canvasHeight);
    }, 0);
    
    console.log("테스트용 스크램블:\nB U2 L2 R2 U2 F D2 B F L' F D L2 F2 D L' U' F");
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
    // if (key == 'Z') cube.undoMove();
    // else if (key == 'Y') cube.redoMove();
}

function mixCube() {
    if (cube.isRotating()) {
        alert("큐브의 회전이 끝난 후 다시 시도해 주세요.");
        return;
    }

    for (let move of mixMoves(20 + Math.floor(Math.random() * 2))) cube.applyMove(move);
}

function applyM2R2() {
    if (cube.isRotating()) {
        alert("큐브의 회전이 끝난 후 다시 시도해 주세요.");
        return;
    }

    if (!cube.M2finished()) {
        let str = cube.getM2memo().split("<br>")[0];
        let [a, b] = str.split(',');
        b = b.split('(')[0];
        
        // M-Slice
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
    else {
        alert('이미 큐브가 맞춰진 상태입니다');
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

function applyScramble() {
    if (cube.isRotating()) {
        alert("큐브의 회전이 끝난 후 다시 시도해 주세요.");
        return;
    }

    const moves = [];
    for (let st of scrambleInput.value().replace(/\n/g, ' ').replace(/,/g, ' ').replace(/([A-Za-z])/g, ' $1').trim().split(/\s+/)) {
        if (st.length > 2 || (st.length > 1 && !"2'".includes(st[1]))) {
            alert(`입력 잘못됨: ${st}`);
            return;
        }

        let move;
        try {
            move = charToMove(st[0]);
        } catch (e) {
            alert(`${st} <- 입력 잘못됨
(가능한 회전 기호: F, B, R, L, U, D, f, b, r, l, u, d,
F', B', R', L', U', D', f', b', r', l', u', d',
F2, B2, R2, L2, U2, D2, f2, b2, r2, l2, u2, d2만 가능): `);
            return;
        }

        if (st.endsWith('2')) {
            moves.push(move);
            moves.push(move);
        }
        else {
            if (st.endsWith("'")) move += Move.F_;
            moves.push(move);
        }
    }

    for (let move of moves) cube.applyMove(move);
}