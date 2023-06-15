import { BigNumberish, Contract } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
import { WeiPerEther as ONE } from '@ethersproject/constants';
import { configService } from '@/services/config/config.service';
import { rpcProviderService } from '@/services/rpc-provider/rpc-provider.service';

import { includesAddress } from '..';

const { stETH: stEthAddress, wstETH: wstEthAddress } =
  configService.network.tokens.Addresses;

const MAINNET_RATE_PROVIDER_ADDRESS =
  '0x72d07d7dca67b8a406ad1ec34ce969c90bfee768';

type ConversionParams = {
  amount: BigNumber;
  isWrap: boolean; // e.g. is stETH to wstETH
};

export function isStETH(tokenInAddress: string, tokenOutAddress: string) {
  if (!tokenInAddress || !tokenOutAddress || !stEthAddress) return false;

  return includesAddress([tokenInAddress, tokenOutAddress], stEthAddress);
}

export function isStEthAddress(address: string): boolean {
  if (!stEthAddress) return false;
  return address.toLowerCase() === stEthAddress.toLowerCase();
}

export function isWstEthAddress(address: string): boolean {
  if (!wstEthAddress) return false;
  return address.toLowerCase() === wstEthAddress.toLowerCase();
}

export function includesWstEth(
  addresses: string[],
  wstEthAddress = configService.network.tokens.Addresses.wstETH
): boolean {
  if (!wstEthAddress) return false;

  return includesAddress(addresses, wstEthAddress);
}

/**
 * @notice Get amount of wstETH for a given amount of stETH
 */
export function getWstETHByStETH(stETHAmount: BigNumberish) {
  if (!wstEthAddress) {
    throw new Error(
      'Attempted to read wstETH contract on Network that doesnt support wstETH'
    );
  }
  const wstETH = new Contract(
    wstEthAddress,
    [
      'function getWstETHByStETH(uint256 stETHAmount) external view returns (uint256)',
    ],
    rpcProviderService.jsonProvider
  );
  return wstETH.getWstETHByStETH(stETHAmount);
}

/**
 * Convert stETH amount to wstETH or vice versa. Only relevant on mainnet when wrapping or unwrapping.
 *
 * @param {BigNumber} amount - The amount to convert, could be stETH or wstETH value.
 * @param {boolean} isWrap - True if wrapping stETH to wstETH, false if unwrapping wstETH to stETH.
 * @returns Converted value for wrap or unwrap, if input is stETH, returns wstETH value and vice versa.
 */
export async function convertStEthWrap({ amount, isWrap }: ConversionParams) {
  try {
    const rateProvider = new Contract(
      MAINNET_RATE_PROVIDER_ADDRESS,
      ['function getRate() external view returns (uint256)'],
      rpcProviderService.jsonProvider
    );

    const rate = await rateProvider.getRate();

    return isWrap ? amount.mul(ONE).div(rate) : amount.mul(rate).div(ONE);
  } catch (error) {
    throw new Error('Failed to convert stETH', { cause: error });
  }
}
