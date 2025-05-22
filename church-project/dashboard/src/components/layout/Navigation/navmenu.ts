import { HiOutlineHome, HiOutlineLockClosed } from "react-icons/hi";
import { MdAdminPanelSettings } from "react-icons/md";

// Define nav item types
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
    type: "link",
    label: "User Management",
    to: "/user-management",
    icon: MdAdminPanelSettings,
  },
  {
    type: "dropdown",
    label: "Authenticaton",
    basePath: "/auth",
    icon: HiOutlineLockClosed,
    children: [
      { label: "Login", to: "/auth/login" },
      { label: "Register", to: "/auth/register" },
      { label: "Forgot Password", to: "/auth/forgot-password" },
    ],
  },
];
