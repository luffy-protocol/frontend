import React from "react";
import Logo from "../../public/assets/logo.svg";
import Bell from "../../public/assets/Bell.svg";
import Profile from "../../public/assets/Profile.svg";
import Image from "next/image";
import LoginButton from "./LoginButton";
import Link from "next/link";

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, href }) => (
  <Link href={href}>
    <div className="text-gradient text-sm font-stalinist">{children}</div>
  </Link>
);

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-12 px-20">
      <Link href="/">
        <Image src={Logo} alt="Logo" width={120} className="mr-4" />
      </Link>
      {/* Margin-right for logo */}
      <div className="flex gap-4 items-center">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/fixtures/19">Fixtures</NavLink>
        <NavLink href="/leaderboard/1">Leaderboard</NavLink>
        <Link href="/notifications" className="w-full">
          <Image src={Bell} alt="" width={30} height={53} />
        </Link>
        <Link href="/profile" className="w-full">
          <Image src={Profile} alt="" width={30} height={30} />
        </Link>
        <LoginButton />
      </div>
    </div>
  );
};

export default Navbar;
