import BigNumber from "bignumber.js";

export const fetchDepositedTime = async ({contract, address}) => {
  // console.log(`=====================================fetchDepositedTime begin=====================================`)
  // const contract = new web3.eth.Contract(earnContractABI, contractAddress)
  // console.log(`
  //   address:${address}\n
  //   contractAddress:${contractAddress}\n
  // `)
  const data = await contract.methods.deposittime(address).call({ from: address });
  const depositedTime = new BigNumber(data).toNumber();
  // console.log(`=====================================fetchDepositedTime success=====================================`)

  return depositedTime;
}