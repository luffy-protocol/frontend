import axios from "axios";
import getCrosschainFee from "./transactions/read/getCrosschainFee";
import { chainToChainIds } from "./constants";
import { formatEther, parseEther } from "viem";

export default async function resolveCrosschainFee(
  chain: number,
  setCrosschainFee: (amount: string) => void
) {
  if (chain == 0 || chain == 1) setCrosschainFee("0.0");
  else {
    const { success, data } = await getCrosschainFee({
      chainId: chainToChainIds[chain],
      gameId: "122453",
      squadHash:
        "0x4b84d9f0b72c47e0d48d1a7f9b6c3a58d2f634a327b9c3fe0e9a57624a0e9f3b",
      token: 3,
      captain: 2,
      viceCaptain: 1,
      isRandom: true,
    });
    if (!success) setCrosschainFee("0.0");
    else {
      let factor = Math.pow(10, 6);
      let value = Number(formatEther(data));
      console.log(value);
      value = Math.ceil(value * factor) / factor;
      setCrosschainFee(value.toString());
    }
  }
}
