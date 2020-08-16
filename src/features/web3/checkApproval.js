import { erc20ABI } from "../configure";
import { fetchGasPrice } from './';

export const checkApproval = async ({web3, asset, account, amount, contract, callback}) => {
  // const web3 = new Web3(store.getStore('web3context').library.provider);
  let erc20Contract = new web3.eth.Contract(erc20ABI, asset.erc20address)
  try {
    const allowance = await erc20Contract.methods.allowance(account.address, contract).call({ from: account.address })

    const ethAllowance = web3.utils.fromWei(allowance, "ether")

    console.log(ethAllowance)
    console.log(amount)

    if(parseFloat(ethAllowance) < parseFloat(amount)) {
      /*
        code to accomodate for "assert _value == 0 or self.allowances[msg.sender][_spender] == 0" in contract
        We check to see if the allowance is > 0. If > 0 set to 0 before we set it to the correct amount.
      */
      if(['crvV1', 'crvV2', 'crvV3', 'crvV4', 'USDTv1', 'USDTv2', 'USDTv3', 'USDT', 'sCRV'].includes(asset.id) && ethAllowance > 0) {
        await erc20Contract.methods.approve(contract, web3.utils.toWei('0', "ether")).send({ from: account.address, gasPrice: web3.utils.toWei(await fetchGasPrice(), 'gwei') })
      }

      await erc20Contract.methods.approve(contract, web3.utils.toWei('79228162514', "ether")).send({ from: account.address, gasPrice: web3.utils.toWei(await fetchGasPrice(), 'gwei') })
      callback()
    } else {
      callback()
    }
  } catch(error) {
    if(error.message) {
      return callback(error.message)
    }
    callback(error)
  }
}