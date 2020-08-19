// id: '池子id',
// name: '池子名字',  
// token: '池子代币',
// tokenDescription: '代币描述',
// tokenAddress: '代币ERC20地址',
// earnedToken: '奖励代币',
// earnedTokenAddress: '奖励代币ERC20地址',
// earnContractAddress: '池子合约地址',
import BigNumber from "bignumber.js";
export const pools = [
  {
    id: 'ycrv',
    name: 'YCRV',  
    token: 'YCRV',
    tokenDescription: 'YCRV',
    tokenAddress: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
    earnedToken: 'YFII',
    earnedTokenAddress: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
    earnContractAddress: '0x35926815383961fEEECe0AFDd6089f4dBD8295A3',
    strategyContractAddress: '0xfd4c75184bed2013fdb621f54885b2d2ed7c3894',
    depositedBalance: 0,
    claimAbleBalance: 0,
    claimPendingBalance: 0,
    claimAbleTokens: 0,
    magnitude: new BigNumber(10).exponentiatedBy(40).toNumber(),
    totalStake: 0,
    earningsPerShare: 0,
    idle: 0,
    allowance: 0,
    payout: 0,
    depositedTime: 0
  }
]