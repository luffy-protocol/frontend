import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function ConnectWalletToPlay() {
  return (
    <div className=" w-full mt-24 flex flex-col justify-center items-center">
      <p className="text-md font-stalinist mb-4">
        Connect your wallet to play the game
      </p>
      <DynamicWidget />
    </div>
  );
}
