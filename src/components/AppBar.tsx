import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BasicButton from "./BasicButton";

const ButtonAppBar = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/login", { replace: true });
  };

  const { state } = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link to="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blog
            </Typography>
          </Link>

          <BasicButton
            label={state == null ? "LOGIN" : "LOGOUT"}
            onClick={() => handleClick()}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
