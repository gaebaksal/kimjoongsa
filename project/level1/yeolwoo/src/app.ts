import { Lotto } from './lotto';
import { LOTTO_NUMBER } from './types/lotto.types';
import rl from './readline';

const l = new Lotto(45);

l.initialize();

rl.question('1. 자동, 2. 수동 \n', async (answer: string) => {
  let purchasedNumber: LOTTO_NUMBER;
  
  if (answer === '1') {
    purchasedNumber = l.autoGenerator();
  } else if (answer === '2') {
    purchasedNumber = await l.manualGenerator();
  }
  
  console.log(`내가 구매한 번호는 ${purchasedNumber.join(', ')} 입니다.`);
  console.log(`당첨 번호는: ${l.getWinningNumbers().join(', ')} + ${l.getBonusNumbers()} 입니다.`);

  const rank = l.checkResult(purchasedNumber);

  if (rank) {
    console.log(`축하합니다. ${rank}등에 당첨 되셨습니다!`);
  } else {
    console.log('아쉽지만 당첨되지 못했습니다.');
  }

  rl.close();
});




