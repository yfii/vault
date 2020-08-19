import { erc20ABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchYield = async ({web3, account, tokenAddress, contractAddress}) => {
  console.log(`=====================================fetchYield begin=====================================`)
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress)
  console.log(`
    account:${account}\n
    tokenAddress:${tokenAddress}\n
    contractAddress:${contractAddress}\n
  `)
  const balance = await contract.methods.balanceOf(contractAddress).call({ from: account });
  const idle = new BigNumber(balance).toNumber();
  console.log(`=====================================fetchYield success=====================================`)

  return idle;
}