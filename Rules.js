class Rules {

    constructor(moves) {
        this.moves = moves;
    }

    checkInput() {
        let inputSet = new Set();
        for (let value of this.moves) {
            inputSet.add(value);
        }
        if (this.moves.length < 3) {
            console.log ('Please, enter more than 2 moves');
            return false;
        } else if (this.moves.length % 2 === 0) {
            console.log ('Please, enter an odd number of steps');
            return false;
        } else if (this.moves.length > inputSet.size) {
            console.log ('Please, enter non-repeating moves sequence');
            return false;
        }
        return true;
    }

    checkUserMove(userMove, returnTable) {
        if (userMove !== '0' && userMove !== '?' && userMove < 1 || userMove > this.moves.length) {
            console.log('Please, enter number from table above');
        } else if (userMove === '0') {
            process.exit(1);
        } else if (userMove === '?') {
            returnTable;
        }
        return;
    }

    showWinner(pcMove, userMove) {
        let variation = (this.moves.length - 1) / 2;
        let endLength = this.moves.length - (pcMove + 1);
        if (pcMove === userMove - 1) {
            console.log('Draw');
        } else if (endLength >= variation) {
            let losses = this.moves.slice(pcMove + 1, pcMove + variation + 1);
            if (losses.includes(this.moves[userMove - 1])) {
                console.log('You win!');
                return;
            }
            console.log('You lose!:(');
            return;
        } else {
            let victories = this.moves.slice(pcMove - variation, pcMove);
            if (victories.includes(this.moves[userMove - 1])) {
                console.log('You lose!:(');
                return;
            }
            console.log('You win!');
            return;
        }
    }
}

module.exports = Rules;