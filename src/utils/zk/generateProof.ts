import { hexToBytes, recoverPublicKey, stringToBytes, toBytes } from "viem";
import computeMerkleRoot from "./helpers/computeMerkleRoot";
import computeMerklePath from "./helpers/computeMerklePath";
import computeSquadHash from "./helpers/computeSquadHash";
import {
  Wallet,
  createWalletClientFromWallet,
} from "@dynamic-labs/sdk-react-core";
import formatProofInputs from "./helpers/formatProofInputs";
import axios from "axios";
interface GenerateProofParams {
  primaryWallet: Wallet;
  results: number[];
  allPlayersPoints: number[];
  allPlayerPointsMerkleRoot: string;
  captain: number;
  viceCaptain: number;
  setError: (error: string) => void;
  isRandom: boolean;
  playerIds: number[];
  setTxConfirmed: (txConfirmed: boolean) => void;
  setTxHashes: (txHash: string) => void;
}

export default async function generateProof(
  params: GenerateProofParams
): Promise<{ success: boolean; proof: any }> {
  const {
    primaryWallet,
    results,
    playerIds,
    captain,
    viceCaptain,
    setTxConfirmed,
    setTxHashes,
    allPlayersPoints,
    allPlayerPointsMerkleRoot,
    isRandom,
    setError,
  } = params;

  let signer_pub_x_key = [];
  let signer_pub_y_key = [];
  let signature = [];
  let points_merkle_paths = [];
  let player_points = [];

  console.log("PLAYER IDS");
  console.log(playerIds);
  console.log("RESULTS");
  console.log(results);

  const walletClient = await createWalletClientFromWallet(primaryWallet);

  for (let i = 0; i < 11; i++) {
    const merklePathHexString = computeMerklePath(
      playerIds[i],
      allPlayersPoints
    );
    console.log(merklePathHexString);
    console.log(`0x${(results[i] as any).toString(16).padStart(64, "0")}`);
    player_points.push(
      hexToBytes(`0x${(results[i] as any).toString(16).padStart(64, "0")}`)
    );
    const merklePath = merklePathHexString.map((element) =>
      hexToBytes(element)
    );
    points_merkle_paths.push(merklePath);
  }

  console.log("MERKLE PATH");
  console.log(points_merkle_paths);

  const squadHash = computeSquadHash(new Uint8Array(playerIds));
  let sig;
  try {
    sig = Buffer.from(
      (
        await walletClient.signMessage({
          account: primaryWallet.address as `0x${string}`,
          message: {
            raw: stringToBytes(squadHash),
          },
        })
      ).slice(2),
      "hex"
    );
    setTxHashes(sig.toString("hex"));
    setTxConfirmed(true);
  } catch (e) {
    setError("Error signing message or Signature rejected");
    return { success: false, proof: "" };
  }

  const publicKey = await recoverPublicKey({
    hash: Buffer.from(squadHash.slice(2), "hex"),
    signature: sig,
  });

  const publicKeyBuffer = Buffer.from(publicKey.slice(2), "hex");
  signer_pub_x_key = Array.from(publicKeyBuffer.subarray(1, 33));
  signer_pub_y_key = Array.from(publicKeyBuffer.subarray(33));
  signature = Array.from(new Uint8Array(sig.subarray(0, sig.length - 1)));
  const proofInputs = {
    signer_pub_x_key: JSON.stringify(signer_pub_x_key),
    signer_pub_y_key: JSON.stringify(signer_pub_y_key),
    signature: JSON.stringify(signature),
    selected_player_ids: JSON.stringify(playerIds),
    selected_player_points: JSON.stringify(
      player_points.map((point) => Array.from(point))
    ),
    all_player_points_merkle_root: JSON.stringify(
      Array.from(toBytes(allPlayerPointsMerkleRoot))
    ),
    selected_squad_hash: JSON.stringify(
      Array.from(Buffer.from(squadHash.slice(2), "hex"))
    ),
    player_points_merkle_paths: JSON.stringify(
      points_merkle_paths.map((path) => path.map((e) => Array.from(e)))
    ),
    captain: JSON.stringify(playerIds[captain]),
    vice_captain: JSON.stringify(playerIds[viceCaptain]),
    claimed_player_points: JSON.stringify(
      results.reduce((acc, currentValue) => acc + currentValue, 0)
    ),
    is_random: JSON.stringify(isRandom),
  };
  console.log("PROOF INPUTS");
  console.log(proofInputs);

  const formattedProofInputs = formatProofInputs(proofInputs);
  console.log("FORMATTED PROOF INPUTS");
  console.log(formattedProofInputs);
  const response = await axios.post(`/api/sindri/prove`, {
    headers: {},
    data: { proofInputs: formattedProofInputs },
  });
  return response.data;
}
