export default function formatPlayerIds(playerIds: number[]) {
  return `0x${Buffer.from(playerIds).toString("hex")}`;
}
