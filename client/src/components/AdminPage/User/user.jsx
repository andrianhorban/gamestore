import React, {useContext, useRef} from 'react';
import s from './style.module.css';
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {useHistory} from "react-router-dom";
import {TokenContext} from "../../../context/tokenContext";

function User({name, nick_name, role, age, mail, id}) {
    const [open, setOpen] = React.useState(false);
    const refRole = useRef(null)


    function handleEdit(value) {
        console.log(typeof (value.id))
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({
                id: id,
                role: refRole.current.value
            })
        };
        fetch('http://127.0.0.1:5000/api/user', requestOptions)
            .then(response => console.log(response.json()))
            .then(data => console.log(data));
        setOpen(false)
    }

    function handleDelete(value) {
        console.log(typeof (value.id))
        const requestOptions = {
            method: 'Delete',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({id: value.id})
        };
        fetch('http://127.0.0.1:5000/api/user', requestOptions)
            .then(response => console.log(response.json()))
            .then(data => console.log(data));
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>

            <p>{name}</p>
            <p>{nick_name}</p>
            <p>{role}</p>
            <p>{age}</p>
            <p>{mail}</p>
            <button className={s.user__edit_button} onClick={() => handleClickOpen()}>Edit</button>
            <button className={s.user__delete_button} onClick={() => handleDelete({id})}>Delete</button>
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
                        Enter new {name}'s role:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="role"
                        label="New role(admin, moder, user)"
                        type="text"
                        inputRef={refRole}
                        fullWidth


                    />
                </DialogContent>
                <DialogActions>
                    <Button className={s.navsing__button} onClick={handleEdit} color="primary">
                        Save
                    </Button>
                    <Button color="green" onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export {User};