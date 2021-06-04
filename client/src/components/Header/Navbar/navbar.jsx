import React, {useContext, useReducer, useState} from "react";
import s from './style.module.css';
import NavItem from './NavItem/navitem'
import NavSign from "./NavSign/navsing";
import {TokenContext} from "../../../context/tokenContext";

function Navbar({setToken}) {
    function getToken() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    }

    const [tokenContext, setTokenContext, roleContext, setRoleContext] = useContext(TokenContext)
    return (

        <div className={s.navbar}>
            <NavItem path="/" text='Games'/>
            <NavItem path="/community" text='Community'/>
            <NavItem path="/about" text='About'/>
            <NavItem path="/support" text='Support'/>
            <NavItem path="/cart" text='Cart'/>
            {roleContext === 'admin' && <NavItem path="/users" text='Users'/>}
            {!tokenContext && <NavSign setToken={setToken} path="/login" text='Sign in'/>}
        </div>
    );

};

export default Navbar;