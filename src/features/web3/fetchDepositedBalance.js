import BigNumber from "bignumber.js";

export const fetchDepositedBalance = async ({address, contract}) => {
  // console.log(`=====================================fetchDepositedBalance begin=====================================`)
  // console.log(`
  //   address:${address}\n
  //   contractAddress:${contractAddress}\n
  // `)
  const data = await contract.methods.plyr_(address).call({ from: address });
  const depositedBalance = new BigNumber(data.stake).toNumber();
  const payout = new BigNumber(data.payout).toNumber();

  // console.log(`=====================================fetchDepositedBalance success=====================================`)

  return { depositedBalance, payout };
}