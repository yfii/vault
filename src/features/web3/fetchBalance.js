import { erc20ABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchBalance = async ({web3, tokenAddress, tokenDecimals, account, callback}) => {
  try {
    if(tokenAddress === 'Ethereum') { 
      const tokenBalance = await web3.eth.getBalance(account)
      const tokenBalanceToEther = web3.utils.fromWei(tokenBalance, "ether");
      const balance = new BigNumber(tokenBalanceToEther).toNumber();
      callback(null, balance)
    } else {
      const contract = new web3.eth.Contract(erc20ABI, tokenAddress)
      const tokenBalance = await contract.methods.balanceOf(account).call({ from: account });
      const balance = new BigNumber((tokenBalance)/10**tokenDecimals).toNumber();
      callback(null, balance)
    }
  } catch(error) {
    return callback(error.message || error)
  }
}