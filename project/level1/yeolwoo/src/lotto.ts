import { LOTTO_NUMBER } from './types/lotto.types';
import rl from './readline';

export class Lotto {
  private lottoNumbers: LOTTO_NUMBER;
  private winningNumbers: LOTTO_NUMBER;
  private bonusNumbers: LOTTO_NUMBER;

  constructor(private lottoSize, private winningCnt: number = 6, private bonusCnt: number = 1) {}

  initialize() {
    this.initialzeLottoNumbers();
    this.winningNumbers = this.generator(this.winningCnt);
    this.bonusNumbers = this.generator(this.bonusCnt);
  }

  private initialzeLottoNumbers() {
    this.lottoNumbers = Array.from({length: this.lottoSize}, (v, i) => i + 1);
  }

  private generator(cnt): LOTTO_NUMBER {
    const generatorNumbers = [];
    for (let i = 0; i < cnt; i++) { 
      const idx = Math.floor(this.lottoNumbers.length * Math.random());
      generatorNumbers.push(this.lottoNumbers[idx]);
      this.lottoNumbers = this.lottoNumbers.filter((v, index, arr) => index !== idx);
    }
    return generatorNumbers;
  }

  autoGenerator(): LOTTO_NUMBER {
    this.initialzeLottoNumbers();
    return this.generator(this.winningCnt);
  }

  manualGenerator(): Promise<LOTTO_NUMBER> {
    return new Promise<LOTTO_NUMBER>(resolve => {
      rl.question('입력해주세요. ex) 15 24 1 34 29 42 \n', (answer: string) => {
        const splitString: LOTTO_NUMBER = answer.split(' ').map((val: string) => isNaN(Number(val)) ? 0 : Number(val));
        
        rl.close();
        return resolve(splitString);
      })
    });
  }

  checkResult(compareNumbers): number {
    let matchCnt = 0;
    let matchBonusCnt = 0;
    let rank = 0;

    compareNumbers.forEach(cnum => {
      const w = this.winningNumbers.find(wnum => wnum === cnum);
      const b = this.bonusNumbers.find(bnum => bnum === cnum);
      matchCnt += w ? 1 : 0;
      matchBonusCnt += b ? 1 : 0;
    });

    if (matchCnt === 6) {
      rank = 1;      
    } else if (matchCnt === 5 && matchBonusCnt) {
      rank = 2; 
    } else if (matchCnt === 5) {
      rank = 3;
    } else if (matchCnt === 4) {
      rank = 4;
    } else if (matchCnt === 3) {
      rank = 5;
    }

    return rank;
  }

  run(): void {
    rl.question('1. 자동, 2. 수동 \n', async (answer: string) => {
      let purchasedNumber: LOTTO_NUMBER;

      if (answer === '1') {
        purchasedNumber = this.autoGenerator();
      } else if (answer === '2') {
        purchasedNumber = await this.manualGenerator();
      }

      console.log(`내가 구매한 번호는 ${purchasedNumber.join(', ')} 입니다.`);
      console.log(`당첨 번호는: ${this.getWinningNumbers().join(', ')} + ${this.getBonusNumbers()} 입니다.`);

      const rank = this.checkResult(purchasedNumber);

      if (rank) {
        console.log(`축하합니다. ${rank}등에 당첨 되셨습니다!`);
      } else {
        console.log('아쉽지만 당첨되지 못했습니다.');
      }

      rl.close();
    });
  }
  
  getWinningNumbers(): LOTTO_NUMBER {
    return this.winningNumbers;
  }

  getBonusNumbers(): LOTTO_NUMBER {
    return this.bonusNumbers;
  }

}