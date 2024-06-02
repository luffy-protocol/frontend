import { Wallet } from "@dynamic-labs/sdk-react-core";
import { getPredictionState } from "./getPredictionState";

export default async function getPrediction(
  gameId: string,
  primaryWallet: Wallet
): Promise<any> {
  const fetchedPrediction = await getPredictionState({
    gameId: "0x" + parseInt(gameId).toString(16),
    address: primaryWallet.address.toLocaleLowerCase(),
  });
  return fetchedPrediction;
}
