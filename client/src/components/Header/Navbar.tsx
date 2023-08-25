import { useState } from "react";
import ListItem from "./ListItem";
import Logo from "@/assets/logo.png";
import LogoImage from "./LogoImage";
// type Props = {};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`absolute top-0 left-0 z-20 flex items-center w-full bg-white`}
    >
      <div className="container">
        <div className="relative flex items-center justify-between mx-8">
          <LogoImage imgSrc={Logo} />
          <div className="flex items-center justify-between w-full px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color"></span>
              </button>
              <nav
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white py-5 px-6 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none ${
                  !open && "hidden"
                } `}
              >
                <ul className="block lg:flex justify-end">
                  <ListItem
                    navItemStyles="text-dark hover:text-[#3056d3]"
                    to=""
                  >
                    Home
                  </ListItem>
                  <ListItem
                    navItemStyles="text-dark hover:text-[#3056d3]"
                    to="about"
                  >
                    About
                  </ListItem>
                  <ListItem
                    navItemStyles="text-dark hover:text-[#3056d3]"
                    to="blog"
                  >
                    Blog
                  </ListItem>
                  <ListItem
                    navItemStyles="text-dark hover:text-[#3056d3]"
                    to="portfolio"
                  >
                    Portfolio
                  </ListItem>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
