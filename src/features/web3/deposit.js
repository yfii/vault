import { earnContractABI } from "../configure";
import { fetchGasPrice } from '.';

export const deposit = async ({web3, account, amount, contractAddress}) => {
  console.log(`=====================================deposit begin=====================================`)
  const gasPrice = await fetchGasPrice();
  console.log(`
    account:${account}\n
    contractAddress:${contractAddress}\n
    gasPrice:${gasPrice}\n
    amount:${web3.utils.toWei(amount, "ether")}
  `)
  const contract = new web3.eth.Contract(earnContractABI, contractAddress);
  const data = await _deposit({web3, contract, amount: web3.utils.toWei(amount, "ether"),  account, gasPrice});
  console.log(`=====================================deposit success=====================================`)
  return data;
}

const _deposit = ({web3, contract, amount,  account, gasPrice}) => {
  return new Promise((resolve, reject) => {
    contract.methods.deposit(amount).send({ from: account, gasPrice: web3.utils.toWei(gasPrice, 'gwei') }).on('transactionHash', function(hash){
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
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}