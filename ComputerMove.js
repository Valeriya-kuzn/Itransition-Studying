class СomputerMove {

    constructor(moves) {
        this.moves = moves;
    }

    showComputerMove() {
       return Math.floor(Math.random() * this.moves.length);
    }
}

module.exports = СomputerMove;