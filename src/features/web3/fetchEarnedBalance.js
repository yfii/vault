export const fetchEarnedBalance = async ({web3, contractABI, contractAddress, tokenDecimals, account, callback}) => {
  try {
    const contract = new web3.eth.Contract(contractABI, contractAddress)
    const tokenBalance = await contract.methods.plyr_(account).call({ from: account });
    callback(null, parseFloat(parseFloat(tokenBalance.stake)/10**tokenDecimals))
  } catch(e) {
    console.log(e)
    return callback(e)
  }
}