import { pools } from "../../configure";

let tokens = {};

pools.map(({token, tokenAddress, earnedToken, earnedTokenAddress})=> {
  tokens[token] = {
    tokenAddress: tokenAddress,
    tokenBalance: 0
  }
  tokens[earnedToken] = {
    tokenAddress: earnedTokenAddress,
    tokenBalance: 0
  }
})

console.log(tokens)

const initialState = {
  pools,
  price: {
    "bitcoin": {
      usd: 0
    },
    "curve-dao-token": {
      usd: 4
    },
    "yfii-finance":{
      usd: 250
    },
  },
  fetchPoolBalancesPending: false,
  tokens,
  fetchBalancesPending: false,
  fetchApprovalPending:false,
  fetchDepositPending:false,
  fetchClaimPending:false,
  fetchWithdrawPending:false,
  fetchFarmPending:false,
  fetchHarvestPending:false,
};

export default initialState;