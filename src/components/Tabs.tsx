import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  fill,
  orderAlpha,
  filterNames,
  countFilterNames,
  BASE_URL,
} from "../controller/functions";

interface User {
  id: number;
  email: string;
  name: string;
  age: number;
}

const LabTabs = () => {
  const [value, setValue] = useState("1");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      fill().then((user) => setUsers(user));
    };

    fetchData().catch(console.error);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const usersList = users.map((user: User, index) => {
    return (
      <div key={index}>
        <ul>
          <li>
            <h4> {user.name}</h4>
            <p> {user.email}</p>
          </li>
        </ul>
      </div>
    );
  });

  const usersAlpha = orderAlpha(users).map((user, index) => {
    return (
      <div key={index}>
        <ul>
          <li>
            <h4> {user}</h4>
          </li>
        </ul>
      </div>
    );
  });
  const filteredNames = filterNames(users).map((user, index) => {
    return (
      <div key={index}>
        <ul>
          <li>
            <h4> {user.name}</h4>
            <p> {user.email}</p>
          </li>
        </ul>
      </div>
    );
  });

  const countNames = Object.entries(countFilterNames(users)).map(
    ([key, value]) => (
      <div key={key}>
        <ul>
          <li>
            <h4>
              {" "}
              Names with {key.toLocaleUpperCase()}: {value}
            </h4>
          </li>
        </ul>
      </div>
    )
  );

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All Users" value="1" />
            <Tab label="Alphabetically Ordered" value="2" />
            <Tab label="A, B, C names" value="3" />
            <Tab label="No. of A, B, C names" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">{usersList}</TabPanel>
        <TabPanel value="2">{usersAlpha}</TabPanel>
        <TabPanel value="3">{filteredNames}</TabPanel>
        <TabPanel value="4">{countNames}</TabPanel>
      </TabContext>
    </Box>
  );
};

export default LabTabs;
