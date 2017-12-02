import * as readline from 'readline';

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 1~45 배열 반환
function getBaseNumbers(): number[] {
  let baseNumbers: number[] = [];

  for (let i = 1; i <= 45; i++) {
    baseNumbers.push(i);
  }
  return baseNumbers;
}

// 랜덤 숫자 배열 생성
function generateRandomNumbers(count: number): number[] {
  let randomNumbers: number[] = [];
  let baseNumbers = getBaseNumbers();

  for (let i = 0; i < count; i++) {
    const index: number = Math.floor(Math.random() * 45 - i);
    randomNumbers.push(baseNumbers.splice(index, 1)[0]);
  }
  return randomNumbers;
}

let lottoNumbers: number[] = generateRandomNumbers(7);
const bonusNumber = lottoNumbers[6];

console.log(
  `지금부터 로또게임을 시작하지.
  0: 수동, 1: 자동
  선택하시게.`
);

r.setPrompt('> ');
r.prompt();

let userNumbers: number[] = [];
r.on('line', (input: string) => {
  if (input === 'exit') {
    r.close();
  }
  // 수동
  if (input === '0') {
    console.log('6자리 숫자를 입력하세요.');
    r.prompt();
  }
  // 자동
  if (input === '1') {
    console.log('자동 선택');
    userNumbers = generateRandomNumbers(6);
  }
  // 수동 입력
  if (input.length >= 11) {
    input.split(' ').forEach((item) => {
      userNumbers.push(parseInt(item, 10));
    });
  }

  // 당첨 확인
  if (userNumbers.length > 0) {
    let matchCount = 0;
    userNumbers.forEach((userNumber) => {
      (lottoNumbers.indexOf(userNumber) !== -1) ? matchCount++ : '';
    });

    switch (matchCount) {
      case 3:
        console.log('5등'); break;
      case 4:
        console.log('4등'); break;
      case 5:
        console.log('3등'); break;
      case 6:
        if (userNumbers.indexOf(bonusNumber) !== -1) {
          console.log('2등');
        } else {
          console.log('1등');
        }
        break;
      default:
        console.log('꽝');
    }

    lottoNumbers.pop();
    console.log(`로또 번호: ${lottoNumbers} + bonus: ${bonusNumber}`);
    console.log(`내 번호: ${userNumbers}`);

    r.close();
  }
});

r.on('close', () => {
  process.exit();
});