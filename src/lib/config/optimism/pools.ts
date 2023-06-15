import { Pools } from '@/types/pools';

const pools: Pools = {
  IdsMap: {},
  Pagination: {
    PerPage: 10,
    PerPool: 10,
    PerPoolInitial: 5,
  },
  BoostsEnabled: false,
  DelegateOwner: '',
  ZeroAddress: '',
  DynamicFees: {
    Gauntlet: [],
  },
  BlockList: [],
  IncludedPoolTypes: [],
  Stable: {
    AllowList: [],
  },
  Investment: {
    AllowList: [],
  },
  Weighted: {
    AllowList: [],
  },
  Factories: {},
  Stakable: {
    VotingGaugePools: [
      '0x4fd63966879300cafafbb35d157dc5229278ed2300020000000000000000002b',
      '0xde45f101250f2ca1c0f8adfc172576d10c12072d00000000000000000000003f',
      '0x981fb05b738e981ac532a99e77170ecb4bc27aef00010000000000000000004b',
      '0x359ea8618c405023fc4b98dab1b01f373792a12600010000000000000000004f',
      '0xb0de49429fbb80c635432bbad0b3965b2856017700010000000000000000004e',
      '0x6222ae1d2a9f6894da50aa25cb7b303497f9bebd000000000000000000000046',
      '0xc77e5645dbe48d54afc06655e39d3fe17eb76c1c00020000000000000000005c',
      '0x785f08fb77ec934c01736e30546f87b4daccbe50000200000000000000000041',
      '0x05e7732bf9ae5592e6aa05afe8cd80f7ab0a7bea00020000000000000000005a',
    ],
    AllowList: [],
  },
  Deep: [],
  BoostedApr: [],
  Metadata: {},
  DisabledJoins: [],
  BrandedRedirect: {},
};

export default pools;
