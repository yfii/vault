import { earnContractABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchClaimPendingBalance = async ({web3, account, amount, contractAddress}) => {
  console.log(`=====================================fetchClaimPendingBalance begin=====================================`)
  const contract = new web3.eth.Contract(earnContractABI, contractAddress)
  console.log(`
    account:${account}\n
    amount:${amount}\n
    contractAddress:${contractAddress}\n
  `)
  const data = await contract.methods.cal_out_pending(new BigNumber(amount).dividedToIntegerBy(
    new BigNumber(1)
  ).toString(), account).call({ from: account });
  console.log("data: "+data)
  const claimPendingBalance = new BigNumber(data).toNumber();
  console.log(`
    claimPendingBalance:${claimPendingBalance}\n
  `)
  console.log(`=====================================fetchClaimPendingBalance success=====================================`)

  return claimPendingBalance;
}