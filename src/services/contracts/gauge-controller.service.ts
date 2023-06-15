import { TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber } from '@ethersproject/bignumber';

import GaugeControllerAbi from '@/lib/abi/GaugeController.json';
import ConfigService, { configService } from '@/services/config/config.service';

import WalletService, {
  walletService as walletServiceInstance,
} from '@/services/web3/wallet.service';

export default class GaugeControllerService {
  abi: any;

  constructor(
    protected readonly config: ConfigService = configService,
    private readonly walletService: WalletService = walletServiceInstance
  ) {
    this.abi = GaugeControllerAbi;
  }

  get address() {
    return this.config.network.addresses.gaugeController;
  }

  public async voteForManyGaugeWeights(
    gaugeAddresses: string[],
    weights: BigNumber[],
    options: Record<string, any> = {}
  ): Promise<TransactionResponse> {
    return await this.walletService.txBuilder.contract.sendTransaction({
      contractAddress: this.address,
      abi: this.abi,
      action: 'vote_for_many_gauge_weights',
      params: [gaugeAddresses, weights],
      options,
    });
  }

  public voteForGaugeWeights(
    gaugeAddress: string,
    weight: BigNumber,
    options: Record<string, any> = {}
  ): Promise<TransactionResponse> {
    return this.walletService.txBuilder.contract.sendTransaction({
      contractAddress: this.address,
      abi: this.abi,
      action: 'vote_for_gauge_weights',
      params: [gaugeAddress, weight],
      options,
    });
  }
}

export const gaugeControllerService = new GaugeControllerService();
