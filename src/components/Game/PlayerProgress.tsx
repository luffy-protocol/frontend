export default function PlayerProgress({ noPlayers }: { noPlayers: number }) {
  return (
    <div>
      <div className="flex font-stalinist text-[8px] justify-between">
        <p>Players Chosen</p>
        <p>{noPlayers}/11</p>
      </div>
      <div className="flex bg-[url('/assets/progressborder.svg')] sm:w-[320px] h-[20px] bg-no-repeat bg-cover items-center justify-center ">
        {Array(11) // Create an array of 11 elements
          .fill(null) // Fill the array with null values
          .map((_, index) => (
            <div
              key={index}
              className={`w-[28px] h-3 rounded-sm bg-[#d94956] ml-1 ${
                index < noPlayers ? "" : "opacity-0"
              }`}
            />
          ))}
        {noPlayers == 11 && (
          <div className="w-0 h-0 transform rotate-0 border-b-[11px] ml-1 border-b-transparent border-l-[10px] border-l-[#d94956] border-r-[5px] border-r-transparent "></div>
        )}{" "}
      </div>
    </div>
  );
}
