let len = 50;
const pieceName = "ㄴㄱㄱㅂcㅁㅂㅈㅁㄴcㄹcxcㅊcbㄷㄷㄹㅅcㅇㅅㅋb"; // c: 센터조각 x: 큐브중심 b: 버퍼
let highlightMisorientedPieces = false;

class Piece {
    constructor(x, y, z) {
        this.origx = x;
        this.origy = y;
        this.origz = z;

        this.x = x;
        this.y = y;
        this.z = z;

        this.vertices = [
            [(x - 1 / 2) * len, (y - 1 / 2) * len, (z - 1 / 2) * len],
            [(x - 1 / 2) * len, (y - 1 / 2) * len, (z + 1 / 2) * len],
            [(x - 1 / 2) * len, (y + 1 / 2) * len, (z - 1 / 2) * len],
            [(x - 1 / 2) * len, (y + 1 / 2) * len, (z + 1 / 2) * len],
            [(x + 1 / 2) * len, (y - 1 / 2) * len, (z - 1 / 2) * len],
            [(x + 1 / 2) * len, (y - 1 / 2) * len, (z + 1 / 2) * len],
            [(x + 1 / 2) * len, (y + 1 / 2) * len, (z - 1 / 2) * len],
            [(x + 1 / 2) * len, (y + 1 / 2) * len, (z + 1 / 2) * len]
        ];
        
        this.frontColor = z > 0 ? GREEN : BLACK; // F
        this.backColor = z < 0 ? BLUE : BLACK; // B
        this.rightColor = x > 0 ? RED : BLACK; // R
        this.leftColor = x < 0 ? ORANGE : BLACK; // L
        this.upColor = y < 0 ? WHITE : BLACK; // U
        this.downColor = y > 0 ? YELLOW : BLACK; // D

        this.colors = [
            this.frontColor,
            this.backColor,
            this.rightColor,
            this.leftColor,
            this.upColor,
            this.downColor
        ].filter(color => color !== BLACK);
    }

    display() {
        if (highlightMisorientedPieces && !this.isCorrectOrientation()) {
            strokeWeight(10);
            stroke(...PURPLE);
        }
        else {
            strokeWeight(1);
            stroke(0);
        }

        beginShape(QUADS);
            fill(...this.frontColor); // 앞면 // z > 0
            vertex(...this.vertices[1]);
            vertex(...this.vertices[3]);
            vertex(...this.vertices[7]);
            vertex(...this.vertices[5]);
        
            fill(...this.backColor); // 뒷면 // z < 0
            vertex(...this.vertices[0]);
            vertex(...this.vertices[2]);
            vertex(...this.vertices[6]);
            vertex(...this.vertices[4]);
        
            fill(...this.rightColor); // 오른쪽면 // x > 0
            vertex(...this.vertices[4]);
            vertex(...this.vertices[5]);
            vertex(...this.vertices[7]);
            vertex(...this.vertices[6]);
        
            fill(...this.leftColor); // 왼쪽면 // x < 0
            vertex(...this.vertices[0]);
            vertex(...this.vertices[1]);
            vertex(...this.vertices[3]);
            vertex(...this.vertices[2]);
        
            fill(...this.upColor); // 윗면 // y < 0
            vertex(...this.vertices[0]);
            vertex(...this.vertices[1]);
            vertex(...this.vertices[5]);
            vertex(...this.vertices[4]);
        
            fill(...this.downColor); // 아랫면 // y > 0
            vertex(...this.vertices[2]);
            vertex(...this.vertices[3]);
            vertex(...this.vertices[7]);
            vertex(...this.vertices[6]);
        endShape();
    }

    rotateX(theta) {
        const c = cos(theta);
        const s = sin(theta);

        for (let v of this.vertices) {
            let [x, y, z] = v;
            v[1] = y * c - z * s;
            v[2] = y * s + z * c;
        }

        let py = this.y;
        let pz = this.z;
        this.y = py * c - pz * s;
        this.z = py * s + pz * c;
    }
    
    rotateY(theta) {
        const c = cos(theta);
        const s = sin(theta);
    
        for (let v of this.vertices) {
            let [x, y, z] = v;
            v[0] = x * c + z * s;
            v[2] = -x * s + z * c;
        }

        let px = this.x;
        let pz = this.z;
        this.x = px * c + pz * s;
        this.z = -px * s + pz * c;
    }

    rotateZ(theta) {
        const c = cos(theta);
        const s = sin(theta);
    
        for (let v of this.vertices) {
            let [x, y, z] = v;
            v[0] = x * c - y * s;
            v[1] = x * s + y * c;
        }
        
        let px = this.x;
        let py = this.y;
        this.x = px * c - py * s;
        this.y = px * s + py * c;
    }

    endMove() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        for (let v of this.vertices) {
            v[0] = Math.round(v[0]);
            v[1] = Math.round(v[1]);
            v[2] = Math.round(v[2]);
        }
    }

    getName() {
        return pieceName[this.getIdx()];
    }
    
    getIdx() {
        return 9 * (this.origx + 1) + 3 * (this.origy + 1) + (this.origz + 1);
    }

    isEdgePiece() {
        return this.colors.length == 2;
    }

    isCornerPiece() {
        return this.colors.length == 3;
    }
    
    isNotBuffer() {
        return this.getName() != 'b';
    }
    
    isCorrectPermutation() {
        return this.x === this.origx && this.y === this.origy && this.z === this.origz;
    }
    
    isCorrectOrientation() {
        if (this.isEdgePiece()) {
            let targetVertices;
            if (this.colors.includes(WHITE)) targetVertices = [this.vertices[0], this.vertices[1], this.vertices[5], this.vertices[4]];
            else if (this.colors.includes(YELLOW)) targetVertices = [this.vertices[2], this.vertices[3], this.vertices[7], this.vertices[6]];
            else if (this.colors.includes(GREEN)) targetVertices = [this.vertices[1], this.vertices[3], this.vertices[7], this.vertices[5]];
            else targetVertices = [this.vertices[0], this.vertices[2], this.vertices[6], this.vertices[4]]; // BLUE
        
            if (this.y > 0) return targetVertices.every(v => v[1] > this.y * len);
            if (this.y < 0) return targetVertices.every(v => v[1] < this.y * len);
            if (this.z > 0) return targetVertices.every(v => v[2] > this.z * len);
            return targetVertices.every(v => v[2] < this.z * len); // this.z < 0
        }
        if (this.isCornerPiece()) {
            let targetVertices;
            if (this.colors.includes(WHITE)) targetVertices = [this.vertices[0], this.vertices[1], this.vertices[5], this.vertices[4]];
            else targetVertices = [this.vertices[2], this.vertices[3], this.vertices[7], this.vertices[6]]; // YELLOW
            
            if (this.y > 0) return targetVertices.every(v => v[1] > this.y * len);
            return targetVertices.every(v => v[1] < this.y * len); // this.y < 0
        }
        return true;
    }

    isSolved() {
        return this.isCorrectPermutation() && this.isCorrectOrientation();
    }
    
    getCornerOrientation() {
        let indices = "";
        if (this.y > 0) {
            for (let i = 0; i < 8; i++) if (this.vertices[i][1] > this.y * len) indices += i;
        }
        else { // this.y < 0
            for (let i = 0; i < 8; i++) if (this.vertices[i][1] < this.y * len) indices += i;
        }
        if (indices == "0145" || indices == "2367") return 0; // 하양 or 노랑
        if (indices == "0123" || indices == "4567") return 1; // 주황 or 빨강
        return 2; // 초록 or 파랑
    }
}

facePieces = [
    ["ㄱㄴㄷㄹ", "ㅁㅂㅅ"], // 윗면 / 아랫면
    ["ㄱㄴㅁㅂ", "ㄷㄹㅅ"], // 왼쪽면 / 오른쪽면
    ["ㄱㄹㅁ", "ㄴㄷㅂㅅ"] // 앞면 / 뒷면
];

function getDist(pieceName1, pieceName2) {
    let res = 0;
    for (let [a, b] of facePieces) res += a.includes(pieceName1) && b.includes(pieceName2) || a.includes(pieceName2) && b.includes(pieceName1);
    return res;
}