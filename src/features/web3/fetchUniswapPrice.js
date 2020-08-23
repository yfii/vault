import { IUniswapV2Router02 } from "../configure";
import BigNumber from "bignumber.js";

export const fetchUniswapPrice = async ({web3, pricepath}) => {
  // console.log(`=====================================fetchUniswapPrice begin=====================================`)
  const contract = new web3.eth.Contract(IUniswapV2Router02, "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
  const data = await contract.methods.getAmountsOut('1000000000000000000',pricepath).call()
  console.log(data)
  const price = new BigNumber(data[pricepath.length-1]).dividedBy(new BigNumber(10).exponentiatedBy(18)).toNumber();
  
  console.log(`price:${price}`)
  // console.log(`=====================================fetchUniswapPrice success=====================================`)

  return price;
}