import { reactive } from 'vue';
import { useQuery, UseQueryOptions } from '@tanstack/vue-query';

import QUERY_KEYS from '@/constants/queryKeys';
import { VotingGauge } from '@/constants/voting-gauges';
import {
  gaugeControllerDecorator,
  VotingGaugeWithVotes,
} from '@/services/balancer/gauges/gauge-controller.decorator';
import useWeb3 from '@/services/web3/useWeb3';

/**
 * TYPES
 */
type QueryResponse = VotingGaugeWithVotes[];
type QueryOptions = UseQueryOptions<QueryResponse>;

/**
 * @summary Fetches guages list from subgraph
 */
export default function useGaugeVotesQuery(
  votingGauges: VotingGauge[],
  options: UseQueryOptions<QueryResponse> = {}
) {
  /**
   * COMPOSABLES
   */
  const { account } = useWeb3();

  /**
   * QUERY KEY
   */
  const queryKey = QUERY_KEYS.Gauges.Voting(account);

  /**
   * QUERY FUNCTION
   */
  const queryFn = async (): Promise<VotingGaugeWithVotes[]> => {
    try {
      const gauges = await gaugeControllerDecorator.decorateWithVotes(
        votingGauges,
        account.value
      );
      return gauges.map(v => Object.freeze(v));
    } catch (error) {
      console.error('Failed to get gauge votes', error);
      return [];
    }
  };

  /**
   * QUERY OPTIONS
   */
  const queryOptions = reactive({
    enabled: true,
    ...options,
  });

  return useQuery<QueryResponse>(
    queryKey,
    queryFn,
    queryOptions as QueryOptions
  );
}
