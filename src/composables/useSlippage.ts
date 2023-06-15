import { formatUnits, parseUnits } from '@ethersproject/units';
import BigNumber from 'bignumber.js';
import { computed } from 'vue';

import { bnum } from '@/lib/utils';

import { useUserSettings } from '@/providers/user-settings.provider';

export default function useSlippage() {
  const { slippage } = useUserSettings();

  const slippageBasisPoints = computed((): string => {
    return bnum(slippage.value).times(10000).toString();
  });

  function minusSlippage(_amount: string, decimals: number): string {
    let amount = parseUnits(_amount, decimals).toString();
    amount = minusSlippageScaled(amount);

    return formatUnits(amount, decimals);
  }

  function minusSlippageScaled(amount: string): string {
    const delta = bnum(amount)
      .times(slippageBasisPoints.value)
      .div(10000)
      .dp(0, BigNumber.ROUND_UP);

    return bnum(amount).minus(delta).toFixed();
  }

  function addSlippage(_amount: string, decimals: number): string {
    let amount = parseUnits(_amount, decimals).toString();
    amount = addSlippageScaled(amount);

    return formatUnits(amount, decimals).toString();
  }

  function addSlippageScaled(amount: string): string {
    const delta = bnum(amount)
      .times(slippageBasisPoints.value)
      .div(10000)
      .dp(0, BigNumber.ROUND_DOWN);

    return bnum(amount).plus(delta).toFixed();
  }

  return { minusSlippage, minusSlippageScaled, addSlippage, addSlippageScaled };
}
