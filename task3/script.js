const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ComputerMove = require('./modules/ComputerMove');
const GenerationHMAC = require('./modules/GenerationHMAC');
const Rules = require('./modules/Rules');
const Help = require('./modules/Help');

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
        checkRules.checkUserMove(userMove);
        if (userMove === '?') {
            let helpTable = new Help(moves);
            helpTable.showHelp();
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