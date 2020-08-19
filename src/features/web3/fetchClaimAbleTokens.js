import { strategyContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchClaimAbleTokens = async ({web3, account, contractAddress}) => {
  // console.log(`=====================================fetchClaimAbleTokens begin=====================================`)
  const contract = new web3.eth.Contract(strategyContractABI, contractAddress)
  // console.log(`
  //   account:${account}\n
  //   contractAddress:${contractAddress}\n
  // `)
  const data = await contract.methods.claimable_tokens(account).call({ from: account });
  const claimAbleTokens = new BigNumber(data).toNumber();
  // console.log(`=====================================fetchClaimAbleTokens success=====================================`)

  return claimAbleTokens;
}