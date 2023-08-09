const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ComputerMove = require('./ComputerMove');
const GenerationHMAC = require('./GenerationHMAC');
const Rules = require('./rules');
const Help = require('./help');

let moves = process.argv.slice(2);

let checkRules = new Rules(moves);
if (!checkRules.checkInput(moves)) {
    process.exit(1);
};

let pcMove = new ComputerMove(moves).showComputerMove();
let pcMoveText = moves[pcMove];

let objectHMAC = new GenerationHMAC(pcMoveText);
let keyHMAC = objectHMAC.generateKey();
let HMAC = objectHMAC.generateHMAC();

console.log(`HMAC: ${HMAC}`);
console.log('Available moves:');
console.table(['EXIT', ...moves]);
console.log(`Press '?' for help`);

function getUserMove() {
    rl.question('Enter your move (select number from table above): ', (userMove) => {
        let helpTable = new Help(moves);
        checkRules.checkUserMove(userMove, helpTable.showHelp());
        if (userMove === '?') {
            getUserMove();
        } else {
            console.log(`Your move: ${moves[userMove - 1]}`);
            console.log(`Computer move: ${pcMoveText}`);
            checkRules.showWinner(pcMove, userMove);
            console.log(`HMAC key: ${keyHMAC}`);
            rl.close();
        }
    });
}

getUserMove();