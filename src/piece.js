let len = 50;

class Piece {
    constructor(x, y, z) {
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
    }

    display() {
        strokeWeight(1);
        stroke(0);

        push();
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
        pop();
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
    }
}