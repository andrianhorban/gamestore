import React, {useReducer} from "react";
import s from './style.module.css';
import Navbar from './Navbar/navbar'

function Header({setToken}) {
    return (

        <div className={s.header}>

            <div className={`${s.header__block} ${s.header__title}`}>
                Game Store
            </div>
            <Navbar setToken={setToken}/>


        </div>
    );
};

export default Header;