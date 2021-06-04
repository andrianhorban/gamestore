import React, {useContext, useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import s from "../NavSign/style.module.css";
import {useHistory} from "react-router-dom";
import PropTypes from 'prop-types';
import {TokenContext} from "../../../../context/tokenContext";


export default function NavSign({setToken}) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const refMail = useRef(null)
    const refPassword = useRef(null)
    let history = useHistory();


    const [tokenContext, setTokenContext, roleContext, setRoleContext, userContext, setUserContext] = useContext(TokenContext);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    function handleLog() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({
                mail: refMail.current.value,
                password: refPassword.current.value
            })
        };
        fetch('http://127.0.0.1:5000/login', requestOptions)
            .then(response => response.json())
            .then(data => setData(data));

        AddContext()
        setOpen(false)
    }

    function AddContext(){
        setTokenContext(data.user.token)
        setRoleContext(data.user.role)
        setUserContext(data.user.nick_name)
        setToken(data.user.token);
    }


    function handleReg() {
        setOpen(false)
        history.push('/register')
    }


    return (
        <div className={`${s.navsing__block} ${s.navsing__elem}`}>
            <Button classes={{label: s.navsing__but}} onClick={handleClickOpen}>
                Sing In
            </Button>
            <Dialog
                open={open}

                onClose={handleClose}
                PaperProps={{
                    style: {
                        color: '#181818',
                        backgroundColor: '#ececec',
                        boxShadow: 'none',
                        borderRadius: '25px'
                    },
                }}>
                <DialogTitle id="form-dialog-slide-title"> Sing In</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your login and password or register now.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="mail"
                        label="Email Address"
                        type="email"
                        inputRef={refMail}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        inputRef={refPassword}
                        fullWidth


                    />
                </DialogContent>
                <DialogActions>
                    <Button className={s.navsing__button} onClick={handleLog} color="primary">
                        Log In
                    </Button>
                    <Button onClick={handleReg} color="green">
                        Register now
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
NavSign.propTypes = {
    setToken: PropTypes.func.isRequired
};