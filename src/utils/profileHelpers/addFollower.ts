import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default async function addFollower(
  userId: number,
  followerId: number
): Promise<{
  message: string;
  response: any;
}> {
  try {
    console.log("started");
    const { data: profile, error } = await supabase
      .from("Profile")
      .select()
      .eq("userId", userId);
    console.log(profile);

    let arr = [];
    if (profile) {
      if (profile[0].followers)
        for (let i = 0; i < profile[0].followers.length; i++) {
          arr.push(profile[0].followers[0]);
        }
      arr.push(followerId);
      console.log(arr);
    }

    const { data: updatedUser, error: userError } = await supabase
      .from("Profile")
      .update([{ followers: arr }])
      .eq("userId", userId)
      .select();

    // console.log(userError);
    // const { data: updatedUser, error: userError } = await supabase
    //   .from("Profile")
    //   .update([{ followers: [1001] }])
    //   .eq("userId", 1111)
    //   .select();

    if (userError) throw new Error(userError.message);
    return { message: "Success", response: updatedUser };
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return { message: "Internal Server Error", response: null };
  }
}
