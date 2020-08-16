import { erc20ABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchAllowance = async ({web3, account, tokenAddress, contractAddress}) => {
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
  const allowance = await contract.methods.allowance(account, contractAddress).call({ from: account });
  const ethAllowance = web3.utils.fromWei(allowance, "ether");
  const number = BigNumber(ethAllowance).toNumber();
  return number;
}