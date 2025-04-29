let rotatingAnimationLength = 8;

class Cube {
    constructor() {
        this.pieces = [];
        this.moveQueue = [];
        this.rotating = false;
        
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    this.pieces.push(new Piece(x, y, z));
                }
            }
        }
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
            // console.log(this.rotatedAngle);
        }
        else if (this.moveQueue.length > 0) {
            const { move, isReverse } = this.moveQueue.shift();
            this.startMove(move, isReverse);
        }
    }

    display() {
        for (let piece of this.pieces) piece.display();
    }
    
    applyMove(move, isReverse) {
        if (!Object.values(Move).includes(move)) return;
        this.moveQueue.push({ move, isReverse });
    }

    startMove(move, isReverse) {
        switch (move) {
            case Move.F:
                this.rotatingPieces = this.pieces.filter(piece => piece.z > 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(angle * (isReverse ? -1 : 1));
                this.targetAngle = PI / 2;
                break;
            case Move.f:
                this.rotatingPieces = this.pieces.filter(piece => piece.z >= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(angle * (isReverse ? -1 : 1));
                this.targetAngle = PI / 2;
                break;
                
            case Move.S:
                this.rotatingPieces = this.pieces.filter(piece => piece.z == 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(angle * (isReverse ? -1 : 1));
                this.targetAngle = PI / 2;
                break;
                
            case Move.B:
                this.rotatingPieces = this.pieces.filter(piece => piece.z < 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(angle * (isReverse ? 1 : -1));
                this.targetAngle = PI / 2;
                break;
            case Move.b:
                this.rotatingPieces = this.pieces.filter(piece => piece.z <= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateZ(angle * (isReverse ? 1 : -1));
                this.targetAngle = PI / 2;
                break;
                
            case Move.R:
                this.rotatingPieces = this.pieces.filter(piece => piece.x > 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(angle * (isReverse ? -1 : 1));
                this.targetAngle = PI / 2;
                break;
            case Move.r:
                this.rotatingPieces = this.pieces.filter(piece => piece.x >= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(angle * (isReverse ? -1 : 1));
                this.targetAngle = PI / 2;
                break;
                
            case Move.M:
                this.rotatingPieces = this.pieces.filter(piece => piece.x == 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(angle * (isReverse ? 1 : -1));
                this.targetAngle = PI / 2;
                break;
                
            case Move.L:
                this.rotatingPieces = this.pieces.filter(piece => piece.x < 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(angle * (isReverse ? 1 : -1));
                this.targetAngle = PI / 2;
                break;
            case Move.l:
                this.rotatingPieces = this.pieces.filter(piece => piece.x <= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateX(angle * (isReverse ? 1 : -1));
                this.targetAngle = PI / 2;
                break;
                
            case Move.U:
                this.rotatingPieces = this.pieces.filter(piece => piece.y < 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(angle * (isReverse ? 1 : -1));
                this.targetAngle = PI / 2;
                break;
            case Move.u:
                this.rotatingPieces = this.pieces.filter(piece => piece.y <= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(angle * (isReverse ? 1 : -1));
                this.targetAngle = PI / 2;
                break;
                
            case Move.E:
                this.rotatingPieces = this.pieces.filter(piece => piece.y == 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(angle * (isReverse ? -1 : 1));
                this.targetAngle = PI / 2;
                break;
                
            case Move.D:
                this.rotatingPieces = this.pieces.filter(piece => piece.y > 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(angle * (isReverse ? -1 : 1));
                this.targetAngle = PI / 2;
                break;
            case Move.d:
                this.rotatingPieces = this.pieces.filter(piece => piece.y >= 0);
                this.rotatingFunction = (piece, angle) => piece.rotateY(angle * (isReverse ? -1 : 1));
                this.targetAngle = PI / 2;
                break;
        }

        this.rotating = true;
        this.rotatedAngle = 0;
        this.rotatingSpeed = this.targetAngle / rotatingAnimationLength;
    }
}