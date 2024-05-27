import React from "react";
import Logo from "../../public/assets/logo.svg";
import Bell from "../../public/assets/Bell.svg";
import Profile from "../../public/assets/Profile.svg";
import Image from "next/image";
import LoginButton from "./LoginButton";
import Link from "next/link";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useAccount } from "wagmi";

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, href }) => (
  <Link href={href}>
    <div className="text-gradient text-sm font-stalinist hover:scale-110">
      {children}
    </div>
  </Link>
);

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-12 px-20">
      <Link href="/">
        <Image src={Logo} alt="Logo" width={120} className="mr-4" />
      </Link>
      {/* Margin-right for logo */}
      <div className="flex gap-6 items-center">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/fixtures/19">Fixtures</NavLink>
        <NavLink href="/leaderboard/1">Leaderboard</NavLink>
        <Link href="/notifications" className="mx-2">
          <Image
            src={Bell}
            alt=""
            width={30}
            height={53}
            className="hover:scale-110"
          />
        </Link>
        <Link
          href={`/profile/0x4b4b30e2e7c6463b03cdffd6c42329d357205334`}
          className="mx-2"
        >
          <Image
            src={Profile}
            alt=""
            width={30}
            height={30}
            className="hover:scale-110"
          />
        </Link>
        {/* <LoginButton /> */}
        <div className="flex-1 w-full">
          <DynamicWidget
            innerButtonComponent={<button>Login or Signup</button>}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
