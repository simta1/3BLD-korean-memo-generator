class Cube {
    constructor() {
        this.pieces = [];
        
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    this.pieces.push(new Piece(x, y, z));
                }
            }
        }
    }

    display() {
        for (let piece of this.pieces) piece.display();
    }
    
    applyMove(move) {
        switch (move) {
            case Move.F:
                
                break;
                
            case Move.F_PRIME:
                
                break;
                
            case Move.F2:
                
                break;
                
            case Move.S:
                
                break;
                
            case Move.S_PRIME:
                
                break;
                
            case Move.S2:
                
                break;
                
            case Move.B:
                
                break;
                
            case Move.B_PRIME:
                
                break;
                
            case Move.B2:
                
                break;
                
            case Move.R:
                
                break;
                
            case Move.R_PRIME:
                
                break;
                
            case Move.R2:
                
                break;
                
            case Move.M:
                
                break;
                
            case Move.M_PRIME:
                
                break;
                
            case Move.M2:
                
                break;
                
            case Move.L:
                
                break;
                
            case Move.L_PRIME:
                
                break;
                
            case Move.L2:
                
                break;
                
            case Move.U:
                
                break;
                
            case Move.U_PRIME:
                
                break;
                
            case Move.U2:
                
                break;
                
            case Move.E:
                
                break;
                
            case Move.E_PRIME:
                
                break;
                
            case Move.E2:
                
                break;
                
            case Move.D:
                
                break;
                
            case Move.D_PRIME:
                
                break;
                
            case Move.D2:
                
                break;
                

        }
    }
}