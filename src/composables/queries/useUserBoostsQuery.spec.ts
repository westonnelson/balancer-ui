import useUserBoostsQuery from '@/composables/queries/useUserBoostsQuery';
import { initDependenciesWithDefaultMocks } from '@/dependencies/default-mocks';
import { mountComposable, waitForQueryData } from '@tests/mount-helpers';
import { GaugeShare } from './useUserGaugeSharesQuery';

initDependenciesWithDefaultMocks();

test('Does not calculate boosts when user does not have gauge shares', async () => {
  const emptyGaugeShares = ref([]);
  const { result } = mountComposable(() =>
    useUserBoostsQuery(emptyGaugeShares)
  );

  const data = await waitForQueryData(result);

  expect(data).toEqual({});
});

test('Does not calculate boosts when user does not have gauge shares', async () => {
  const gaugeShare: GaugeShare = {
    balance: '100',
    gauge: { id: 'gauge Id', poolId: 'test pool id', totalSupply: '1000' },
  };
  const userGaugeShares = ref([gaugeShare]);
  const { result } = mountComposable(() => useUserBoostsQuery(userGaugeShares));

  const data = await waitForQueryData(result);

  expect(data).toEqual({ 'test pool id': '1.00000000833325' });
});
