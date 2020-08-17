import { earnContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchDepositedBalance = async ({web3, contractAddress, tokenDecimals, account}) => {
  const contract = new web3.eth.Contract(earnContractABI, contractAddress)
  const tokenBalance = await contract.methods.plyr_(account).call({ from: account });
  const balance = BigNumber((tokenBalance.stake)/10**tokenDecimals).toNumber();
  console.log(parseFloat(tokenBalance.stake)/10**tokenDecimals);
  console.log(balance)
  return balance;
}