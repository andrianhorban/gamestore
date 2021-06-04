import React, {useContext, useEffect, useState} from 'react';
import s from './style.module.css';
import Button from "@material-ui/core/Button";
import {Link, useHistory} from "react-router-dom";
import {Image} from "../../Image/image";
import {TokenContext} from "../../../context/tokenContext";


function Game({title, text, price, genre, id}) {
    let history = useHistory()

    const [images, setImage] = useState([]);
    const chunks = images.reduce((chunks, value, index) => {
        const chunkIndex = Math.floor(index);
        if (!chunks[chunkIndex]) {
            chunks[chunkIndex] = [];
        }
        chunks[chunkIndex].push(value);
        return chunks;

    }, []);
    const [tokenContext, setTokenContext, roleContext, setRoleContext, idContext, setIdContext] = useContext(TokenContext)
    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/image').then(response =>
            response.json().then(data => {
                setImage(data)
            })
        );
    },[]);

    function FindImage() {
        for (let i of chunks) {
            for (let j of i) {
                if (j['game_id'] == id) {
                    let temp = j['image']
                    return temp
                }
            }
        }
    }

    function handleBuy(value) {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({id: value.id})
        };
        fetch('http://127.0.0.1:5000/api/cart', requestOptions)
            .then(response => console.log(response.json()))
            .then(data => console.log(data));
    }

    function handleEdit(value) {
        setIdContext(id)
        history.push({
            pathname: '/image',
            state: {id: id}
        })
    }

    function handleDelete() {
        const requestOptions = {
            method: 'Delete',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({id: id})
        };
        fetch('http://127.0.0.1:5000/api/game', requestOptions)
            .then(response => console.log(response.json()))
            .then(data => console.log(data));
    }

    let temp = FindImage()
    return (
        <div className={s.game__div_main}>
            <img className={s.img} src={`data:image/jpeg;base64,${temp}`} alt='image'/>
            <div className={s.game__div_upper}>
                <div className={s.game__section_left}>
                    <div className={s.game__div_price}>
                        ${price}.00
                    </div>
                    <div>
                        {genre}
                    </div>
                    <div className={s.game__div_title}>
                        {title}
                    </div>


                </div>
                <div className={s.game__section_right}>
                    <button className={s.game__buy_button} onClick={() => handleBuy({id})}>Buy</button>
                    <button className={s.game__info_button} onClick={() => handleEdit()}>Detailed</button>

                </div>

            </div>


        </div>
    )
}

export {Game};