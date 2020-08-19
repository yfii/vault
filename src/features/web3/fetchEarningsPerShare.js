import { earnContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchEarningsPerShare = async ({web3, account, contractAddress}) => {
  console.log(`=====================================fetchEarningsPerShare begin=====================================`)
  const yield_value = 1;
  const magnitude = 10**40;
  const contract = new web3.eth.Contract(earnContractABI, contractAddress);
  console.log(`
    account:${account}\n
    contractAddress:${contractAddress}\n
  `)
  const data = contract.methods.global_(0).call({ from: account });
  const total_stake = data["total_stake"];
  const earnings_per_share = data['earnings_per_share'];
  const earningsPerShare = earnings_per_share + yield_value*(magnitude)/(total_stake);
  console.log(`=====================================fetchEarningsPerShare success=====================================`)

  return earningsPerShare;
}