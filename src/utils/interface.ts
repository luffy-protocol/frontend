interface MatchDetails {
  away_id: number;
  away_name: string;
  away_logo: string; // added for logo
  date: string;
  fixture_id: number;
  home_id: number;
  home_name: string;
  home_logo: string; // added for logo
  id: number;
  starttime: string;
  venue: string;
}

export type { MatchDetails };
