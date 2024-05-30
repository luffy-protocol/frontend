interface TriggerSubmitSquadProps {
  chain: number;
  token: number;
  totalValue: number;
  tokenAmount: number;
  isRandom: number;
  captain: number;
  viceCaptain: number;
  squadHash: string;
}

export default async function triggerSubmitSquad({
  chain,
  token,
  tokenAmount,
  totalValue,
  isRandom,
  viceCaptain,
  captain,
  squadHash,
}: TriggerSubmitSquadProps) {
  if (token != 1) {
    // Approve Tokens
  }
  // place bet

  if (isRandom) {
    // wait for vrf
  }
  // display cross chain tx
}
