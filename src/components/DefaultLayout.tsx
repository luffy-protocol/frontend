import Navbar from "./Navbar";
interface LayoutProps {
  children: React.ReactNode;
}
export default function DefaultLayout({ children }: LayoutProps) {
  return (
    <div className="">
      <div className=" relative z-10 mx-2">
        <img src="/assets/BG.svg" className=" w-screen" />
      </div>
      <div className="absolute inset-0 z-20 ">
        <div className="flex flex-col  items-center w-full overflow-hidden  ">
          <div className="w-full">
            <Navbar />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
