import { earnContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchDepositedBalance = async ({web3, account, contractAddress}) => {
  const contract = new web3.eth.Contract(earnContractABI, contractAddress)
  const data = await contract.methods.plyr_(account).call({ from: account });
  const depositedBalance = new BigNumber(data.stake).toNumber();
  const payout = new BigNumber(data.payout).toNumber();
  return { depositedBalance, payout };
}