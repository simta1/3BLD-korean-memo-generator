let len = 50;

class Piece {
    constructor(x, y, z) {
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
        
        this.frontColor = z > 0 ? GREEN : BLACK;
        this.backColor = z < 0 ? BLUE : BLACK;
        this.rightColor = x > 0 ? RED : BLACK;
        this.leftColor = x < 0 ? ORANGE : BLACK;
        this.upColor = y < 0 ? WHITE : BLACK;
        this.downColor = y > 0 ? YELLOW : BLACK;
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
}