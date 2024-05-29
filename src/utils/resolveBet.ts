import axios from "axios";

export default async function resolveBet(
  token: number,
  chain: number,
  setBetAmount: (amount: string) => void,
  setBetAmountLoading: (loading: boolean) => void
) {
  setBetAmountLoading(true);
  if (chain == 0 || token == 0) setBetAmount("0.0");
  if (token == 3) setBetAmount("0.1");
  else if (token == 1) {
    if (chain == 1) {
      try {
        const { data } = await axios.get("/api/coinmarketcap/avax-to-usdc");
        setBetAmount(data.amount.toFixed(5).toString());
      } catch (e) {
        setBetAmount("0.00275");
      }
    } else {
      try {
        const { data } = await axios.get("/api/coinmarketcap/eth-to-usdc");
        setBetAmount(data.amount.toFixed(6).toString());
      } catch (e) {
        setBetAmount("0.000026");
      }
    }
  } else if (token == 2) {
    try {
      const { data } = await axios.get("/api/coinmarketcap/link-to-usdc");
      setBetAmount(data.amount.toFixed(4).toString());
    } catch (e) {
      setBetAmount("0.0053");
    }
  }
  setBetAmountLoading(false);
}
