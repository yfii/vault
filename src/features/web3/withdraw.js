import { earnContractABI } from "../configure";
import { fetchGasPrice } from '.';

export const withdraw = async ({web3, account, amount, tokenDecimals, contractAddress}) => {
  console.log('withdraw begin=================================================')
  console.log('account: ' + account)
  console.log('contractAddress: ' + contractAddress)
  const gasPrice = await fetchGasPrice();
  console.log('gasPrice: ' + gasPrice);
  const contract = new web3.eth.Contract(earnContractABI, contractAddress);
  let amountToSend
  if (tokenDecimals !== 18) {
    amountToSend = amount*10**tokenDecimals;
  } else {
    amountToSend = web3.utils.toWei(amount, "ether");
  }
  const data = await _withdraw({web3, contract, amountToSend,  account, gasPrice});
  
  console.log('withdraw success=================================================')
  return data;
}

const _withdraw = ({web3, contract, account, amountToSend, gasPrice}) => {
  return new Promise((resolve, reject) => {
    contract.methods.withdraw(amountToSend).send({ from: account, gasPrice: web3.utils.toWei(gasPrice, 'gwei') }).on('transactionHash', function(hash){
        console.log(hash)
        // callback(null, hash)
        resolve(hash)
      })
      .on('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber, receipt);
      })
      .on('receipt', function(receipt){
        console.log(receipt);
      })
      .on('error', function(error) {
        // if (!error.toString().includes("-32601")) {
        //   if(error.message) {
        //     return callback(error.message)
        //   }
        //   callback(error)
        // }
        console.log(error)
        reject(error)
      })
      .catch((error) => {
        // if (!error.toString().includes("-32601")) {
        //   if(error.message) {
        //     return callback(error.message)
        //   }
        //   callback(error)
        // }
        console.log(error)
        reject(error)
      })
  })
}