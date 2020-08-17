import { erc20ABI } from "../configure";
import { fetchGasPrice } from '.';

export const approval = async ({web3, account, tokenAddress, contractAddress}) => {
  console.log('approval begin=================================================')
  console.log('account: ' + account)
  console.log('tokenAddress: ' + tokenAddress)
  console.log('contractAddress: ' + contractAddress)
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
  const gasPrice = await fetchGasPrice();
  console.log('gasPrice: ' + gasPrice);
  await contract.methods.approve(
    contractAddress, web3.utils.toWei('79228162514', "ether")
  ).send(
    { from: account, gasPrice: web3.utils.toWei(gasPrice, 'gwei')}
  )
  console.log('approval success=================================================')
  return 79228162514;
}