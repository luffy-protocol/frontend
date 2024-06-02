import { Wallet } from "@dynamic-labs/sdk-react-core";
import { emptyPlayers } from "../constants";
import getFixtureDetails from "./getFixtureDetails";
import getPrediction from "./getPrediction";
import { getPredictionStateCrosschain } from "./getPredictionStateCrosschain";
import { Player } from "../interface";

export default async function computeGamePageState({
  primaryWallet,
  gameId,
  setPlayerPositions,
  setCaptain,
  setviceCaptain,
  setChain,
  setLabels,
  setTxConfirmed,
  setTxHashes,
  setTransactionLoading,
  setStatus,
  setHomeTeam,
  setRandom,
  setAwayTeam,
  setStadium,
  setHomeId,
  setAwayId,
  setIsLoaded,
}: {
  primaryWallet: Wallet;
  setRandom: React.Dispatch<React.SetStateAction<boolean>>;
  gameId: string;
  setPlayerPositions: (players: Player[]) => void;
  setCaptain: (captainId: number) => void;
  setviceCaptain: (viceCaptainId: number) => void;
  setChain: (chain: number) => void;
  setLabels: (labels: string[]) => void;
  setTxConfirmed: React.Dispatch<React.SetStateAction<number>>;
  setTxHashes: React.Dispatch<React.SetStateAction<string[]>>;
  setTransactionLoading: (any: boolean) => void;
  setStatus: (status: number) => void;
  setHomeTeam: (homeTeam: string) => void;
  setAwayTeam: (awayTeam: string) => void;
  setStadium: (stadium: string) => void;
  setHomeId: (homeId: number) => void;
  setAwayId: (awayId: number) => void;
  setIsLoaded: (isLoaded: boolean) => void;
}) {
  let fetchedPrediction = await getPrediction(gameId, primaryWallet);

  const players = JSON.parse(localStorage.getItem("players") || "{}");
  if (
    players != null &&
    players != undefined &&
    primaryWallet.address != undefined
  ) {
    if (!players[gameId]) players[gameId] = {};
    if (!players[gameId][primaryWallet.address as any])
      players[gameId][primaryWallet.address as any] = {};
    if (!players[gameId][primaryWallet.address as any].players)
      players[gameId][primaryWallet.address as any].players = emptyPlayers;
    else
      setPlayerPositions(players[gameId][primaryWallet.address as any].players);

    if (players[gameId][primaryWallet.address as any].captain != undefined)
      setCaptain(players[gameId][primaryWallet.address as any].captain);
    if (players[gameId][primaryWallet.address as any].viceCaptain != undefined)
      setviceCaptain(players[gameId][primaryWallet.address as any].viceCaptain);
    if (players[gameId][primaryWallet.address as any].txStatus != undefined) {
      let currentStatus =
        players[gameId][primaryWallet.address as any].txStatus;
      if (currentStatus != 0) {
        setChain(players[gameId][primaryWallet.address as any].chain);
        setLabels(players[gameId][primaryWallet.address as any].labels);
        setTxConfirmed(
          players[gameId][primaryWallet.address as any].confirmations
        );
        setTxHashes(players[gameId][primaryWallet.address as any].txHashes);
        setTransactionLoading(true);
        if (currentStatus != 3) {
          // This means it is just waiting for randomness OR just waiting for a crosschain transaction OR just received a random number and is waiting for a crosschain transaction
          if (fetchedPrediction != null || fetchedPrediction != undefined) {
            setTxHashes((hashes: any) => [
              ...hashes,
              fetchedPrediction.transactionHash,
            ]);
            players[gameId][primaryWallet.address as any].txHashes = [
              ...players[gameId][primaryWallet.address as any].txHashes,
              fetchedPrediction.transactionHash,
            ];
            setTxConfirmed((prevConf: any) => prevConf + 1);
            players[gameId][primaryWallet.address as any].confirmations =
              players[gameId][primaryWallet.address as any].confirmations + 1;
            players[gameId][primaryWallet.address as any].txStatus = 0;
            players[gameId][primaryWallet.address as any].captain =
              fetchedPrediction.captain;
            players[gameId][primaryWallet.address as any].viceCaptain =
              fetchedPrediction.viceCaptain;
            setCaptain(fetchedPrediction.captain);
            setviceCaptain(fetchedPrediction.viceCaptain);
          }
        } else {
          let fetchedCrosschainPrediction = await getPredictionStateCrosschain({
            chain: players[gameId][primaryWallet.address as any].chain,
            gameId: gameId,
            address: primaryWallet.address.toLocaleLowerCase(),
          });
          if (
            fetchedCrosschainPrediction != null ||
            fetchedCrosschainPrediction != undefined
          ) {
            setCaptain(fetchedCrosschainPrediction.captain);
            setviceCaptain(fetchedCrosschainPrediction.viceCaptain);
            setTxHashes((hashes: string[]) => [
              ...hashes,
              fetchedCrosschainPrediction.transactionHash,
            ]);
            players[gameId][primaryWallet.address as any].txHashes = [
              ...players[gameId][primaryWallet.address as any].txHashes,
              fetchedCrosschainPrediction.transactionHash,
            ];
            setTxConfirmed((prevConf: any) => prevConf + 1);
            players[gameId][primaryWallet.address as any].confirmations =
              players[gameId][primaryWallet.address as any].confirmations + 1;
            players[gameId][primaryWallet.address as any].txStatus = 4;
            players[gameId][primaryWallet.address as any].captain =
              fetchedCrosschainPrediction.captain;
            players[gameId][primaryWallet.address as any].viceCaptain =
              fetchedCrosschainPrediction.viceCaptain;
          }
        }
      } else {
        if (fetchedPrediction != null || fetchedPrediction != undefined) {
          setStatus(1);
          setCaptain(fetchedPrediction.captain);
          setviceCaptain(fetchedPrediction.viceCaptain);
          setRandom(fetchedPrediction.usedRandomness);
        }
      }
    }

    console.log("Players");
    console.log(players);
    localStorage.setItem("players", JSON.stringify(players));
    await getFixtureDetails({
      gameId: gameId,
      setHomeTeam,
      setAwayTeam,
      setStadium,
      setHomeId,
      setAwayId,
    });
    setIsLoaded(true);
  }
}
