import { erc20ABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchIdle = async ({web3, account, tokenAddress, contractAddress}) => {
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress)
  const balance = await contract.methods.balanceOf(contractAddress).call({ from: account });
  const idle = new BigNumber(balance).toNumber();
  return idle;
}