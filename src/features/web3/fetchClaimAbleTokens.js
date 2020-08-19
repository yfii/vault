import { crvDepositContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchClaimAbleTokens = async ({web3, account, contractAddress}) => {
  // console.log(`=====================================fetchClaimAbleTokens begin=====================================`)
  const contract = new web3.eth.Contract(crvDepositContractABI, "0xFA712EE4788C042e2B7BB55E6cb8ec569C4530c1")
  // console.log(`
  //   account:${account}\n
  //   contractAddress:${contractAddress}\n
  // `)
  const data = await contract.methods.claimable_tokens(contractAddress).call({ from: account });
  console.log("data: "+data)
  const claimAbleTokens = new BigNumber(data).toNumber();
  console.log(`
    claimAbleTokens:${claimAbleTokens}\n
  `)
  console.log(`=====================================fetchClaimAbleTokens success=====================================`)

  return claimAbleTokens;
}