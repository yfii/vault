import { earnContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchEarnedBalance = async ({web3, account, contractAddress}) => {
  const contract = new web3.eth.Contract(earnContractABI, contractAddress)
  const balance = await contract.methods.cal_out(account).call({ from: account });
  const earnedBalance = new BigNumber(balance).toNumber();
  return earnedBalance;
}