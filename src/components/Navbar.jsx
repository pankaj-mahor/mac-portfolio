import React from "react";
import { navIcons, navLinks } from "@constants";
import dayjs from "dayjs";

const Navbar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo  " />
        <p className="font-bold">Pankaj Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, link }) => (
            <li key={id} className="">
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id} className="">
              <img src={img} alt={`icon-${id}`} className="icon-hover" />
            </li>
          ))}
        </ul>
        <time dateTime={dayjs().format("YYYY-MM-DDTHH:mm:ss")}>
          {dayjs().format("ddd, MMMM D, h:mm A")}
        </time>
      </div>
    </nav>
  );
};

export default Navbar;
