import { pools } from "../../configure";

let tokens = {};

pools.map(({token, tokenDecimals, tokenAddress, earnedToken, earnedTokenDecimals, earnedTokenAddress})=> {
  tokens[token] = {
    tokenDecimals: tokenDecimals,
    tokenAddress: tokenAddress,
    tokenBalance: 0
  }
  tokens[earnedToken] = {
    tokenDecimals: earnedTokenDecimals,
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
  fetchDepositPending:false,
  fetchDepositError: null
};

export default initialState;