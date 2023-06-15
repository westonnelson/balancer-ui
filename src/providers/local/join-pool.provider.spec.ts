import { initEthersContractWithDefaultMocks } from '@/dependencies/EthersContract.mocks';
import { initBalancerSdkWithDefaultMocks } from '@/dependencies/balancer-sdk.mocks';
import { Pool } from '@/services/pool/types';
import { aWeightedPool } from '@/__mocks__/weighted-pool';
import { mountComposableWithFakeTokensProvider as mountComposable } from '@tests/mount-helpers';
import { anAmountIn } from '@tests/unit/builders/join-exit.builders';
import waitForExpect from 'wait-for-expect';
import { joinPoolProvider } from './join-pool.provider';
import { groAddress, wethAddress } from '@tests/unit/builders/address';
import { initContractConcernWithDefaultMocks } from '@/dependencies/contract.concern.mocks';

initEthersContractWithDefaultMocks();
initBalancerSdkWithDefaultMocks();
initContractConcernWithDefaultMocks();

async function mountJoinPoolProvider(pool: Pool) {
  const { result } = await mountComposable(() => joinPoolProvider(ref(pool)));

  await waitForExpect(() => {
    expect(result.isLoadingQuery.value).toBeTrue();
  });
  await waitForExpect(() => {
    expect(result.isLoadingQuery.value).toBeFalse();
  });

  return result;
}

test('join a weighted pool with default join handler (ExactIn)', async () => {
  const result = await mountJoinPoolProvider(aWeightedPool());

  expect(result.amountsIn.value).toEqual([]);
  expect(result.approvalActions.value).toEqual([]);

  const amountsIn = [
    anAmountIn({ address: groAddress, value: '20' }),
    anAmountIn({ address: wethAddress, value: '20' }),
  ];
  result.setAmountsIn(amountsIn);

  await result.join();
});
