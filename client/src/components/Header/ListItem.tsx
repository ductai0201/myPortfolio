import React from "react";
import {Link} from "react-scroll"
type ListItemProps = {
  children?: React.ReactNode;
  navItemStyles?: string;
  to?: any;
};

const ListItem = ({ children, navItemStyles, to }: ListItemProps) => {
  return (
    <>
      <li>
        <Link to={to} 
        smooth
        duration={500}
          className={`flex py-2 text-base font-medium lg:ml-12 lg:inline-flex ${navItemStyles} hover:cursor-pointer`}
        >
          {children}
        </Link>
      </li>
    </>
  );
};

export default ListItem;
