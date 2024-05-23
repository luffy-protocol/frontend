import React from "react";
import Logo from "../../public/assets/logo.svg";
import Bell from "../../public/assets/Bell.svg";
import Profile from "../../public/assets/Profile.svg";
import Image from "next/image";
import LoginButton from "./LoginButton";

interface NavLinkProps {
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ children }) => (
  <div className="text-gradient text-sm font-stalinist">{children}</div>
);

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-12 px-20">
      <Image src={Logo} alt="" width={120} className="mr-4" />{" "}
      {/* Margin-right for logo */}
      <div className="flex gap-4 items-center">
        <NavLink>Home</NavLink>
        <NavLink>Fixtures</NavLink>
        <NavLink>Leaderboard</NavLink>
        <Image src={Bell} alt="" width={30} height={53} />
        <Image src={Profile} alt="" width={30} height={30} />
        <LoginButton />
      </div>
    </div>
  );
};

export default Navbar;
