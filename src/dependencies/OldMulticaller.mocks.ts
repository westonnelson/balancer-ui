import { BigNumber } from '@ethersproject/bignumber';
import { TokenInfoMap } from '@/types/TokenList';
// eslint-disable-next-line no-restricted-imports
import { Multicaller } from '@/lib/utils/balancer/contract';
import { initOldMulticaller } from './OldMulticaller';
import { VeBalLockInfoResult } from '@/services/balancer/contracts/contracts/veBAL';
import { formatUnits, parseUnits } from '@ethersproject/units';

export const mockedOnchainTokenName = 'mocked onchain token name';

function buildOnchainMetadataMock(metadict: TokenInfoMap) {
  // TODO: improve mocking by using more Typescript (typechain ABI??)
  const result: TokenInfoMap = {};
  Object.keys(metadict).map(tokenAddress => {
    result[tokenAddress] = {
      address: tokenAddress,
      logoURI: '',
      chainId: 5,
      name: mockedOnchainTokenName,
      symbol: 'mocked onchain token symbol',
      decimals: 18,
    };
  });
  return Promise.resolve(result);
}

export const defaultLockedAmountBN = parseUnits('0.5');
export const defaultLockedAmount = formatUnits(defaultLockedAmountBN, 18);

export function buildVeBalLockMock() {
  const result: VeBalLockInfoResult = {} as VeBalLockInfoResult;
  result.locked = [defaultLockedAmountBN, BigNumber.from(1679529600000)];
  result.epoch = BigNumber.from(6569);
  result.totalSupply = BigNumber.from(100000000000000);

  return Promise.resolve(result);
}

class OldMulticallerMock extends Multicaller {
  //@ts-ignore
  execute(args) {
    // TODO: Improve ABI detection by refactoring Multicaller
    const isERC20Abi = this.abi.length === 14;
    const isveBalAbi = this.abi.length === 41;

    if (isERC20Abi && args) if (args) return buildOnchainMetadataMock(args);

    if (isveBalAbi && !args) return buildVeBalLockMock();

    throw Error('ABI or method is not yet supported by Old Multicaller mock');
  }
}

export function generateOldMulticallerMock() {
  return OldMulticallerMock;
}

export function initOldMulticallerWithDefaultMocks() {
  //@ts-ignore
  initOldMulticaller(generateOldMulticallerMock());
}
