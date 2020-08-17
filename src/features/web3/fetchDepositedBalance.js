import { earnContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchDepositedBalance = async ({web3, contractAddress, tokenDecimals, account}) => {
  const contract = new web3.eth.Contract(earnContractABI, contractAddress)
  const data = await contract.methods.plyr_(account).call({ from: account });
  const depositedBalance = BigNumber((data.stake)/10**tokenDecimals).toNumber();
  const payout = BigNumber((data.payout)/10**tokenDecimals).toNumber();
  console.log(parseFloat(data.stake)/10**tokenDecimals);
  console.log(depositedBalance)
  return { depositedBalance, payout };
}