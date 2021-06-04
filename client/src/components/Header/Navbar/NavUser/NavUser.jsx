import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import s from "../NavUser/style.module.css";
import {TokenContext} from "../../../../context/tokenContext";
import {Menu, MenuItem} from "@material-ui/core";


export default function NavUser() {

    const [tokenContext, setTokenContext, roleContext, setRoleContext, userContext, setUserContext] = useContext(TokenContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () =>{
         fetch('http://127.0.0.1:5000/logout').then(response =>
            response.json().then(data => {
                console.log(data)
            }))
        setTokenContext('')
        setRoleContext('')
        setUserContext('')
    }
    return (
        <div className={`${s.navsing__block} ${s.navsing__elem}`}>

            <img className={s.navuser__img}
                 src='https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX5559055.jpg'
                 alt='Logo'/>

            <Button classes={{label: s.navsing__but}} onClick={handleClick}>
                {userContext}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>

        </div>
    );
}
