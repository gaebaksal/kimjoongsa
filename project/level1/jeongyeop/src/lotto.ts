import * as readline from 'readline';

const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let matchNumbers : number[] = [];

while(matchNumbers.length < 7) {
    const tempNumber : number = Math.floor(Math.random() * (46 - 1) + 1);
    // TODO 중복 제거
    matchNumbers.push(tempNumber);
}

// console.log(matchNumbers);

console.log(`
지금부터 로또게임을 시작하지.
0: 수동, 1: 자동
선택하시게.`);

r.setPrompt('> ');
r.prompt();

r.on('line', (line : string) => {
    if (line === 'exit') {
        r.close();
    }
    if (line === '0') {
        console.log('7자리 숫자를 입력하세요.');
        line.split(' ').forEach((item) => {
            parseInt(item, 10);
        });
    }
    if (line === '1') {
        console.log('자동 선택');
    }
    if (line.length >= 13) {
        console.log(line);
    }

    r.prompt();
});

r.on('close', () => {
    process.exit();
});