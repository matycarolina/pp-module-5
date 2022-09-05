import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useLocation } from "react-router-dom";
import {
  fill,
  orderAlpha,
  filterNames,
  countFilterNames,
} from "../routes/getAllUsers";
import { findUser } from "../routes/getUser";

interface User {
  id: number;
  email: string;
  name: string;
  age: number;
}

const LabTabs = () => {
  const [value, setValue] = useState("1");
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState({});
  const { pathname, state } = useLocation();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      fill(state.email, state.pwd).then((allUsers) => setUsers(allUsers));
    };
    const fetchUser = async () => {
      findUser(state.email, state.pwd).then((user) => setProfile(user));
    };

    fetchData().catch(console.error);
    fetchUser().catch(console.error);
  }, []);

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
      {users.length == 0 && <h1>Credentials Not Found</h1>}
      {users.length !== 0 && (
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Profile" value="1" />
              <Tab label="All Users" value="2" />
              <Tab label="Alphabetically Ordered" value="3" />
              <Tab label="A, B, C names" value="4" />
              <Tab label="No. of A, B, C names" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">{getProfile}</TabPanel>
          <TabPanel value="2">{usersList}</TabPanel>
          <TabPanel value="3">{usersAlpha}</TabPanel>
          <TabPanel value="4">{filteredNames}</TabPanel>
          <TabPanel value="5">{countNames}</TabPanel>
        </TabContext>
      )}
    </Box>
  );
};

export default LabTabs;
