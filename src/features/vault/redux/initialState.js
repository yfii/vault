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
  fetchApprovalPending: {},
  fetchDepositPending: {},
  fetchClaimPending: {},
  fetchWithdrawPending: {},
  fetchFarmPending: {},
  fetchHarvestPending: {},
  fetchCoingekoPricePending: false,
  fetchUniswapPricesPending: false
};

export default initialState;