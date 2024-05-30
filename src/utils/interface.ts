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
interface Player {
  name: string;
  id: string;
  team:
    | "avatar"
    | "atlanta-united"
    | "austin"
    | "charlotte"
    | "chicago-fire"
    | "fc-cincinnati"
    | "columbus-crew"
    | "dc-united"
    | "inter-miami"
    | "cf-montreal"
    | "new-england-revolution"
    | "nycfc"
    | "orlando-city"
    | "philadelphia-union"
    | "toronto"
    | "colorado-rapids"
    | "fc-dallas"
    | "houston-dynamo"
    | "la-galaxy"
    | "lafc"
    | "minnesota-united"
    | "nashville"
    | "portland-timbers"
    | "real-salt-lake"
    | "san-jose-earthquakes"
    | "seattle-sounders"
    | "sporting-kc"
    | "st-louis-city"
    | "vancouver-whitecaps";
}
interface Option {
  id: number;
  name: string;
  image: string;
}
interface ClaimRow {
  id: string;
  name: string;
  time: string;
  points: number;
  address: string;
}

interface User {
  id: string;
  name: string;
  address: string;
}
interface MappedUsers {
  [address: string]: User;
}
interface FetchInput {
  mappedUsers: MappedUsers;
  gameId: string;
}
interface UserData {
  id: string;
  name: string;
  address: string;

  points: number;
}
interface PlaceBetProps {
  selectedPlayersCount: number;
  setTransactionLoading: (loading: boolean) => void;
  captainAndViceCaptainSet: boolean;
  triggerTransaction: (params: TriggerTransactionProps) => Promise<void>;
}

interface TriggerTransactionProps {
  chain: number;
  token: number;
  tokenAmount: string;
  totalValue: string;
  isRandom: boolean;
  gasPrice: number;
}

export type {
  MatchDetails,
  Player,
  Option,
  ClaimRow,
  User,
  MappedUsers,
  FetchInput,
  UserData,
  PlaceBetProps,
  TriggerTransactionProps,
};
