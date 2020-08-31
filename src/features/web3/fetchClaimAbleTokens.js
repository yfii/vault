import { crvDepositContractABI, strategyContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchClaimAbleTokens = async ({web3, address, contractAddress, isCrv,crvGauge}) => {
  // console.log(`=====================================fetchClaimAbleTokens begin=====================================`)
  // if (isCrv){
  const contract = isCrv ? new web3.eth.Contract(crvDepositContractABI, crvGauge) : new web3.eth.Contract(strategyContractABI, contractAddress);
  const data = isCrv ? await contract.methods.claimable_tokens(contractAddress).call({ from: address }) : await contract.methods.balanceOfPendingReward().call({ from: address });
  
  // console.log(`
  //   address:${address}\n
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

export const fetchClaimPendingBalance = async ({contract, address, amount}) => {
  // console.log(`=====================================fetchClaimPendingBalance begin=====================================`)
  // const contract = new web3.eth.Contract(earnContractABI, contractAddress)
  // console.log(`
  //   address:${address}\n
  //   amount:${amount}\n
  //   contractAddress:${contractAddress}\n
  // `)
  console.log("claimPendingBalance: begin")
  const data = await contract.methods.cal_out_pending(new BigNumber(amount).dividedToIntegerBy(
    new BigNumber(1)
  ).toString(), address).call({ from: address });
  console.log("data: "+data)
  const claimPendingBalance = new BigNumber(data).toNumber();
  console.log("claimPendingBalance: " + claimPendingBalance)
  // console.log(`
  //   claimPendingBalance:${claimPendingBalance}\n
  // `)
  // console.log(`=====================================fetchClaimPendingBalance success=====================================`)

  return claimPendingBalance;
}