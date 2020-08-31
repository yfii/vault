import { earnContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchEarnedBalance = async ({contract, address}) => {
  // console.log(`=====================================fetchEarnedBalance begin=====================================`)
  // const contract = new web3.eth.Contract(earnContractABI, contractAddress)
  // console.log(`
  //   address:${address}\n
  //   contractAddress:${contractAddress}\n
  // `)
  const balance = await contract.methods.cal_out(address).call({ from: address });
  const earnedBalance = new BigNumber(balance).toNumber();
  // console.log(`=====================================fetchEarnedBalance success=====================================`)

  return earnedBalance;
}
export const fetchEarnedPendingBalance = async ({web3, address, contractAddress, yieldValue}) => {
  // console.log(`=====================================fetchEarnedPendingBalance begin=====================================`)
  const contract = new web3.eth.Contract(earnContractABI, contractAddress)
  // console.log(`
  //   address:${address}\n
  //   contractAddress:${contractAddress}\n
  // `)
  // console.log('cal_out_pending:',yieldValue);
  const balance = await contract.methods.cal_out_pending(yieldValue,address).call({ from: address });
  const earnedBalance = new BigNumber(balance).toNumber();
  // console.log(`=====================================fetchEarnedPendingBalance success=====================================`)

  return earnedBalance;
}