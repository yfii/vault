export const fetchEarningsPerShare = async ({address, contract}) => {
  // console.log(`=====================================fetchEarningsPerShare begin=====================================`)
  // const contract = new web3.eth.Contract(earnContractABI, contractAddress);
  // console.log(`
  //   address:${address}\n
  //   contractAddress:${contractAddress}\n
  // `)
  const data = await contract.methods.global_(0).call({ from: address });
  const totalStake = data["total_stake"];
  const earningsPerShare = data['earnings_per_share'];
  // console.log( `totalStake:${totalStake}\n
  // earningsPerShare:${earningsPerShare}\n`)
  // console.log(`=====================================fetchEarningsPerShare success=====================================`)

  return { earningsPerShare, totalStake };
}