import React, { useState } from "react";
import classNames from "classnames";
import { FcBullish } from "react-icons/fc";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../consts/navigation";
import { Link, useLocation } from "react-router-dom";
import { HiChevronDown, HiChevronUp, HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../../App"; // Import useAuth to get the user role
import { useNavigate } from "react-router-dom";

const linkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {
  const { role } = useAuth(); // Get user role from context

  const navigate = useNavigate();

  const logoutFunction = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id_user");
  };

  // Debugging role
  console.log("User role:", role);

  // Filter sidebar links based on user role
  const getFilteredLinks = (links) => {
    if (!Array.isArray(links)) {
      console.warn("Invalid links data:", links);
      return [];
    }

    console.log("Original links:", links); // Debugging

    return links.filter((link) => link.roles.includes(role));
  };

  const sidebarLinks = getFilteredLinks(DASHBOARD_SIDEBAR_LINKS());
  const bottomLinks = getFilteredLinks(DASHBOARD_SIDEBAR_BOTTOM_LINKS());

  // Debugging filtered links
  console.log("Filtered sidebar links:", sidebarLinks);
  console.log("Filtered bottom links:", bottomLinks);

  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={24} />
        <span className="text-neutral-100 text-lg">Dashboard</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {sidebarLinks.length ? (
          sidebarLinks.map((item) => <SidebarLink key={item.key} item={item} />)
        ) : (
          <p>No sidebar links available</p>
        )}
      </div>
      <div>
        {/* {bottomLinks.length ? (
          bottomLinks.map((item) => <SidebarLink key={item.key} item={item} />)
        ) : (
          <p>No bottom links available</p>
        )} */}
        <div
          className={classNames("text-red-500 cursor-pointer", linkClasses)}
          onClick={() => {
            logoutFunction();
            navigate("/");
          }}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ item }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (item.subLinks) {
    return (
      <div>
        <div
          onClick={handleToggle}
          className={classNames(
            pathname === item.path
              ? "bg-neutral-700 text-white"
              : "text-neutral-400",
            linkClasses,
            "cursor-pointer"
          )}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="flex-1">{item.label}</span>
          {isOpen ? <HiChevronDown /> : <HiChevronUp />}
        </div>
        <div
          className={classNames(
            "transition-all duration-1000 ease-in-out overflow-hidden",
            {
              "max-h-0": !isOpen,
              "max-h-screen": isOpen,
            }
          )}
        >
          {isOpen && (
            <div className="pl-6">
              {item.subLinks.map((subItem) => (
                <Link
                  key={subItem.key}
                  to={subItem.path}
                  className={classNames(
                    pathname === subItem.path
                      ? "bg-neutral-700 text-white"
                      : "text-neutral-400",
                    linkClasses
                  )}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? "bg-neutral-700 text-white"
          : "text-neutral-400",
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}
