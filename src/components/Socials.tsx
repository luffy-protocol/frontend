import React from "react";

const Socials = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-20 items-center justify-center  space-x-4 w-1/2 item">
        <a href="https://x.com/luffyprotocol">
          <img
            src="/assets/twitter.svg"
            alt="Twitter"
            className="w-28 hover:scale-110"
          />
        </a>
        <a href="https://instagram.com/luffyprotocol">
          <img
            src="/assets/instagram.svg"
            alt="Instagram"
            className="w-28 hover:scale-110"
          />
        </a>
        <a href="https://github.com/luffyprotocol">
          <img
            src="/assets/git.svg"
            alt="Github"
            className="w-28 hover:scale-110"
          />
        </a>
      </div>
    </div>
  );
};

export default Socials;
