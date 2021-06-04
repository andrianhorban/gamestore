import React from "react";
import s from './style.module.css';

const Footer = () => {
    return (
        <div className={s.footer}>
            <div className={`${s.footer__block} ${s.footer__section_left}`}>
                Game Store

            </div>
            <div className={`${s.footer__block} ${s.footer__section_right}`}>
                Some info
            </div>

        </div>
    );
};

export default Footer;