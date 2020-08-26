import { IUniswapV2Router02 } from "../configure";
import BigNumber from "bignumber.js";

export const fetchUniswapPrice = async ({contract, amount, pathprice}) => {
  // console.log(`=====================================fetchUniswapPrice begin=====================================`)
  // const contract = new web3.eth.Contract(IUniswapV2Router02, "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
  if (!amount) return 0;
  console.log(new BigNumber(amount).toString(10))
  const data = await contract.methods.getAmountsOut(new BigNumber(amount).toString(10), pathprice).call()
  console.log(data)
  const yied = new BigNumber(data[pathprice.length-1]).toNumber();
  
  console.log(`yied:${yied}`)
  // console.log(`=====================================fetchUniswapPrice success=====================================`)

  return yied;
}