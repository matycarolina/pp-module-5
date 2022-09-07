import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  fill,
  orderAlpha,
  filterNames,
  countFilterNames,
} from "../routes/getAllUsers";

interface User {
  id: number;
  email: string;
  name: string;
  age: number;
}

const General = () => {
  const [users, setUsers] = useState([]);

  const { state } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      fill(state.email, state.pwd).then((allUsers) => setUsers(allUsers));
    };

    fetchData().catch(console.error);
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

  return (
    <>
      <h3>All Users</h3>
      {usersList}
      <hr />
      <h3>Alphabetically Ordered</h3>
      {usersAlpha}
      <hr />
      <h3>A, B, C names</h3>
      {filteredNames}
      <hr />
      <h3>No. of A, B, C names</h3>
      {countNames}
    </>
  );
};

export default General;
