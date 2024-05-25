import { keccak256 } from "viem";

export default function computeSquadHash(
  packedArray: Uint8Array
): `0x${string}` {
  const squadHash = keccak256(packedArray);
  return squadHash;
}
