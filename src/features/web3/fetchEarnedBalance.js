import { earnContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchEarnedBalance = async ({web3, account, contractAddress, tokenDecimals, callback}) => {
  try {
    const contract = new web3.eth.Contract(earnContractABI, contractAddress)
    const tokenBalance = await contract.methods.cal_out(account).call({ from: account });
    const balance = BigNumber((tokenBalance)/10**tokenDecimals).toNumber();
    console.log(parseFloat(tokenBalance)/10**tokenDecimals);
    console.log(balance)
    return callback(null, balance);
  } catch(error) {
    return callback(error.message || error)
  }
}