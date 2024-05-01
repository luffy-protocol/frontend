import Leaderboard from "@/components/Leaderboard";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <div className="bg-white  px-48 py-6 sm:pt-32 lg:px-48 text-black">
        <Leaderboard />
      </div>
    </div>
  );
}
