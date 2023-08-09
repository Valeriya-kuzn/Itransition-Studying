const Table = require('cli-table3');

class Help {

    constructor(moves) {
        this.moves = moves;
    }

    showHelp() {
        const table = new Table({
            head: ['PC \\ User', ...this.moves],
        });
        
        let result = [];
        let variation = (this.moves.length - 1) / 2;
        result.push('Draw');
        for (let i = 0; i < variation; i++) {
            result.push('Win');
        }        
        for (let j = 0; j < variation; j++) {
            result.push('Lose');
        }
        let helpString = [this.moves[0], ...result]
        table.push(helpString);

        for (let g = 1; g < this.moves.length; g++) {
            result.unshift(result.pop());
            helpString = [this.moves[g], ...result]
            table.push(helpString);
        }
        console.log(table.toString());
        console.log("Results are presented from the user's point of view");
    }
}

module.exports = Help;