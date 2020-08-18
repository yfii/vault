import { erc20ABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchBalance = async ({web3, account, tokenAddress }) => {
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress)
  const balance = await contract.methods.balanceOf(account).call({ from: account });
  return new BigNumber(balance).toNumber();
}