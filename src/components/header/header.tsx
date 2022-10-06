import { Box, Button, Link } from "@mui/material";
import React, { useState } from "react";
import { ModalAuth } from "./modalAuth";
import { useSelector } from 'react-redux'
import { IRootReducer } from "../../store/reducer";
import { useDispatch } from "react-redux";
import { toggleAuth } from "../../store/action";
import { Link as RouterLink } from "react-router-dom";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector<IRootReducer, boolean>(state => state.authToggler.auth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => 
    auth === true ? dispatch(toggleAuth()) : setOpen(true);
  return (
    <Box sx={{
      bgcolor: 'cornflowerblue',

    }}>
      <Box sx={{
        margin: 'auto',
        height: '45px',
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '2000px'
      }}>
        <Link sx={{
          marginLeft: '20px',
        }}
          underline={'hover'}
          color={'#fff'}
          variant={'h6'}
          component={RouterLink}
          to="/movies-app-ts"
        >Home</Link>
        <Button sx={{
          marginRight: '20px',
          bgcolor: 'aquamarine',
          color: 'black'
        }}
          variant="outlined"
          onClick={handleOpen}
        >{(auth ? "Выйти" : "Войти")}</Button>
        <ModalAuth open={open} handleClose={() => setOpen(false)}></ModalAuth>
      </Box>

    </Box>
  );
}
