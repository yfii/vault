import { crvDepositContractABI, earnContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchClaimAbleTokens = async ({web3, account, contractAddress, isCrv}) => {
  // console.log(`=====================================fetchClaimAbleTokens begin=====================================`)
  const contract = isCrv ? new web3.eth.Contract(crvDepositContractABI, "0xFA712EE4788C042e2B7BB55E6cb8ec569C4530c1") : new web3.eth.Contract(earnContractABI, contractAddress)
  // console.log(`
  //   account:${account}\n
  //   contractAddress:${contractAddress}\n
  // `)
  const data = await contract.methods.claimable_tokens(contractAddress).call({ from: account });
  // console.log("data: "+data)
  const claimAbleTokens = new BigNumber(data).toNumber();
  // console.log(`
  //   claimAbleTokens:${claimAbleTokens}\n
  // `)
  // console.log(`=====================================fetchClaimAbleTokens success=====================================`)

  return claimAbleTokens;
}