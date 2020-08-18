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
  fetchPoolBalancesPending: false,
  fetchPoolBalancesError: null,
  tokens,
  fetchBalancesPending: false,
  fetchBalancesError: null,
  fetchApprovalPending:false,
  fetchApprovalError: null,
  fetchDepositPending:false,
  fetchDepositError: null,
  fetchClaimPending:false,
  fetchClaimError: null,
  fetchWithdrawPending:false,
  fetchWithdrawError: null,
  fetchFarmPending:false,
  fetchFarmError: null,
  fetchHarvestPending:false,
  fetchHarvestError: null
};

export default initialState;