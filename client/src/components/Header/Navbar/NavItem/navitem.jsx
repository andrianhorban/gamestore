import React from "react";
import s from './style.module.css';
import {NavLink} from "react-router-dom";


const NavItem = ({path, text}) => {
    return (
        <NavLink
            exact
            className={`${s.navitem__block} ${s.navitem__elem}`}

            to={path}>

            {text}

        </NavLink>
    );
};

export default NavItem;