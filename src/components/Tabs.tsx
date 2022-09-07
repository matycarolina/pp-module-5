import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useLocation } from "react-router-dom";
import { findUser } from "../routes/getUser";
import General from "./General";

const LabTabs = () => {
  const [value, setValue] = useState("1");
  const [profile, setProfile] = useState({});
  const { state } = useLocation();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchUser = async () => {
      findUser(state.email, state.pwd).then((user) => setProfile(user));
    };

    fetchUser().catch(console.error);
  }, []);

  const getProfile = Object.entries(profile).map(([key, value]) => (
    <div key={key}>
      <ul>
        <li>
          <>
            {key.toLocaleUpperCase()}: {value}
          </>
        </li>
      </ul>
    </div>
  ));

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Profile" value="1" />
            <Tab label="General Info" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">{getProfile}</TabPanel>
        <TabPanel value="2">{<General />}</TabPanel>
      </TabContext>
    </Box>
  );
};

export default LabTabs;
