import { earnContractABI } from "./abi";
// id: '池子id',
// name: '池子名字',  
// token: '池子代币',
// tokenDescription: '代币描述',
// tokenDecimals: '代币精度' 类型number,
// tokenAddress: '代币ERC20地址',
// earnedToken: '奖励代币',
// earnedTokenDecimals: '奖励代币精度',
// earnedTokenAddress: '奖励代币ERC20地址',
// earnContractAddress: '池子合约地址',
// earnContractABI : '池子合约ABI',
export const pools = [
  {
    id: 'weth',
    name: 'WETH',  
    token: 'WETH',
    tokenDescription: 'WETH',
    tokenDecimals: 18,
    tokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    earnedToken: 'YFII',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
    earnContractAddress: '0xA9C7216650dA5A9bbC049ffa56008029344DB010',
    earnContractABI,
    stakedBalance: 0,
    claimAbleBalance: 0
  },
  {
    id: 'snx',
    name: 'SNX',  
    token: 'SNX',
    tokenDescription: 'SNX',
    tokenDecimals: 18,
    tokenAddress: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    earnedToken: 'YFII',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
    earnContractAddress: '0x956da37db508901294f62488e030ce0871293270',
    earnContractABI,
    stakedBalance: 0,
    claimAbleBalance: 0
  }
]