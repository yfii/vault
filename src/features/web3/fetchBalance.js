import { erc20ABI } from "../configure";

export const fetchBalance = async ({web3, tokenAddress, tokenDecimals, account, callback}) => {

  if(tokenAddress === 'Ethereum') {
    try {
      const tokenBalance = web3.utils.fromWei(await web3.eth.getBalance(account), "ether");
      callback(null, parseFloat(tokenBalance))
    } catch(e) {
      console.log(e)
      return callback(e)
    }
  } else {
  
    try {
      const contract = new web3.eth.Contract(erc20ABI, tokenAddress)
      const tokenBalance = await contract.methods.balanceOf(account).call({ from: account });
      callback(null, parseFloat(parseFloat(tokenBalance)/10**tokenDecimals))
    } catch(e) {
      console.log(e)
      return callback(e)
    }
  }
}