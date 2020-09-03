export const fetchPricePerFullShare = async ({address, contract}) => {
  // console.log(`=====================================fetchDepositedBalance begin=====================================`)
  // console.log(`
  //   address:${address}\n
  //   contractAddress:${contractAddress}\n
  // `)
  const pricePerFullShare = await contract.methods.getPricePerFullShare(address).call({ from: address });

  // console.log(`=====================================fetchDepositedBalance success=====================================`)

  return pricePerFullShare;
}