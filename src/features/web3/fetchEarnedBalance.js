import { earnContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchEarnedBalance = async ({web3, account, contractAddress}) => {
  console.log(`=====================================fetchEarnedBalance begin=====================================`)
  const contract = new web3.eth.Contract(earnContractABI, contractAddress)
  console.log(`
    account:${account}\n
    contractAddress:${contractAddress}\n
  `)
  const balance = await contract.methods.cal_out(account).call({ from: account });
  const earnedBalance = new BigNumber(balance).toNumber();
  console.log(`=====================================fetchEarnedBalance success=====================================`)

  return earnedBalance;
}