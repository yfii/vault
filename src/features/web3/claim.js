import { earnContractABI } from "../configure";
import { fetchGasPrice } from '.';

export const claim = async ({web3, account, contractAddress}) => {
  console.log('deposit begin=================================================')
  console.log('account: ' + account)
  console.log('contractAddress: ' + contractAddress)
  const gasPrice = await fetchGasPrice();
  console.log('gasPrice: ' + gasPrice);
  const contract = new web3.eth.Contract(earnContractABI, contractAddress);
  const data = await _claim({web3, contract, amountToSend,  account, gasPrice});
  console.log('deposit success=================================================')
  return data;
}

const _claim = ({web3, contract, account, gasPrice}) => {
  return new Promise((resolve, reject) => {
    contract.methods.claim().send({ from: account, gasPrice: web3.utils.toWei(gasPrice, 'gwei') }).on('transactionHash', function(hash){
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