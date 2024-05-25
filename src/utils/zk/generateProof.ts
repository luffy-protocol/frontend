import { hexToBytes, recoverPublicKey, stringToBytes, toBytes } from "viem";
import computeMerkleRoot from "./computeMerkleRoot";
import computeMerklePath from "./computeMerklePath";
import computeSquadHash from "./computeSquadHash";
import {
  Wallet,
  createWalletClientFromWallet,
} from "@dynamic-labs/sdk-react-core";
import formatProofInputs from "./formatProofInputs";
import axios from "axios";
interface GenerateProofParams {
  primaryWallet: Wallet;
  resultsUrl: string;
  playerIds: number[];
}

export default async function generateProof(params: GenerateProofParams) {
  const { primaryWallet, resultsUrl, playerIds } = params;
  const walletClient = await createWalletClientFromWallet(primaryWallet);
  let signer_pub_x_key = [];
  let signer_pub_y_key = [];
  let signature = [];
  let points_merkle_paths = [];
  const results = (await axios.get(resultsUrl)).data.points;
  console.log("RESULTS");
  console.log(results);
  const allPointsMerkleRoot = computeMerkleRoot(results);
  const points = playerIds.map((id) => results[id]);
  let player_points = [];
  for (let i = 0; i < 11; i++) {
    const merklePathHexString = computeMerklePath(playerIds[i], results);
    console.log(merklePathHexString);
    console.log(`0x${(points[i] as any).toString(16).padStart(64, "0")}`);
    player_points.push(
      hexToBytes(`0x${(points[i] as any).toString(16).padStart(64, "0")}`)
    );
    const merklePath = merklePathHexString.map((element) =>
      hexToBytes(element)
    );
    points_merkle_paths.push(merklePath);
  }
  console.log("Signing this");
  const squadHash = computeSquadHash(new Uint8Array(playerIds));
  console.log(squadHash);
  const sig = Buffer.from(
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
      Array.from(toBytes(allPointsMerkleRoot))
    ),
    selected_squad_hash: JSON.stringify(
      Array.from(Buffer.from(squadHash.slice(2), "hex"))
    ),
    player_points_merkle_paths: JSON.stringify(
      points_merkle_paths.map((path) => path.map((e) => Array.from(e)))
    ),
    claimed_player_points: JSON.stringify(
      points.reduce((acc, currentValue) => acc + currentValue, 0)
    ),
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
