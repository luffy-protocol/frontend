// import request, { gql } from "graphql-request";

// export const getProfileData = async (address: string) => {
//   const data = await request(
//     "https://api.studio.thegraph.com/query/30735/luffy-block-magic/version/latest",
//     gql`
//       query MyQuery {
//         user(id: "0xbe9044946343fdbf311c96fb77b2933e2ada8b5d") {
//           totalClaimmables
//           totalGamesClaimed
//           totalEarnings
//           totalGamesPlayed
//           totalPointsWon
//           totalSpent
//           rewards {
//             amount
//           }
//           predictions {
//             id
//             reward {
//               amount
//               position
//             }
//           }
//         }
//       }
//     `
//   );
//   return data.user.user;
// };

interface Reward {
  amount: string;
}

interface Prediction {
  id: string;
  reward: {
    amount: string;
    position: string;
  };
}

interface User {
  totalClaimmables: string;
  totalEarnings: string;
  totalGamesClaimed: string;
  totalGamesPlayed: string;
  totalPointsWon: string;
  totalSpent: string;
  rewards: Reward[];
  predictions: Prediction[];
}

interface MyQueryResponse {
  user: User;
}

import request, { gql } from "graphql-request";

export const getProfileData = async (address: string): Promise<User | null> => {
  const query = gql`
    query MyQuery($id: String!) {
      user(id: $id) {
        totalClaimmables
        totalGamesClaimed
        totalEarnings
        totalGamesPlayed
        totalPointsWon
        totalSpent
        rewards {
          amount
        }
        predictions {
          id
          reward {
            amount
            position
          }
        }
      }
    }
  `;

  try {
    const data: MyQueryResponse = await request(
      "https://api.studio.thegraph.com/query/30735/luffy-block-magic/version/latest",
      query,
      { id: "0xbe9044946343fdbf311c96fb77b2933e2ada8b5d" }
    );
    return data.user;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
};
