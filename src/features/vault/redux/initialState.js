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