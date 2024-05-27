import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function addFollower(
  userId: string, // assuming userId is a string (UUID)
  followerId: string // assuming followerId is a string (UUID)
): Promise<{
  message: string;
  response: any;
}> {
  try {
    const { data, error } = await supabase
      .from("FollowersNotification")
      .insert([{ followerId: userId, followingId: followerId }])
      .select();

    // Fetch the user profile
    const { data: userprofile, error: userProfileError } = await supabase
      .from("Profile")
      .select("followers")
      .eq("userId", userId)
      .single(); // Use .single() if expecting a single object

    if (userProfileError) throw new Error(userProfileError.message);
    console.log(userprofile);

    // Update followers array
    let userarr = userprofile?.followers || [];
    if (!userarr.includes(followerId)) {
      userarr.push(followerId);
    }
    console.log(userarr);

    const { data: updatedUser, error: userError } = await supabase
      .from("Profile")
      .update({ followers: userarr })
      .eq("userId", userId)
      .select();

    if (userError) throw new Error(userError.message);

    // Fetch the follower profile
    const { data: followerprofile, error: followerProfileError } =
      await supabase
        .from("Profile")
        .select("following")
        .eq("userId", followerId)
        .single(); // Use .single() if expecting a single object

    if (followerProfileError) throw new Error(followerProfileError.message);
    console.log(followerprofile);

    // Update following array
    let followerArr = followerprofile?.following || [];
    if (!followerArr.includes(userId)) {
      followerArr.push(userId);
    }
    console.log(followerArr);

    const { data: updatedFollower, error: followerError } = await supabase
      .from("Profile")
      .update({ following: followerArr })
      .eq("userId", followerId)
      .select();

    if (followerError) throw new Error(followerError.message);

    return { message: "Success", response: { updatedUser, updatedFollower } };
  } catch (error) {
    console.error("Error updating follow information:", error);
    return { message: "Internal Server Error", response: null };
  }
}
