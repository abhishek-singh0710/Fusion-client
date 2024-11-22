import React from "react";
import { Tabs, Group, MantineProvider, Button } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomBreadcrumbs from "./components/BreadCrumbs"; // Import the CustomBreadcrumbs component

const TabsModules = [
  {
    label: "Manage Bookings",
    id: "manage-bookings",
    url: "/visitors_hostel",
  },
  {
    label: "Room Availability",
    id: "room-availability",
    url: "/visitors_hostel/room-availability",
  },
  {
    label: "Mess Record",
    id: "mess-record",
    url: "/visitors_hostel/mess-record",
  },
  { label: "Inventory", id: "inventory", url: "/visitors_hostel/inventory" },
  {
    label: "Account Statement",
    id: "account-statement",
    url: "/visitors_hostel/account-statement",
  },
  {
    label: "Rules and Regulations",
    id: "rules",
    url: "/visitors_hostel/rules",
  },
];

const ManageBookingsTabs = [
  {
    label: "Bookings",
    id: "bookings",
    url: "/visitors_hostel/",
  },
  {
    label: "Cancelled Requests",
    id: "cancel-request",
    url: "/visitors_hostel/cancel_request",
  },
  {
    label: "Active Bookings",
    id: "active-bookings",
    url: "/visitors_hostel/active_bookings",
  },
  {
    label: "Completed Bookings",
    id: "completed-bookings",
    url: "/visitors_hostel/completed_bookings",
  },
];

export default function BookingManagement() {
  const [activeTab, setActiveTab] = React.useState("manage-bookings");
  const [activeSubTab, setActiveSubTab] = React.useState("bookings");
  const navigate = useNavigate();

  const handleTabChange = (tabId) => {
    const tab = TabsModules.find((t) => t.id === tabId);
    if (tab) {
      setActiveTab(tabId);
      navigate(tab.url);
    }
  };

  const handleSubTabChange = (tabId) => {
    const tab = ManageBookingsTabs.find((t) => t.id === tabId);
    if (tab) {
      setActiveSubTab(tabId);
      navigate(tab.url);
    }
  };

  const role = useSelector((state) => state.user.role);

  const filteredTabs = TabsModules.filter((tab) => {
    if (role === "VhCaretaker" || role === "VhIncharge") {
      return true;
    }
    return ["manage-bookings", "booking-form", "rules"].includes(tab.id);
  });

  const activeTabLabel = filteredTabs.find(
    (tab) => tab.id === activeTab,
  )?.label;
  const activeSubTabLabel = ManageBookingsTabs.find(
    (tab) => tab.id === activeSubTab,
  )?.label;

  const activeTabIndex = filteredTabs.findIndex((tab) => tab.id === activeTab);
  const activeSubTabIndex = ManageBookingsTabs.findIndex(
    (tab) => tab.id === activeSubTab,
  );

  const handleNextTab = () => {
    if (activeTabIndex < filteredTabs.length - 1) {
      const nextTab = filteredTabs[activeTabIndex + 1];
      handleTabChange(nextTab.id);
    }
  };

  const handlePreviousTab = () => {
    if (activeTabIndex > 0) {
      const prevTab = filteredTabs[activeTabIndex - 1];
      handleTabChange(prevTab.id);
    }
  };

  const handleNextSubTab = () => {
    if (activeSubTabIndex < ManageBookingsTabs.length - 1) {
      const nextTab = ManageBookingsTabs[activeSubTabIndex + 1];
      handleSubTabChange(nextTab.id);
    }
  };

  const handlePreviousSubTab = () => {
    if (activeSubTabIndex > 0) {
      const prevTab = ManageBookingsTabs[activeSubTabIndex - 1];
      handleSubTabChange(prevTab.id);
    }
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <CustomBreadcrumbs
        activeTab={activeTabLabel}
        subTab={activeSubTabLabel}
      />
      <div className="booking-management">
        <Group position="apart" noWrap>
          <Button
            variant="subtle"
            compact
            onClick={handlePreviousTab}
            disabled={activeTabIndex === 0}
          >
            <IconChevronLeft size={18} />
          </Button>
          <Tabs value={activeTab} onTabChange={handleTabChange}>
            <Tabs.List>
              {filteredTabs.map((tab) => (
                <Tabs.Tab
                  key={tab.id}
                  value={tab.id}
                  onClick={() => handleTabChange(tab.id)} // Ensure clicking on the tab works
                  sx={() => ({
                    fontWeight: activeTab === tab.id ? "bold" : "normal",
                  })}
                >
                  {tab.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
          <Button
            variant="subtle"
            compact
            onClick={handleNextTab}
            disabled={activeTabIndex === filteredTabs.length - 1}
          >
            <IconChevronRight size={18} />
          </Button>
        </Group>
        {activeTab === "manage-bookings" && (
          <div className="tabs-container" style={{ marginBottom: 30 }}>
            <Group position="apart" noWrap>
              <Button
                variant="subtle"
                compact
                onClick={handlePreviousSubTab}
                disabled={activeSubTabIndex === 0}
              >
                <IconChevronLeft size={18} />
              </Button>
              <Tabs value={activeSubTab} onTabChange={handleSubTabChange}>
                <Tabs.List>
                  {ManageBookingsTabs.map((tab) => (
                    <Tabs.Tab
                      key={tab.id}
                      value={tab.id}
                      onClick={() => handleSubTabChange(tab.id)} // Ensure clicking on the sub-tab works
                      sx={() => ({
                        fontWeight: activeSubTab === tab.id ? "bold" : "normal",
                      })}
                    >
                      {tab.label}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs>
              <Button
                variant="subtle"
                compact
                onClick={handleNextSubTab}
                disabled={activeSubTabIndex === ManageBookingsTabs.length - 1}
              >
                <IconChevronRight size={18} />
              </Button>
            </Group>
          </div>
        )}
      </div>
      <style>{`
        .booking-management {
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .top-nav ul {
          list-style-type: none;
          padding: 0;
          margin: 0 0 20px 0;
          display: flex;
          gap: 10px;
        }
        .top-nav li {
          color: #666;
          font-size: 14px;
        }
        .top-nav li.active {
          font-weight: bold;
        }
        .top-nav li:not(:last-child)::after {
          content: "|";
          margin-left: 10px;
          color: #ccc;
        }
        .tabs-container {
          background-color: #f0f0f0;
          border-radius: 4px;
          padding: 10px;
        }
      `}</style>
    </MantineProvider>
  );
}
