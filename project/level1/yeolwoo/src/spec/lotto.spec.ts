
import { Lotto } from '../lotto';
import { win32 } from 'path';
import { exec } from 'child_process';

describe('Lotto', () => {
  let l: Lotto;
  let winningNumbers: number[];
  let bonusNumbers: number[];
  let purchaseNumbers: number[];

  beforeAll(() => {
    l = new Lotto(45);
    
    expect(l).toBeDefined();
    
    l.initialize();
    winningNumbers = l.getWinningNumbers();
    bonusNumbers = l.getBonusNumbers();
    purchaseNumbers = [...winningNumbers];

    expect(typeof(winningNumbers[0])).toEqual('number');
    expect(typeof(bonusNumbers[0])).toEqual('number');
  });

  it('1st prize', () => {
    const rank: number = l.checkResult(purchaseNumbers);
    expect(rank).toBe(1);
  });

  it('2nd prize', () => {
    purchaseNumbers[purchaseNumbers.length - 1] = bonusNumbers[0];
    const rank: number = l.checkResult(purchaseNumbers);

    expect(rank).toBe(2);
  });

  it('3rd prize', () => {
    purchaseNumbers[purchaseNumbers.length - 1] = 0;
    const rank: number = l.checkResult(purchaseNumbers);

    expect(rank).toBe(3);
  });
  
  it('4th prize', () => {
    purchaseNumbers[purchaseNumbers.length - 1] = 0;
    purchaseNumbers[purchaseNumbers.length - 2] = 0;
    const rank: number = l.checkResult(purchaseNumbers);

    expect(rank).toBe(4);
  });

  it('5th prize', () => {
    purchaseNumbers[purchaseNumbers.length - 1] = 0;
    purchaseNumbers[purchaseNumbers.length - 2] = 0;
    purchaseNumbers[purchaseNumbers.length - 3] = 0;
    const rank: number = l.checkResult(purchaseNumbers);

    expect(rank).toBe(5);
  });
})