import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default async function registerUserProfile(address: string): Promise<{
  message: string;
  response: any;
}> {
  try {
    const { data: profile, error } = await supabase
      .from("Profile")
      .insert([
        {
          address: address,
          imageUrl:
            "https://tzfytpqfslcatnstvjkw.supabase.co/storage/v1/object/public/profileImage/defaultImage",
        },
      ])
      .select();

    if (error) throw new Error(error.message);
    return { message: "Success", response: profile };
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return { message: "Internal Server Error", response: null };
  }
}
