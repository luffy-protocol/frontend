import fetchFixtureById from "../fixtures/fetchFixtureById";

export default async function getFixtureDetails({
  gameId,
  setHomeTeam,
  setAwayTeam,
  setStadium,
  setHomeId,
  setAwayId,
}: {
  gameId: string;
  setHomeTeam: (homeTeam: string) => void;
  setAwayTeam: (awayTeam: string) => void;
  setStadium: (stadium: string) => void;
  setHomeId: (homeId: number) => void;
  setAwayId: (awayId: number) => void;
}) {
  const { response } = await fetchFixtureById(parseInt(gameId));
  setHomeTeam(response[0].home_name);
  setAwayTeam(response[0].away_name);
  setAwayId(response[0].away_id);
  setHomeId(response[0].home_id);
  setStadium(response[0].venue);
}
