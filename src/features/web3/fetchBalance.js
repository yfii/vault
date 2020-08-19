import { erc20ABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchBalance = async ({web3, account, tokenAddress }) => {
  // console.log(`=====================================fetchBalance begin=====================================`)
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress)
  // console.log(`
  //   account:${account}\n
  //   tokenAddress:${tokenAddress}\n
  // `)
  const balance = await contract.methods.balanceOf(account).call({ from: account });
  // console.log(`=====================================fetchBalance success=====================================`)

  return new BigNumber(balance).toNumber();
}