interface ProofInput {
  signer_pub_x_key: string;
  signer_pub_y_key: string;
  signature: string;
  selected_player_ids: string;
  selected_player_points: string;
  all_player_points_merkle_root: string;
  selected_squad_hash: string;
  player_points_merkle_paths: string;
  claimed_player_points: string;
  captain: string;
  vice_captain: string;
  is_random: string;
}
export default function formatProofInputs(inputs: ProofInput): string {
  const proofInput = `selected_player_ids=${inputs.selected_player_ids} 
    selected_players_points=${inputs.selected_player_points} 
    player_points_merkle_paths=${inputs.player_points_merkle_paths} 
    all_player_points_merkle_root=${inputs.all_player_points_merkle_root} 
    claimed_player_points=${inputs.claimed_player_points} 
    selected_squad_hash=${inputs.selected_squad_hash} 
    signer_pub_x_key=${inputs.signer_pub_x_key} 
    captain=${inputs.captain} 
    is_random=${inputs.is_random} 
    vice_captain=${inputs.vice_captain} 
    signer_pub_y_key=${inputs.signer_pub_y_key} 
    signature=${inputs.signature}`;

  return proofInput;
}
