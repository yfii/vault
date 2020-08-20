import { crvDepositContractABI, earnContractABI,strategyContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchClaimAbleTokens = async ({web3, account, contractAddress, isCrv}) => {
  // console.log(`=====================================fetchClaimAbleTokens begin=====================================`)
  if (isCrv){
    const contract = new web3.eth.Contract(crvDepositContractABI, "0xFA712EE4788C042e2B7BB55E6cb8ec569C4530c1");
    const data = await contract.methods.claimable_tokens(contractAddress).call({ from: account });
  }else{
    const contract = new web3.eth.Contract(strategyContractABI, contractAddress);
    const data = await contract.methods.balanceOfPendingReward().call({ from: account });
  }
  // console.log(`
  //   account:${account}\n
  //   contractAddress:${contractAddress}\n
  // `)
  // console.log("data: "+data)
  const claimAbleTokens = new BigNumber(data).toNumber();
  // console.log(`
  //   claimAbleTokens:${claimAbleTokens}\n
  // `)
  // console.log(`=====================================fetchClaimAbleTokens success=====================================`)

  return claimAbleTokens;
}