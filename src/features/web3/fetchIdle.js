import BigNumber from "bignumber.js";

export const fetchIdle = async ({account, contract, contractAddress}) => {
  // console.log(`=====================================fetchIdle begin=====================================`)
  // const contract = new web3.eth.Contract(erc20ABI, tokenAddress)
  // console.log(`
  //   account:${account}\n
  //   tokenAddress:${tokenAddress}\n
  //   contractAddress:${contractAddress}\n
  // `)
  const balance = await contract.methods.balanceOf(contractAddress).call({ from: account });
  const idle = new BigNumber(balance).toNumber();
  // console.log(`
  // balance:${balance}\n
  // `)
  // console.log(`=====================================fetchIdle success=====================================`)

  return idle;
}