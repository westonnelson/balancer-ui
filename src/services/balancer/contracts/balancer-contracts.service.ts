import {
  InvestmentPool__factory,
  StablePool__factory,
  WeightedPool__factory,
} from '@balancer-labs/typechain';
import { JsonRpcProvider } from '@ethersproject/providers';
import ERC20_ABI from '@/lib/abi/ERC20.json';
import IERC4626 from '@/lib/abi/IERC4626.json';
import LinearPoolAbi from '@/lib/abi/LinearPool.json';
import StablePhantomPool from '@/lib/abi/StablePhantomPool.json';
import StaticATokenLMAbi from '@/lib/abi/StaticATokenLM.json';
// eslint-disable-next-line no-restricted-imports
import { balancer } from '@/lib/balancer.sdk';
// import { getBalancerSDK } from '@/dependencies/balancer-sdk';
import { Config } from '@/lib/config/types';
import { configService as _configService } from '@/services/config/config.service';
import { rpcProviderService as _rpcProviderService } from '@/services/rpc-provider/rpc-provider.service';
import Vault from './contracts/vault';
import veBAL from './contracts/veBAL';

export default class BalancerContractsService {
  vault: Vault;
  config: Config;
  provider: JsonRpcProvider;
  veBAL: veBAL;

  constructor(
    readonly configService = _configService,
    readonly rpcProviderService = _rpcProviderService,
    // TODO: Fix affected tests by refactoring export balancerContractsService
    // readonly sdk = getBalancerSDK()
    readonly sdk = balancer
  ) {
    this.provider = this.rpcProviderService.jsonProvider;
    this.config = this.configService.network;

    // Init contracts
    this.vault = new Vault(this);
    this.veBAL = new veBAL(this);
  }

  // Combine all the ABIs and remove duplicates
  public get allPoolABIs() {
    return Object.values(
      Object.fromEntries(
        [
          ...WeightedPool__factory.abi,
          ...StablePool__factory.abi,
          ...InvestmentPool__factory.abi,
          ...StablePhantomPool,
          ...LinearPoolAbi,
          ...StaticATokenLMAbi,
          ...ERC20_ABI,
          ...IERC4626,
        ].map(row => [row.name, row])
      )
    );
  }
}

export const balancerContractsService = new BalancerContractsService();
