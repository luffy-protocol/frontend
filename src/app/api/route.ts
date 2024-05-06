// pages/api/getImageUrl.ts

import axios from "axios";

export async function GET(req: Request, res: Response) {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const data = response.data;
    console.log(data);
    return Response.json({ data: data });
  } catch (e) {
    console.log("Error fetching users");
    console.log(e);
    return Response.json({ error: (e as any).toString() });
  }
}
