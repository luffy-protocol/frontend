import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default async function removeNotifications(id: number): Promise<{
  message: string;
  response: any;
}> {
  try {
    const { data, error } = await supabase
      .from("FollowersNotification")
      .update({ checked: true })
      .eq("id", id)
      .select();

    if (error) throw new Error(error.message);

    return { message: "Success", response: data };
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return { message: "Internal Server Error", response: null };
  }
}
