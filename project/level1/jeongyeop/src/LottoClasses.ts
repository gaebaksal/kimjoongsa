/**
 * 숫자 생성 클래스
 */
export class GenerateRandomNumber {
  // 1~45 배열 반환
  private getBaseNumbers(): number[] {
    let baseNumbers: number[] = [];

    for (let i = 1; i <= 45; i++) {
      baseNumbers.push(i);
    }
    return baseNumbers;
  }

  // 랜덤 숫자 배열 생성
  public setRandomNumbers(length: number, randomNumbers: number[]): void {
    let baseNumbers = this.getBaseNumbers();

    for (let i = 0; i < length; i++) {
      const index: number = Math.floor(Math.random() * 45 - i);
      randomNumbers.push(baseNumbers.splice(index, 1)[0]);
    }
  }
}

/**
 * 로또 센터
 */
class LottoCenter extends GenerateRandomNumber {
  private LOTTO_NUMBER_LENGTH: number = 7;
  private lottoNumbers: number[] = [];

  constructor() {
    super();
    super.setRandomNumbers(this.LOTTO_NUMBER_LENGTH, this.lottoNumbers);
  }

  public getLawLottoNumbers(): number[] {
    return this.lottoNumbers;
  }
}

/**
 * 로또 구매자
 */
class LottoPerson extends GenerateRandomNumber {
  private LOTTO_NUMBER_LENGTH: number = 6;
  private myNumbers: number[] = [];

  public setAutoNumbers() {
    super.setRandomNumbers(this.LOTTO_NUMBER_LENGTH, this.myNumbers);
  }

  public setNumbers(numbers: number[]): void {
    this.myNumbers = numbers;
  }

  public checkReward(lottoNumbers: number[]): void {
    let bonusNumber: number;
    let matchCount: number = 0;
    this.myNumbers.forEach((myNumber) => {
      (lottoNumbers.indexOf(myNumber) !== -1) ? matchCount++ : '';
    });

    bonusNumber = lottoNumbers.pop();
    switch (matchCount) {
      case 3:
        console.log('5등'); break;
      case 4:
        console.log('4등'); break;
      case 5:
        console.log('3등'); break;
      case 6:
        if (this.myNumbers.indexOf(bonusNumber) !== -1) {
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
    console.log(`내 번호: ${this.myNumbers}`);
  }
}

export {LottoCenter, LottoPerson}