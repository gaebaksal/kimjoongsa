import * as readline from 'readline';
import {LottoCenter, LottoPerson} from './LottoClasses';

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(
  `지금부터 로또게임을 시작하지.
  0: 수동, 1: 자동
  선택하시게.`
);

const lottoCenter = new LottoCenter();
const lottoPerson = new LottoPerson();
r.setPrompt('> ');
r.prompt();

let isFinish: boolean = false;
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
    lottoPerson.setAutoNumbers();
    isFinish = true;
  }
  // 수동 입력
  if (input.length >= 11) {
    let tempNumbers: number[] = [];
    input.split(' ').forEach((item) => {
      tempNumbers.push(parseInt(item, 10));
    });
    lottoPerson.setNumbers(tempNumbers);
    isFinish = true;
  }

  // 당첨 확인
  if (isFinish) {
    lottoPerson.checkReward(lottoCenter.getLawLottoNumbers());
    r.close();
  }
});

r.on('close', () => {
  process.exit();
});