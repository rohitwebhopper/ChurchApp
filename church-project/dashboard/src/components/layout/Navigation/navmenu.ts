import { HiOutlineHome, HiOutlineLockClosed } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { FaChurch } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import { LuSquareActivity } from "react-icons/lu";
import { GoVersions } from "react-icons/go";
import { MdOndemandVideo } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { PiHandsPrayingBold } from "react-icons/pi";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";

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
      { label: "Roles", to: "/management/roles", icon: FaUserShield },
      { label: "Activity", to:  "/management/activity", icon: LuSquareActivity },     
    ],
  },

    {
    type: "dropdown",
    label: "Public Content",
    basePath: "/public",
    icon: GoVersions,
    children: [
      { label: "Sermons", to: "/public/sermons", icon: MdOndemandVideo },
      { label: "Events", to: "/public/events", icon: MdEventNote },
      { label: "Prayer Requests", to: "/public/prayer_requests", icon: PiHandsPrayingBold },
      { label: "Get Connected", to:  "/public/get_connected", icon: MdOutlineConnectWithoutContact },     
      { label: "Projects", to:  "/public/projects", icon: GoProjectSymlink },     
    ],
  },
];
