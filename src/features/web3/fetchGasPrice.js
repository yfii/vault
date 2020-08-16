import axios from 'axios';

export const fetchGasPrice = async () => {
  const universalGasPrice = '70'
  try {
    const url = 'https://gasprice.poa.network/'
    const priceString = await axios.get(url);
    const priceJSON = JSON.parse(priceString)
    if(priceJSON) {
      return priceJSON.fast.toFixed(0)
    }
    return universalGasPrice
  } catch(e) {
    console.log(e)
    return universalGasPrice
  }
}