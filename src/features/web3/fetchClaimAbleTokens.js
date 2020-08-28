import { crvDepositContractABI, strategyContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchClaimAbleTokens = async ({web3, account, contractAddress, isCrv}) => {
  // console.log(`=====================================fetchClaimAbleTokens begin=====================================`)
  // if (isCrv){
  const contract = isCrv ? new web3.eth.Contract(crvDepositContractABI, "0xFA712EE4788C042e2B7BB55E6cb8ec569C4530c1") : new web3.eth.Contract(strategyContractABI, contractAddress);
  const data = isCrv ? await contract.methods.claimable_tokens(contractAddress).call({ from: account }) : await contract.methods.balanceOfPendingReward().call({ from: account });
  
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

export const fetchClaimPendingBalance = async ({contract, account, amount}) => {
  // console.log(`=====================================fetchClaimPendingBalance begin=====================================`)
  // const contract = new web3.eth.Contract(earnContractABI, contractAddress)
  // console.log(`
  //   account:${account}\n
  //   amount:${amount}\n
  //   contractAddress:${contractAddress}\n
  // `)
  const data = await contract.methods.cal_out_pending(new BigNumber(amount).dividedToIntegerBy(
    new BigNumber(1)
  ).toString(), account).call({ from: account });
  // console.log("data: "+data)
  const claimPendingBalance = new BigNumber(data).toNumber();
  // console.log(`
  //   claimPendingBalance:${claimPendingBalance}\n
  // `)
  // console.log(`=====================================fetchClaimPendingBalance success=====================================`)

  return claimPendingBalance;
}