export default function formatPlayerIds(playerIds: number[]) {
  return playerIds.map((playerId) => {
    let hex = playerId.toString(16).padStart(2, "0");
    return "0x" + hex.padStart(64, "0");
  });
}
