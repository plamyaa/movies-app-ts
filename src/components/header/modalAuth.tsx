import { Box, Button, Modal, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleAuth } from "../../store/action";

interface IOpen {
    open: boolean,
    handleClose : () => void
}

export const ModalAuth: React.FC<IOpen> = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const onLoginChange = (event : React.SyntheticEvent ) : void => {
        const target = event.target as HTMLInputElement;
        setLogin(target.value);
    }
    const onPasswordChange = (event : React.SyntheticEvent ) : void => {
        const target = event.target as HTMLInputElement;
        setPassword(target.value);
    }
    const onSubmit = () : void => {
        if (login === 'login' && password === '0000') {
            alert('Successful authorization');
            dispatch(toggleAuth());
            handleClose();
        }
        else alert('Wrong login or password');
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Authorisation (login, 0000)
                </Typography>
                <TextField id="outlined-basic" label="Login" variant="outlined" onChange={onLoginChange}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={onPasswordChange}/>
                <Button onClick={onSubmit}>Submit</Button>
            </Box>
        </Modal>
    );
}

const style = {
    display: 'grid',
    rowGap: '10px',
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};