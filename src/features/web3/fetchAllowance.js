import { erc20ABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchAllowance = async ({web3, account, tokenAddress, contractAddress}) => {
  console.log(`=====fetchAllowance account: ${account} tokenAddress: ${tokenAddress} contractAddress: ${contractAddress} begin=====`)
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
  console.log(`=====fetchAllowance allowance begin=====`)
  const balance = await contract.methods.allowance(account, contractAddress).call({ from: account });
  console.log(`=====fetchAllowance allowance success data: ${balance}=====`)
  const allowance = web3.utils.fromWei(balance, "ether");
  console.log(`=====fetchAllowance success=====`)
  console.log(allowance)
  return new BigNumber(allowance).toNumber();
}