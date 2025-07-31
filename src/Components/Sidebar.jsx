import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaTachometerAlt, FaBuilding, FaInfoCircle, FaBoxOpen, FaConciergeBell,
  FaUserFriends, FaPlusCircle, FaFileInvoice, FaMoneyBillWave, FaStar,
  FaFileAlt, FaDownload, FaCog, FaBell, FaCalculator, FaGift, FaClock,
  FaSync, FaHeadphones, FaUsers, FaChartLine
} from "react-icons/fa";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const sections = [
  {
    title: "Main Menu",
    items: [
      { label: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    ],
  },
  // {
  //   title: "Business Profile",
  //   items: [
  //     { label: "Basic Details", icon: <FaBuilding />, path: "/dashboard/basic-details" },
  //   ],
  // },

  {
  title: "Admin Roles",
  items: [
    { label: "Admin List", icon: <FaUsers />, path: "/dashboard/admin-list" },
    { label: "Role Permissions", icon: <FaCog />, path: "/dashboard/Role-permisson" },
    { label: "Activity History", icon: <FaClock />, path: "/dashboard/activity-history" },
    { label: "Session Management", icon: <FaSync />, path: "/dashboard/session-management" },
  ],
},
{
  title: "Notifications",
  items: [
    { label: "Notification List", icon: <FaBell />, path: "/dashboard/notification-list" },
    { label: "Notification Settings", icon: <FaCog />, path: "/dashboard/notification-settings" },
  ],
},
{
  title: "Rewards",
  items: [
    { label: "Manage Rewards", icon: <FaGift />, path: "/dashboard/manage-reward" },
    { label: "Reward Analytics", icon: <FaChartLine />, path: "/dashboard/rewards-analytics" },
  ],
},
{
  title: "Transaction History",
  items: [
    { label: "Total Sales", icon: <FaMoneyBillWave />, path: "/dashboard/total-Sales" },
    { label: "Total Paid", icon: <FaMoneyBillWave />, path: "/dashboard/total-Paid" },
    { label: "Total Pending", icon: <FaMoneyBillWave />, path: "/dashboard/total-Pending" },
    { label: "Total Business", icon: <FaBuilding />, path: "/dashboard/total-Business" },
    { label: "Total Invoice", icon: <FaFileInvoice />, path: "/dashboard/total-Invoice" },
    { label: "Total Package", icon: <FaBoxOpen />, path: "/dashboard/total-Package" },
  ],
},
{
  title: "Support",
  items: [
    { label: "Support Tickets", icon: <FaHeadphones />, path: "/dashboard/supportTickets" },
    { label: "Live Chat", icon: <FaSync />, path: "/dashboard/live-Chat" },
    { label: "Knowledge Base", icon: <FaInfoCircle />, path: "/dashboard/knowledge-Base" },
  ],
},
{
  title: "Admin Settings",
  items: [
    { label: "Profile", icon: <FaUserFriends />, path: "/dashboard/profile" },
    { label: "Platform Settings", icon: <FaCog />, path: "/dashboard/platform-Setting" },
    { label: "Role Settings", icon: <FaUsers />, path: "/dashboard/role-Setting" },
    { label: "Security Settings", icon: <FaUsers />, path: "/dashboard/security-Setting" },
    { label: "Custom Branding", icon: <FaFileAlt />, path: "/dashboard/custom-Branding" },
  ],
},

  // {
  //   title: "Items",
  //   items: [
  //     { label: "Products", icon: <FaBoxOpen />, path: "/dashboard/product" },
  //     { label: "Product List", icon: <FaConciergeBell />, path: "/dashboard/product-list" },
  //     { label: "Stock-list", icon: <FaConciergeBell />, path: "/dashboard/stock-list" },
  //   ],
  // },

  
  // {
  //   title: "People",
  //   items: [
  //     { label: "Staff Roles", icon: <FaUserFriends />, path: "/dashboard/staff-role" },
  //     { label: "Staff Details", icon: <FaUserFriends />, path: "/dashboard/staff-details" },
  //     { label: "Add Customer", icon: <FaPlusCircle />, path: "/dashboard/add-customer" },
  //     { label: "Customer Details", icon: <FaUsers />, path: "/dashboard/customer-details" },
  //   ],
  // },
  // {
  //   title: "Transactions",
  //   items: [
  //     { label: "Create Invoice", icon: <FaFileInvoice />, path: "/dashboard/create-invoice" },
  //     { label: "Payment Collection", icon: <FaMoneyBillWave />, path: "/dashboard/payment-collection" },
  //     { label: "Payment Collection List", icon: <FaMoneyBillWave />, path: "/dashboard/payment-collectionList" },
  //     { label: "Credit Score", icon: <FaStar />, path: "/dashboard/credit-score" },
  //     { label: "Expenses", icon: <FaFileAlt />, path: "/dashboard/expenses" },
  //     { label: "Expenses List", icon: <FaFileAlt />, path: "/dashboard/expenses-list" },
  //   ],
  // },
  //     
  // {
  //   title: "More",
  //   items: [
  //     { label: "Rewards", icon: <FaGift />, path: "/dashboard/reward" },
  //     { label: "Coming Soon", icon: <FaGift />, path: "/dashboard/commingsoon" },
  //     { label: "Updates", icon: <FaSync />, path: "/dashboard/updates" },
  //     { label: "Support", icon: <FaHeadphones />, path: "/dashboard/supports" },
  //   ],
  // },
];

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div
      className={`bg-[#3B82F6] h-full transition-all duration-300 p-3 custom-scrollbar overflow-y-auto hover:overflow-y-scroll ${
        isOpen ? "w-56" : "w-16"
      }`}
    >
      <div className="space-y-5">
        {sections.map((section, index) => (
          <div key={index}>
            <div
              className={`flex justify-between items-center cursor-pointer text-sm font-robotoM text-white uppercase tracking-wide mb-2 ${
                isOpen ? "px-1" : "hidden"
              }`}
              onClick={() => toggleSection(section.title)}
            >
              <span>{section.title}</span>
              <span>
                {openSections[section.title] ? (
                  <FaChevronUp size={12} />
                ) : (
                  <FaChevronDown size={12} />
                )}
              </span>
            </div>

            {openSections[section.title] && (
              <ul className={`${isOpen ? "block" : "hidden"}`}>
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      className="mb-2 hover:bg-white hover:text-[#2563EB] text-white p-2  font-robotoM  rounded-md flex items-center gap-3 cursor-pointer block"
                    >
                      {item.icon}
                      {isOpen && <span>{item.label}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
