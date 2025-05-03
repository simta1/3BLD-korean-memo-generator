let rotatingAnimationLength = 8;

class Cube {
    constructor() {
        this.pieces = [];
        this.pendingMoves = [];
        this.undoStack = [];
        this.redoStack = [];
        this.rotating = false;
        
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    this.pieces.push(new Piece(x, y, z));
                }
            }
        }
        
        this.M2memo = "";
        this.R2memo = "";
    }
    
    run() {
        this.update();
        this.display();
    }

    update() {
        if (this.rotating) {
            if (this.rotatedAngle + this.rotatingSpeed < this.targetAngle) {
                for (const piece of this.rotatingPieces) this.rotatingFunction(piece, this.rotatingSpeed);
                this.rotatedAngle += this.rotatingSpeed;
            }
            else {
                const theta = this.targetAngle - this.rotatedAngle;
                for (const piece of this.rotatingPieces) this.rotatingFunction(piece, theta);
                for (const piece of this.rotatingPieces) piece.endMove();
                this.rotatedAngle = this.targetAngle;
                this.rotating = false;
            }
        }
        else if (this.pendingMoves.length > 0) {
            let move = this.pendingMoves.shift();
            this.startMove(move);
        }
    }

    display() {
        for (let piece of this.pieces) piece.display();
    }
    
    applyMove(move, isUndo = false, isRedo = false) {
        if (!Object.values(Move).includes(move)) throw new Error("회전기호 잘못됨: " + move);
        this.pendingMoves.push(move);

        if (isUndo) this.redoStack.push(move);
        else {
            this.undoStack.push(move);
            if (!isRedo) this.redoStack.length = 0;
        }
    }

    startMove(move) {
        switch (move) {
            case Move.F:
                this.rotatingPieces = this.pieces.filter(piece => piece.z > 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.F_:
                this.rotatingPieces = this.pieces.filter(piece => piece.z > 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(-angle);
                this.targetAngle = PI / 2;
                break;
            case Move.f:
                this.rotatingPieces = this.pieces.filter(piece => piece.z >= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.f_:
                this.rotatingPieces = this.pieces.filter(piece => piece.z >= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(-angle);
                this.targetAngle = PI / 2;
                break;
            case Move.S:
                this.rotatingPieces = this.pieces.filter(piece => piece.z == 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.S_:
                this.rotatingPieces = this.pieces.filter(piece => piece.z == 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(-angle);
                this.targetAngle = PI / 2;
                break;
            case Move.B:
                this.rotatingPieces = this.pieces.filter(piece => piece.z < 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(-angle);
                this.targetAngle = PI / 2;
                break;
            case Move.B_:
                this.rotatingPieces = this.pieces.filter(piece => piece.z < 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.b:
                this.rotatingPieces = this.pieces.filter(piece => piece.z <= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(-angle);
                this.targetAngle = PI / 2;
                break;
            case Move.b_:
                this.rotatingPieces = this.pieces.filter(piece => piece.z <= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.R:
                this.rotatingPieces = this.pieces.filter(piece => piece.x > 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.R_:
                this.rotatingPieces = this.pieces.filter(piece => piece.x > 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(-angle);
                this.targetAngle = PI / 2;
                break;
            case Move.r:
                this.rotatingPieces = this.pieces.filter(piece => piece.x >= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.r_:
                this.rotatingPieces = this.pieces.filter(piece => piece.x >= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(-angle);
                this.targetAngle = PI / 2;
                break;
            case Move.M:
                this.rotatingPieces = this.pieces.filter(piece => piece.x == 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(-angle);
                this.targetAngle = PI / 2;
                break;
            case Move.M_:
                this.rotatingPieces = this.pieces.filter(piece => piece.x == 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.L:
                this.rotatingPieces = this.pieces.filter(piece => piece.x < 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(-angle);
                this.targetAngle = PI / 2;
                break;
            case Move.L_:
                this.rotatingPieces = this.pieces.filter(piece => piece.x < 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.l:
                this.rotatingPieces = this.pieces.filter(piece => piece.x <= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(-angle);
                this.targetAngle = PI / 2;
                break;
            case Move.l_:
                this.rotatingPieces = this.pieces.filter(piece => piece.x <= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.U:
                this.rotatingPieces = this.pieces.filter(piece => piece.y < 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(-angle);
                this.targetAngle = PI / 2;
                break;
            case Move.U_:
                this.rotatingPieces = this.pieces.filter(piece => piece.y < 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.u:
                this.rotatingPieces = this.pieces.filter(piece => piece.y <= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(-angle);
                this.targetAngle = PI / 2;
                break;
            case Move.u_:
                this.rotatingPieces = this.pieces.filter(piece => piece.y <= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.E:
                this.rotatingPieces = this.pieces.filter(piece => piece.y == 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.E_:
                this.rotatingPieces = this.pieces.filter(piece => piece.y == 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(-angle);
                this.targetAngle = PI / 2;
                break;
            case Move.D:
                this.rotatingPieces = this.pieces.filter(piece => piece.y > 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.D_:
                this.rotatingPieces = this.pieces.filter(piece => piece.y > 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(-angle);
                this.targetAngle = PI / 2;
                break;
            case Move.d:
                this.rotatingPieces = this.pieces.filter(piece => piece.y >= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(angle);
                this.targetAngle = PI / 2;
                break;
            case Move.d_:
                this.rotatingPieces = this.pieces.filter(piece => piece.y >= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(-angle);
                this.targetAngle = PI / 2;
                break;
        }

        this.rotating = true;
        this.rotatedAngle = 0;
        this.rotatingSpeed = this.targetAngle / rotatingAnimationLength;
    }

    undoMove() {
        if (this.undoStack.length == 0) return;
        let move = this.undoStack.pop();
        this.applyMove(inverseMove(move), true);
    }

    redoMove() {
        if (this.redoStack.length == 0) return;
        let move = this.redoStack.pop();
        this.applyMove(inverseMove(move), false, true);
    }
    
    getM2memo() {
        if (!this.rotating) {
            let edgePieces = this.pieces.filter(piece => piece.isEdgePiece() && !(piece.isSolved()));
            let M2 = [];
            
            let bufferX = 0, bufferY = 1, bufferZ = 1;
            let x = bufferX, y = bufferY, z = bufferZ;
            
            const checked = new Array(27).fill(0);
            while (true) {
                const piece = this.pieces.find(piece => piece.x == x && piece.y == y && piece.z == z);

                if (piece.isNotBuffer()) M2.push({ pieceName: piece.getName(), sorted: piece.isCorrectOrientation() });
                checked[piece.getIdx()] = true;
                x = piece.origx;
                y = piece.origy;
                z = piece.origz;

                if (x == bufferX && y == bufferY && z == bufferZ) { // 버퍼 막힘
                    const piece = edgePieces.find(piece => !checked[piece.getIdx()]);
                    if (piece) {
                        M2.push({ pieceName: piece.getName(), sorted: true });
                        bufferX = x = piece.origx;
                        bufferY = y = piece.origy;
                        bufferZ = z = piece.origz;
                    }
                    else break;
                }
            }
            
            this.M2memo = "";
            let cnt = 0;
            let prevSorted = true;
            for (let { pieceName, sorted } of M2) {
                let str = composeKorean(pieceName, 'ㅏ');
                if (!prevSorted) sorted ^= 1;
                if (!sorted) str += "+종";
                prevSorted = sorted;
                this.M2memo += str;
                if (++cnt & 1) this.M2memo += ",";
                else this.M2memo += "<br>";
            }
            if (cnt & 1) this.M2memo += "나(PLL 예외형)"
        }

        return this.M2memo;
    }
    
    getR2memo() {
        if (!this.rotating) {
            let cornerPieces = this.pieces.filter(piece => piece.isCornerPiece() && !(piece.isSolved()));
            let R2 = [];
            
            let bufferX = 1, bufferY = 1, bufferZ = 1;
            let x = bufferX, y = bufferY, z = bufferZ;
            
            const checked = new Array(27).fill(0);
            while (true) {
                const piece = this.pieces.find(piece => piece.x == x && piece.y == y && piece.z == z);

                if (piece.isNotBuffer()) R2.push({ pieceName: piece.getName(), orientation: piece.getCornerOrientation() });
                checked[piece.getIdx()] = true;
                x = piece.origx;
                y = piece.origy;
                z = piece.origz;

                if (x == bufferX && y == bufferY && z == bufferZ) { // 버퍼 막힘
                    const piece = cornerPieces.find(piece => !checked[piece.getIdx()]);
                    if (piece) {
                        R2.push({ pieceName: piece.getName(), orientation: 0 });
                        bufferX = x = piece.origx;
                        bufferY = y = piece.origy;
                        bufferZ = z = piece.origz;
                    }
                    else break;
                }
            }
            
            this.R2memo = "";
            let cnt = 0;
            let prevPieceName;
            let prevOri = 0;
            for (let { pieceName, orientation } of R2) {
                if (prevOri) {
                    dist = getDist(prevPieceName, pieceName);
                    orientation += prevOri * ((dist & 1) ? -1 : 1);
                    orientation = (orientation + 3) % 3;
                }

                let str = composeKorean(pieceName, orientation == 0 ? 'ㅗ' : 'ㅏ');
                if (orientation == 2) str += "+종";
                prevPieceName = pieceName;
                prevOri = orientation;
                this.R2memo += str;
                if (++cnt & 1) this.R2memo += ",";
                else this.R2memo += "<br>";
            }
            if (cnt & 1) this.R2memo += "도(PLL 예외형)"
        }

        return this.R2memo;
    }

    isRotating() {
        return this.rotating || this.pendingMoves.length > 0;
    }

    M2finished() {
        this.getM2memo();
        return this.M2memo.length == 0 || this.M2memo.split("<br>")[0] == "나,나(PLL 예외형)"; // M2 끝났거나 pll 예외형만 남은 경우
    }

    R2finished() {
        this.getR2memo();
        return this.R2memo.length == 0 || this.R2memo.split("<br>")[0] == "도,도(PLL 예외형)"; // R2 끝났거나 pll 예외형만 남은 경우
    }

    isSolved() {
        return this.pieces.every(piece => piece.isSolved());
    }
}