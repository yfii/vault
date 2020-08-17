import { strategyContractABI } from "../configure";
import { fetchGasPrice } from '.';

export const harvest = async ({web3, account, contractAddress}) => {
  console.log('harvest begin=================================================')
  console.log('account: ' + account)
  console.log('contractAddress: ' + contractAddress)
  const gasPrice = await fetchGasPrice();
  console.log('gasPrice: ' + gasPrice);
  const contract = new web3.eth.Contract(strategyContractABI, contractAddress);
  const data = await _harvest({web3, contract, account, gasPrice});
  console.log('harvest success=================================================')
  return data;
}

const _harvest = ({web3, contract, account, gasPrice}) => {
  return new Promise((resolve, reject) => {
    contract.methods.harvest().send({ from: account, gasPrice: web3.utils.toWei(gasPrice, 'gwei') }).on('transactionHash', function(hash){
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