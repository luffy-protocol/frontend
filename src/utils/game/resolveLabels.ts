export default function resolveLabels({
  token,
  isRandom,
  chain,
  setLabels,
  setStepCount,
}: {
  setLabels: (labels: string[]) => void;
  setStepCount: (stepCount: number) => void;
  token: number;
  isRandom: boolean;
  chain: number;
}) {
  let labels = [];
  if (token > 1) {
    if (token == 2) labels.push("Approve LINK");
    else labels.push("Approve USDC");
  }
  labels.push("Place Bet");
  if (isRandom) {
    labels.push("Randomness Commitment");
  }
  if (chain > 1) {
    labels.push("Receiving Crosschain Transaction");
  }
  setLabels(labels);
  setStepCount(labels.length);
}
