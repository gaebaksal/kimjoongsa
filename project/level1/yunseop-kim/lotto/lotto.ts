// lotto
import { lottoNumber } from './types/lotto';
import * as readline from 'readline';

function generateLottoNumber(): lottoNumber {
    let result: number[] = [];
    let bonus: number;

    while (result.length < 7) {
        let generated: number = getRandomInt();
        if (!isDuplicated(generated, result)) {
            result.push(generated);
        }
    }

    bonus = result.pop();

    return {
        lottoNumbers: result.sort(sortingNumbers),
        bonusNumber: bonus
    };
}

function getRandomInt(min: number = 1, max: number = 45): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

function isDuplicated(num: number, numbersArray: number[]): boolean {
    return numbersArray.some((element) => {
        return element === num;
    })
}

function sortingNumbers(a: number, b: number): number {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
}

function compareNumbers(inputNumbers: number[], winNumbers: lottoNumber): void {
    console.log(`입력 번호: ${inputNumbers}`);
    console.log(`당첨 번호: ${winNumbers.lottoNumbers}, 보너스 번호: ${winNumbers.bonusNumber}`);
    let intersections: number[] = inputNumbers.filter((element: number) => isDuplicated(element, winNumbers.lottoNumbers));
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

function generateAutoOrManual(inputFromConsole: number): void {
    let winNumbers: lottoNumber = generateLottoNumber();
    if (inputFromConsole === 1) {
        console.log(`자동을 선택하셨습니다.`);
        let genNumbers: lottoNumber = generateLottoNumber();
        compareNumbers(genNumbers.lottoNumbers, winNumbers)
    } else if (inputFromConsole === 2) {
        console.log(`수동을 선택하셨습니다.`);
        let manualNumber: number[] = createManualLottoNumber();
        compareNumbers(manualNumber, winNumbers)
    } else {
        console.log(`잘못 입력하셨습니다. 프로그램을 종료합니다.`);
    }
}

function readInput(): void {
    var stdin = process.openStdin();

    console.log(`
    Welcome to lotto generator!

        입력: 1. 자동, 2. 수동
    `);

    // addListener의 콜백 함수의 인자 d는 형태가 object임. 알맞게 변환 해주어야 함.
    stdin.addListener("data", function (d: object) {
        const parsedInput: number = parseInt(d.toString().trim());
        generateAutoOrManual(parsedInput)
    });
}

function createManualLottoNumber(): number[] {
    let result: number[] = []

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    for (let i = 1; i <= 6; i++) {
        console.log(`${i}번째 숫자를 입력하세요.`);
        var stdin = process.openStdin();

        stdin.addListener("data", function (d: object) {
            const parsedInput: number = parseInt(d.toString().trim());
            result.push(parsedInput);
        });
    }

    return result;
}

readInput();