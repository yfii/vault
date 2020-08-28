import { pools, price } from "../../configure";

const tokens = {};

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

// console.log(tokens)

const initialState = {
  pools,
  price,
  tokens,
  fetchPoolBalancesPending: false,
  fetchBalancesPending: false,
  fetchApprovalPending:false,
  fetchDepositPending:false,
  fetchClaimPending:false,
  fetchWithdrawPending:false,
  fetchFarmPending:false,
  fetchHarvestPending:false,
  fetchCoingekoPricePending: false,
  fetchUniswapPricesPending: false
};

export default initialState;