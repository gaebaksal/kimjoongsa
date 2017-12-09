import { Lotto } from './lotto';
import { LOTTO_NUMBER } from './types/lotto.types';
import rl from './readline';

const l = new Lotto(45);

l.initializeWinningNumber();
l.run();

