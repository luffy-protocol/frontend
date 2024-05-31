export default function resolveLabels({
  token,
  isRandom,
  chain,
  setLabels,
}: {
  setLabels: (labels: string[]) => void;
  token: number;
  isRandom: boolean;
  chain: number;
}) {
  let labels = [];
  if (token > 1) {
    if (token == 2) labels.push("Approve LINK");
    else labels.push("Approve USDC");
  }
  labels.push("Confirm Bet");
  if (isRandom) {
    labels.push("VRF Callback");
  }
  if (chain > 1) {
    labels.push("Receiving Crosschain Transaction");
  }
  setLabels(labels);
}
