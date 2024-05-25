import axios from "axios";

export async function POST(req: Request, res: Response) {
  const request = await req.json();
  const { proofInputs } = request.data;

  const SINDRI_API_KEY =
    process.env.NEXT_PUBLIC_SINDRI_API_KEY || "<your-key-here>";

  // Use v1 of the Sindri API.
  axios.defaults.baseURL = "https://sindri.app/api/v1";
  // Authorize all future requests with an `Authorization` header.
  axios.defaults.headers.common["Authorization"] = `Bearer ${SINDRI_API_KEY}`;
  // Expect 2xx responses for all requests.
  axios.defaults.validateStatus = (status) => status >= 200 && status < 300;

  const circuitId = "d34e83f1-384a-4bbe-bb94-a05b6446bb45";

  //   const proofInput = `selected_player_ids=[0,1,2,3,4,5,6,7,8,9,10]
  //     selected_players_points=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,97],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,105],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,39],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,65]]
  //     player_points_merkle_paths=[[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,97],[54,106,123,146,172,218,54,64,134,204,153,31,97,139,249,241,11,98,158,192,247,174,148,84,63,150,182,145,182,158,201,146],[28,160,134,78,164,57,239,57,159,50,87,88,184,250,127,153,147,243,64,124,7,43,33,184,19,54,78,203,24,38,119,85],[33,106,151,107,254,118,12,148,29,110,170,22,195,202,133,38,180,143,227,58,94,23,42,233,186,44,239,212,111,223,198,126],[215,252,56,246,210,249,3,194,116,188,11,248,240,232,56,132,45,232,208,21,233,104,16,112,82,126,222,103,87,53,24,52],[127,110,130,169,79,116,10,180,53,114,101,164,57,97,163,70,100,160,161,36,53,201,130,60,131,50,164,83,187,253,151,10]],[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10],[54,106,123,146,172,218,54,64,134,204,153,31,97,139,249,241,11,98,158,192,247,174,148,84,63,150,182,145,182,158,201,146],[28,160,134,78,164,57,239,57,159,50,87,88,184,250,127,153,147,243,64,124,7,43,33,184,19,54,78,203,24,38,119,85],[33,106,151,107,254,118,12,148,29,110,170,22,195,202,133,38,180,143,227,58,94,23,42,233,186,44,239,212,111,223,198,126],[215,252,56,246,210,249,3,194,116,188,11,248,240,232,56,132,45,232,208,21,233,104,16,112,82,126,222,103,87,53,24,52],[127,110,130,169,79,116,10,180,53,114,101,164,57,97,163,70,100,160,161,36,53,201,130,60,131,50,164,83,187,253,151,10]],[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[237,174,206,92,66,126,142,38,175,103,139,250,43,36,139,209,24,114,226,89,147,63,233,109,189,57,28,17,68,71,170,129],[28,160,134,78,164,57,239,57,159,50,87,88,184,250,127,153,147,243,64,124,7,43,33,184,19,54,78,203,24,38,119,85],[33,106,151,107,254,118,12,148,29,110,170,22,195,202,133,38,180,143,227,58,94,23,42,233,186,44,239,212,111,223,198,126],[215,252,56,246,210,249,3,194,116,188,11,248,240,232,56,132,45,232,208,21,233,104,16,112,82,126,222,103,87,53,24,52],[127,110,130,169,79,116,10,180,53,114,101,164,57,97,163,70,100,160,161,36,53,201,130,60,131,50,164,83,187,253,151,10]],[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,105],[237,174,206,92,66,126,142,38,175,103,139,250,43,36,139,209,24,114,226,89,147,63,233,109,189,57,28,17,68,71,170,129],[28,160,134,78,164,57,239,57,159,50,87,88,184,250,127,153,147,243,64,124,7,43,33,184,19,54,78,203,24,38,119,85],[33,106,151,107,254,118,12,148,29,110,170,22,195,202,133,38,180,143,227,58,94,23,42,233,186,44,239,212,111,223,198,126],[215,252,56,246,210,249,3,194,116,188,11,248,240,232,56,132,45,232,208,21,233,104,16,112,82,126,222,103,87,53,24,52],[127,110,130,169,79,116,10,180,53,114,101,164,57,97,163,70,100,160,161,36,53,201,130,60,131,50,164,83,187,253,151,10]],[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14],[82,215,80,57,146,102,56,211,197,88,178,189,239,185,69,213,190,141,174,41,222,221,28,49,50,18,164,212,114,217,253,229],[197,115,117,113,203,165,133,97,26,94,147,70,215,213,67,188,217,109,123,177,195,43,209,100,240,152,141,254,83,91,45,178],[33,106,151,107,254,118,12,148,29,110,170,22,195,202,133,38,180,143,227,58,94,23,42,233,186,44,239,212,111,223,198,126],[215,252,56,246,210,249,3,194,116,188,11,248,240,232,56,132,45,232,208,21,233,104,16,112,82,126,222,103,87,53,24,52],[127,110,130,169,79,116,10,180,53,114,101,164,57,97,163,70,100,160,161,36,53,201,130,60,131,50,164,83,187,253,151,10]],[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[82,215,80,57,146,102,56,211,197,88,178,189,239,185,69,213,190,141,174,41,222,221,28,49,50,18,164,212,114,217,253,229],[197,115,117,113,203,165,133,97,26,94,147,70,215,213,67,188,217,109,123,177,195,43,209,100,240,152,141,254,83,91,45,178],[33,106,151,107,254,118,12,148,29,110,170,22,195,202,133,38,180,143,227,58,94,23,42,233,186,44,239,212,111,223,198,126],[215,252,56,246,210,249,3,194,116,188,11,248,240,232,56,132,45,232,208,21,233,104,16,112,82,126,222,103,87,53,24,52],[127,110,130,169,79,116,10,180,53,114,101,164,57,97,163,70,100,160,161,36,53,201,130,60,131,50,164,83,187,253,151,10]],[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[231,16,134,67,24,212,163,47,55,214,206,84,203,63,173,190,246,72,221,18,216,219,223,83,151,53,100,213,107,127,136,28],[197,115,117,113,203,165,133,97,26,94,147,70,215,213,67,188,217,109,123,177,195,43,209,100,240,152,141,254,83,91,45,178],[33,106,151,107,254,118,12,148,29,110,170,22,195,202,133,38,180,143,227,58,94,23,42,233,186,44,239,212,111,223,198,126],[215,252,56,246,210,249,3,194,116,188,11,248,240,232,56,132,45,232,208,21,233,104,16,112,82,126,222,103,87,53,24,52],[127,110,130,169,79,116,10,180,53,114,101,164,57,97,163,70,100,160,161,36,53,201,130,60,131,50,164,83,187,253,151,10]],[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[231,16,134,67,24,212,163,47,55,214,206,84,203,63,173,190,246,72,221,18,216,219,223,83,151,53,100,213,107,127,136,28],[197,115,117,113,203,165,133,97,26,94,147,70,215,213,67,188,217,109,123,177,195,43,209,100,240,152,141,254,83,91,45,178],[33,106,151,107,254,118,12,148,29,110,170,22,195,202,133,38,180,143,227,58,94,23,42,233,186,44,239,212,111,223,198,126],[215,252,56,246,210,249,3,194,116,188,11,248,240,232,56,132,45,232,208,21,233,104,16,112,82,126,222,103,87,53,24,52],[127,110,130,169,79,116,10,180,53,114,101,164,57,97,163,70,100,160,161,36,53,201,130,60,131,50,164,83,187,253,151,10]],[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,39],[53,17,184,235,57,63,211,180,206,67,0,121,30,238,103,185,248,168,83,26,87,15,248,145,47,194,176,117,149,155,10,43],[156,70,215,150,93,116,42,60,130,197,170,121,151,135,9,147,232,49,124,232,227,185,98,196,122,147,11,125,165,64,103,250],[54,188,44,93,17,164,12,224,105,112,185,151,105,234,33,107,174,141,176,163,57,8,87,144,174,169,14,243,146,243,215,50],[215,252,56,246,210,249,3,194,116,188,11,248,240,232,56,132,45,232,208,21,233,104,16,112,82,126,222,103,87,53,24,52],[127,110,130,169,79,116,10,180,53,114,101,164,57,97,163,70,100,160,161,36,53,201,130,60,131,50,164,83,187,253,151,10]],[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[53,17,184,235,57,63,211,180,206,67,0,121,30,238,103,185,248,168,83,26,87,15,248,145,47,194,176,117,149,155,10,43],[156,70,215,150,93,116,42,60,130,197,170,121,151,135,9,147,232,49,124,232,227,185,98,196,122,147,11,125,165,64,103,250],[54,188,44,93,17,164,12,224,105,112,185,151,105,234,33,107,174,141,176,163,57,8,87,144,174,169,14,243,146,243,215,50],[215,252,56,246,210,249,3,194,116,188,11,248,240,232,56,132,45,232,208,21,233,104,16,112,82,126,222,103,87,53,24,52],[127,110,130,169,79,116,10,180,53,114,101,164,57,97,163,70,100,160,161,36,53,201,130,60,131,50,164,83,187,253,151,10]],[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[182,145,94,81,157,95,157,210,60,98,152,110,72,87,141,223,168,205,229,201,38,8,34,41,4,253,135,173,4,223,79,253],[156,70,215,150,93,116,42,60,130,197,170,121,151,135,9,147,232,49,124,232,227,185,98,196,122,147,11,125,165,64,103,250],[54,188,44,93,17,164,12,224,105,112,185,151,105,234,33,107,174,141,176,163,57,8,87,144,174,169,14,243,146,243,215,50],[215,252,56,246,210,249,3,194,116,188,11,248,240,232,56,132,45,232,208,21,233,104,16,112,82,126,222,103,87,53,24,52],[127,110,130,169,79,116,10,180,53,114,101,164,57,97,163,70,100,160,161,36,53,201,130,60,131,50,164,83,187,253,151,10]]]
  //     all_player_points_merkle_root=[64,218,150,223,213,19,176,127,39,19,198,32,222,102,59,22,221,142,52,223,180,33,215,46,170,163,109,213,140,124,20,142]
  //     claimed_player_points=335
  //     selected_squad_hash=[50,101,20,15,223,195,44,158,66,108,56,65,30,238,135,86,187,51,241,131,208,180,38,214,58,193,92,81,119,152,181,26]
  //     signer_pub_x_key=[206,125,93,98,5,116,123,246,199,79,128,134,32,125,51,29,139,103,227,141,79,121,16,222,171,95,139,128,108,167,181,81]
  //     signer_pub_y_key=[92,190,92,110,239,107,142,205,93,243,206,111,190,209,70,0,188,52,88,86,37,7,250,238,22,72,57,222,2,104,57,2]
  //     signature=[202,237,45,194,68,34,47,99,249,128,15,193,227,28,230,46,27,244,90,142,51,17,254,247,237,143,0,95,173,193,138,23,104,10,136,165,224,184,165,114,110,203,148,226,123,220,210,108,3,158,170,231,109,231,53,93,23,3,207,81,82,44,134,190]`;

  console.log("PROOF INPUTS");
  console.log(proofInputs);

  try {
    const proveResponse = await axios.post(`/circuit/${circuitId}/prove`, {
      proof_input: proofInputs,
    });
    const proofId = proveResponse.data.proof_id;
    // console.log("Proof ID:", proofId);
    let startTime = Date.now();
    let proofDetailResponse;
    while (true) {
      proofDetailResponse = await axios.get(`/proof/${proofId}/detail`);
      const { status } = proofDetailResponse.data;
      const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
      if (status === "Ready") {
        console.log(`Polling succeeded after ${elapsedSeconds} seconds.`);
        break;
      } else if (status === "Failed") {
        throw new Error(
          `Polling failed after ${elapsedSeconds} seconds: ${proofDetailResponse.data.error}.`
        );
      } else if (Date.now() - startTime > 30 * 60 * 1000) {
        throw new Error("Timed out after 30 minutes.");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    // console.log("Proof Output:");
    // console.log(proofDetailResponse.data.proof);
    // console.log("Public Output:");
    // console.log(proofDetailResponse.data.public);

    return Response.json({
      success: true,
      proof: proofDetailResponse.data.proof.proof,
    });
  } catch (error) {
    console.log("Error generating proof:");
    console.log(error);
    return Response.json({ success: false, error: error });
  }
}
