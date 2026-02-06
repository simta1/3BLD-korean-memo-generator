let cube;
let M2memo;
let R2memo;
let slider;
let sliderValueDisplay;
let orientationHighlightToggle;

let scrambleInput;

function setup() {
    let canvas = createCanvas(600, 600, WEBGL).parent('canvas');

    camera(300, -300, 750, 0, 0, 0, 0, 1, 0);
    orbitControl();
    cube = new Cube();

    M2memo = select('#M2memo');
    R2memo = select('#R2memo');
    orientationHighlightToggle = select('#orientToggle');
    slider = select('#rotatingSlider');
    sliderValueDisplay = select('#sliderValueDisplay');
    scrambleInput = select('#scrambleInput');

    select('#btnMix').mousePressed(mixCube);
    select('#btnM2R2').mousePressed(applyM2R2);
    select('#btnApplyScramble').mousePressed(applyScramble);

    orientationHighlightToggle.changed(() => {
        highlightMisorientedPieces = orientationHighlightToggle.checked();
    });

    slider.value(rotatingAnimationLength);
    sliderValueDisplay.html(`회전당 프레임 수 : ${rotatingAnimationLength}`);

    slider.input(() => {
        rotatingAnimationLength = slider.value();
        sliderValueDisplay.html(`회전당 프레임 수 : ${rotatingAnimationLength}`);
    });

    computeLayout();

    const ta = scrambleInput.elt;
    function autoGrow(el) {
        el.style.height = 'auto';
        el.style.height = Math.min(270, el.scrollHeight) + 'px';  // CSS max-height와 맞춤
    }
    autoGrow(ta);
    ta.addEventListener('input', function () { autoGrow(ta); });

    console.log("테스트용 스크램블:\nB U2 L2 R2 U2 F D2 B F L' F D L2 F2 D L' U' F");

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const checkbox = document.getElementById('settingsOpen');
            if (checkbox.checked) checkbox.checked = false;
        }
    });
}

function windowResized() {
    computeLayout();
}

function computeLayout() {
    const isStacked = window.matchMedia('(max-width: 960px)').matches;
    const availableHeight = windowHeight - 140;

    if (isStacked) {
        const wrapper = select('#canvas').elt;
        const contentW = Math.max(0, wrapper.clientWidth);
        const canvasW = Math.min(600, contentW);
        const canvasH = Math.min(canvasW, Math.max(300, availableHeight));
        resizeCanvas(canvasW, canvasH);
    }
    else {
        const panelRect = select('#right').elt.getBoundingClientRect();
        const canvasW = Math.min(600, windowWidth - panelRect.width - 60); // 60 for gap/margins
        const canvasH = Math.min(canvasW, Math.max(300, availableHeight));
        resizeCanvas(Math.max(0, canvasW), Math.max(0, canvasH));
    }
}

function settingsOpen() {
    const el = document.getElementById('settingsOpen');
    return !!(el && el.checked);
}

function draw() {
    background(255);
    if (!settingsOpen()) orbitControl();
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