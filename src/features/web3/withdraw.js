import { earnContractABI } from "../configure";
import { fetchGasPrice } from '.';
import BigNumber from "bignumber.js";

export const withdraw = async ({web3, account, amount, contractAddress}) => {
  console.log('=====withdraw account: ' + account+ ' contractAddress: ' + contractAddress + 'begin=====')
  const gasPrice = await fetchGasPrice();
  console.log('gasPrice: ' + gasPrice);
  const contract = new web3.eth.Contract(earnContractABI, contractAddress);
  console.log('amount: ' + amount);
  const data = await _withdraw({web3, contract, amount: web3.utils.toWei(amount, "ether"),  account, gasPrice});
  console.log('=====withdraw success=====')
  return data;
}

const _withdraw = ({web3, contract, account, amountToSend, gasPrice}) => {
  return new Promise((resolve, reject) => {
    contract.methods.withdraw(amountToSend).send({ from: account, gasPrice: web3.utils.toWei(gasPrice, 'gwei') }).on('transactionHash', function(hash){
        console.log(hash)
        resolve(hash)
      })
      .on('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber, receipt);
      })
      .on('receipt', function(receipt){
        console.log(receipt);
      })
      .on('error', function(error) {
        console.log(error)
        reject(error)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}