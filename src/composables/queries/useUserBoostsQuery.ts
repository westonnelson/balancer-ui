import { logFetchException } from '@/lib/utils/exceptions';
import { computed, reactive, Ref } from 'vue';
import { useQuery, UseQueryOptions } from '@tanstack/vue-query';

import QUERY_KEYS from '@/constants/queryKeys';
import useWeb3 from '@/services/web3/useWeb3';
import { stakingRewardsService } from '@/services/staking/staking-rewards.service';
import { GaugeShare } from './useUserGaugeSharesQuery';
import { isPoolBoostsEnabled } from '../useNetwork';

/**
 * TYPES
 */
export type UserBoosts = {
  [poolId: string]: string;
};
type QueryOptions = UseQueryOptions<UserBoosts>;

/**
 * useUserBoostsQuery
 *
 * Fetches a pool > boost map for the current account using a given gauge shares
 * array. The gauge shares could be all the user's staked positions or for an
 * individual pool.
 *
 * @param {Ref<GaugeShare>} gaugeShares - The gauges to fetch boost values for.
 * @param {QueryOptions} options - useQuery options.
 * @returns Pool ID to boost value map.
 */
export default function useUserBoostsQuery(
  gaugeShares: Ref<undefined> | Ref<GaugeShare[]>,
  options: QueryOptions = {}
) {
  /**
   * COMPOSABLES
   */
  const { account, isWalletReady } = useWeb3();

  /**
   * QUERY KEY
   */
  const queryKey = reactive(QUERY_KEYS.User.Boosts(account, gaugeShares));

  /**
   * COMPUTED
   */
  const enabled = computed(
    (): boolean => !!gaugeShares.value && isWalletReady.value
  );

  /**
   * QUERY FUNCTION
   */
  const queryFn = async () => {
    try {
      // If we don't have user's gaugeShares we can't calculate boosts
      if (!gaugeShares.value || gaugeShares.value.length === 0) return {};
      // We don't have boosts on L2s. Adding this to the enabled conditional
      // causes permanent loading states, so instead just return empty.
      if (!isPoolBoostsEnabled.value) return {};

      return await stakingRewardsService.getUserBoosts({
        userAddress: account.value,
        gaugeShares: gaugeShares.value,
      });
    } catch (error) {
      logFetchException('Failed to fetch user boost values', error);
      throw error;
    }
  };

  /**
   * QUERY OPTIONS
   */
  const queryOptions = reactive({
    enabled,
    refetchOnWindowFocus: false,
    ...options,
  });

  return useQuery<UserBoosts>(queryKey, queryFn, queryOptions as QueryOptions);
}
