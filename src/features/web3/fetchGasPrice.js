import axios from 'axios';

export const fetchGasPrice = async () => {
  try {
    const url = 'https://www.gasnow.org/api/v1/gas/price';
    const { data } = await axios.get(url);
    console.log(data.top5);
    return data.top50;
  } catch(error) {
    console.log(error)
    return '70';
  }
}