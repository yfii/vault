import { earnContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchDepositedTime = async ({contract, account}) => {
  // console.log(`=====================================fetchDepositedTime begin=====================================`)
  // const contract = new web3.eth.Contract(earnContractABI, contractAddress)
  // console.log(`
  //   account:${account}\n
  //   contractAddress:${contractAddress}\n
  // `)
  const data = await contract.methods.deposittime(account).call({ from: account });
  const depositedTime = new BigNumber(data).toNumber();
  // console.log(`=====================================fetchDepositedTime success=====================================`)

  return depositedTime;
}