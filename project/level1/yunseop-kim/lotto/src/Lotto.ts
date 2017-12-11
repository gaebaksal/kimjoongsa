import { lottoNumber } from '../types/lotto';
import { rl } from './readline'

export default class Lotto {

    public init(): void {
        rl.question(`Welcome to lotto 6/45
        1. 자동 2. 수동
        >> `, (answer) => {
                const parsedAnswer: number = parseInt(answer, 10);
                this.generateAutoOrManual(parsedAnswer)
            });
    }

    private getRandomInt(min: number = 1, max: number = 45): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    private isDuplicated(num: number, numbersArray: number[]): boolean {
        return numbersArray.some((element) => {
            return element === num;
        })
    }

    private sortingNumbers(a: number, b: number): number {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    }

    private manualGenerator(): Promise<number[]> {

        return new Promise<number[]>(resolve => {
            rl.question('6개의 숫자를 입력해주세요. ex) 1 2 3 4 5 6 \n >> ', (answer: string) => {
                const splitString: number[] = answer.split(' ').map((val: string) => parseInt(val, 10)).sort(this.sortingNumbers);

                rl.close();
                resolve(splitString);
            })
        });
    }

    public async generateAutoOrManual(inputFromConsole: number): Promise<void> {
        let winNumbers: lottoNumber = this.generateLottoNumber();
        if (inputFromConsole === 1) {
            console.log(`자동을 선택하셨습니다.`);
            let genNumbers: lottoNumber = this.generateLottoNumber();
            this.checkResult(genNumbers.lottoNumbers, winNumbers)
        } else if (inputFromConsole === 2) {
            console.log(`수동을 선택하셨습니다. 번호를 입력해주세요.`);
            const manualNumber: number[] = await this.manualGenerator();
            this.checkResult(manualNumber, winNumbers)
        } else {
            console.log(`잘못 입력하셨습니다. 프로그램을 종료합니다.`);
        }
    }


    private generateLottoNumber(): lottoNumber {
        let result: number[] = [];
        let bonus: number;

        while (result.length < 7) {
            let generated: number = this.getRandomInt();
            if (!this.isDuplicated(generated, result)) {
                result.push(generated);
            }
        }

        bonus = result.pop();

        return {
            lottoNumbers: result.sort(this.sortingNumbers),
            bonusNumber: bonus
        };
    }

    private checkResult(inputNumbers: number[], winNumbers: lottoNumber): void {
        console.log(`입력 번호: ${inputNumbers}`);
        console.log(`당첨 번호: ${winNumbers.lottoNumbers}, 보너스 번호: ${winNumbers.bonusNumber}`);
        let intersections: number[] = inputNumbers.filter((element: number) => this.isDuplicated(element, winNumbers.lottoNumbers));
        let bonusIntersection: number[] = inputNumbers.filter((element: number) => element === winNumbers.bonusNumber)
        console.log(`맞춘 번호: ${intersections}, 보너스: ${bonusIntersection}`);
        let totalLength = intersections.length + bonusIntersection.length;

        switch (totalLength) {
            case 0:
            case 1:
            case 2:
                console.log(`꽝`);
                break;
            case 3:
                console.log(`5등`);
                break;
            case 4:
                console.log(`4등`);
                break;
            case 5:
                console.log(`3등`);
                break;
            case 6:
                if (bonusIntersection.length === 1) console.log(`2등`);
                else console.log(`1등`);
                break;
        }
    }
}