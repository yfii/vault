import { erc20ABI } from "../configure";
import { fetchGasPrice } from './';
import { reject } from "async";

export const checkApproval = async ({web3, account, tokenAddress, amount, contractAddress}) => {
  // const web3 = new Web3(store.getStore('web3context').library.provider);
  return new Promise((resolve, reject) => {

    try {
      const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
      const allowance = await contract.methods.allowance(account, contractAddress).call({ from: account });
      const ethAllowance = web3.utils.fromWei(allowance, "ether");

      if(parseFloat(ethAllowance) < parseFloat(amount)) {
        const gasPrice = await fetchGasPrice();
        await contract.methods.approve(
          contractAddress, web3.utils.toWei('79228162514', "ether")
        ).send({
          from: account,
          gasPrice: web3.utils.toWei(gasPrice, 'wei')
        })
      }
      resolve()
    } catch(error) {
      reject(error.message || error)
    }
  });
}