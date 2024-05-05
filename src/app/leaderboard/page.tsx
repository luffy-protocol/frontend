"use client";
import Leaderboard from "@/components/Leaderboard";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";

function Page() {
  const { isAuthenticated } = useDynamicContext();

  return isAuthenticated ? (
    <div>
      <div className="bg-white  px-48 py-6 sm:pt-32 lg:px-48 text-black">
        <Leaderboard />
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div>
        <p className="text-black font-bold text-xl sm:text-3xl">
          Connect your wallet to get started
        </p>
        <div className="mx-auto flex justify-center mt-6">
          <DynamicWidget />
        </div>
      </div>
    </div>
  );
}
export default Page;
