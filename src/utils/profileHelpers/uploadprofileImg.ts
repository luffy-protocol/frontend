import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default async function uploadProfileImg(
  img: File,
  userId: Number
): Promise<{
  message: string;
  response: any;
}> {
  try {
    const { data, error } = await supabase.storage
      .from("profileImage")
      .upload(`profile/${userId}`, img);
    const { data: url } = supabase.storage
      .from("profileImage")
      .getPublicUrl(`profile/${userId}`);
    if (error) throw new Error(error.message);
    return { message: "Success", response: url };
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return { message: "Internal Server Error", response: null };
  }
}
