export default function CTA() {
  return (
    <div className="bg-[#01A4F1]">
      <div className="bg-repeat w-full h-full text-primary-100 heropattern-topography-slate-500">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <img src="/Logo1.png" alt="" className="w-24 h-24 mx-auto mb-5" />
            <h2
              className={`text-3xl font-bold tracking-tight text-white sm:text-4xl`}
            >
              The only privacy preserved fantasy sports solution in the market.
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Play Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
