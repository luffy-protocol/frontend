import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default async function uploadProfileImg(
  img: File,
  address: string
): Promise<{
  message: string;
  response: any;
}> {
  try {
    const { data, error } = await supabase.storage
      .from("profileImage")
      .upload(`profile/${address}`, img, {
        upsert: true,
      });
    const { data: url } = supabase.storage
      .from("profileImage")
      .getPublicUrl(`profile/${address}`);

    const { data: updated, error: updateError } = await supabase
      .from("Profile")
      .update({ imageUrl: url!.publicUrl as string })
      .eq("address", address)
      .select();

    if (error) throw new Error(error.message);
    return { message: "Success", response: url };
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return { message: "Internal Server Error", response: null };
  }
}
