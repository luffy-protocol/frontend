// pages/api/getImageUrl.ts

import axios from "axios";

const DYNAMIC_API_KEY = process.env.NEXT_PUBLIC_DYNAMIC_API_KEY;
const DYNAMIC_ENV_ID = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID;

export async function GET(req: Request, res: Response) {
  try {
    let apiKey = req.headers.get("Authorization");
    if (apiKey != undefined && apiKey != null && apiKey.length > 0) {
      apiKey = apiKey.split(" ")[1];
    }
    if (apiKey !== DYNAMIC_API_KEY) {
      return Response.json({ success: false, data: "Unauthorized" });
    }

    const response = await axios.get(
      `https://app.dynamicauth.com/api/v0/environments/${DYNAMIC_ENV_ID}/users`,
      {
        headers: {
          Authorization: `Bearer ${DYNAMIC_API_KEY}`,
        },
      }
    );
    const data = response.data;
    return Response.json({ success: true, data: data });
  } catch (e) {
    return Response.json({ success: false, data: e });
  }
}
