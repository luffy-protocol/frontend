import { COINMARKETCAP_IDS } from "@/utils/constants";
import axios from "axios";
const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`;
const COINMARKETCAP_API_KEY =
  process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY || "<your-key-here>";

const getExchangeRate = async (id: number): Promise<number> => {
  const response = await axios.get(url, {
    params: {
      id: id,
      convert: "USD",
    },
    headers: {
      "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
    },
  });

  const data = response.data;
  const priceInUSD = data.data[id].quote.USD.price;
  return priceInUSD;
};
export async function GET(req: Request, res: Response) {
  try {
    const usdcAmount = 100000000000000000;
    const usdcToUsd = await getExchangeRate(COINMARKETCAP_IDS.usdc);
    const linkToUsd = await getExchangeRate(COINMARKETCAP_IDS.link);

    const usdcInUsd = usdcAmount * usdcToUsd;
    const linkAmount = usdcInUsd / linkToUsd;
    console.log(linkAmount / 1000000000000000000);
    return Response.json({
      success: true,
      amount: linkAmount / 1000000000000000000,
    });
  } catch (error) {
    return Response.json({ success: false, error: error });
  }
}
