import { HiOutlineHome, HiOutlineLockClosed } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { FaChurch } from "react-icons/fa";

export type NavLinkItem = {
  type: "link";
  label: string;
  to: string;
  icon: React.ElementType;
};

export type NavDropdownItem = {
  type: "dropdown";
  label: string;
  basePath: string;
  icon: React.ElementType;
  children: {
    label: string;
    to: string;
    icon: React.ElementType;
  }[];
};

export type NavItem = NavLinkItem | NavDropdownItem;

export const navItems: NavItem[] = [
  {
    type: "link",
    label: "Dashboard",
    to: "/dashboard",
    icon: HiOutlineHome,
  },

  {
    type: "dropdown",
    label: "Management",
    basePath: "/management",
    icon: HiOutlineLockClosed,
    children: [
      { label: "Church", to: "/management/church", icon: FaChurch },
      { label: "Users", to: "/management/user", icon: FiUsers },
    ],
  },
];
