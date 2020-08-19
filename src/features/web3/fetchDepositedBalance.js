import { earnContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchDepositedBalance = async ({web3, account, contractAddress}) => {
  // console.log(`=====================================fetchDepositedBalance begin=====================================`)
  const contract = new web3.eth.Contract(earnContractABI, contractAddress)
  // console.log(`
  //   account:${account}\n
  //   contractAddress:${contractAddress}\n
  // `)
  const data = await contract.methods.plyr_(account).call({ from: account });
  const depositedBalance = new BigNumber(data.stake).toNumber();
  const payout = new BigNumber(data.payout).toNumber();

  console.log(`=====================================fetchDepositedBalance success=====================================`)

  return { depositedBalance, payout };
}