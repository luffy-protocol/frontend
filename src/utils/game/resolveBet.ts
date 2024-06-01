import axios from "axios";
import getBetValue from "../transactions/read/getBetValue";
import { chainToChainIds } from "../constants";
import { formatEther } from "viem";

export default async function resolveBet(
  token: number,
  chain: number,
  setBetAmount: (amount: string) => void,
  setBetAmountLoading: (loading: boolean) => void
) {
  setBetAmountLoading(true);
  if (chain == 0 || token == 0) setBetAmount("0.0");
  if (token == 3) setBetAmount("0.1");
  else {
    const { success, data } = await getBetValue({
      token: token - 1,
      chainId: chainToChainIds[chain],
    });

    if (!success) setBetAmount("0.0");
    else {
      let factor = Math.pow(10, 6);
      let value = Number(formatEther(data));
      console.log(value);
      value = Math.ceil(value * factor) / factor;
      setBetAmount(value.toString());
    }
  }
  setBetAmountLoading(false);
}
