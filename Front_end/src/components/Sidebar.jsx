import React, { useState } from "react";
import classNames from "classnames";
import { FcBullish } from "react-icons/fc";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../lib/consts/navigation";
import { Link, useLocation } from "react-router-dom";
import { HiChevronDown, HiChevronUp, HiOutlineLogout } from "react-icons/hi";

const linkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {
  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={24} />
        <span className="text-neutral-100 text-lg">CapyShop</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div>
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div className={classNames("text-red-500 cursor-pointer", linkClasses)}>
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
          className={classNames("transition-all duration-1000 ease-in-out overflow-hidden", {
            "max-h-0": !isOpen,
            "max-h-screen": isOpen,
          })}
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
