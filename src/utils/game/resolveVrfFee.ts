import { formatEther } from "viem";
import { chainToChainIds } from "../constants";
import { Option } from "../interface";
import getGasPrice from "../transactions/read/getGasPrice";
import getVrfFee from "../transactions/read/getVrfFee";

export default async function resolveVrfFee(
  chain: number,
  setVrfFee: (vrfFee: string) => void
) {
  try {
    let gasPrice: string = "";
    await getGasPrice(chain, (fetch) => {
      gasPrice = fetch;
    });
    console.log(gasPrice);
    const { success, data } = await getVrfFee({
      chainId: chainToChainIds[chain],
      gasPriceInWei: gasPrice,
    });
    console.log(data);

    if (success) {
      let factor = Math.pow(10, 6);
      let value = Number(formatEther(data));
      console.log(value);
      value = Math.ceil(value * factor) / factor;
      setVrfFee(value.toString());
    }
  } catch (e) {
    console.log(e);
  }
}
