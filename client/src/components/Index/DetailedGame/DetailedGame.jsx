import React, {useContext, useEffect, useState} from 'react';
import s from '../Game/style.module.css';
import {Link, useHistory} from "react-router-dom";
import {TokenContext} from "../../../context/tokenContext";


function DetailedGame() {
    let history = useHistory()

    const [games, setGames] = useState([]);
    const [images, setImage] = useState([]);
    const game_list = games.reduce((game_list, value, index) => {
        const chunkIndex = Math.floor(index);
        if (!game_list[chunkIndex]) {
            game_list[chunkIndex] = [];
        }
        game_list[chunkIndex].push(value);
        return game_list;

    }, []);

    const img_list = images.reduce((img_list, value, index) => {
        const chunkIndex = Math.floor(index);
        if (!img_list[chunkIndex]) {
            img_list[chunkIndex] = [];
        }
        img_list[chunkIndex].push(value);
        return img_list;

    }, []);

    const [tokenContext, setTokenContext, roleContext, setRoleContext, idContext, setIdContext] = useContext(TokenContext)
    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/game').then(response =>
            response.json().then(data => {
                setGames(data)
            })
        );
        fetch('http://127.0.0.1:5000/api/image').then(response =>
            response.json().then(data => {
                setImage(data)
            })
        );
    });

    function FindGame() {
        for (let i of game_list) {
            for (let j of i) {
                if (j['game_id'] == idContext) {
                    let temp = j
                    return temp
                }
            }
        }
    }

    function FindImage() {
        for (let i of img_list) {
            for (let j of i) {
                if (j['game_id'] == idContext) {
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
            body: JSON.stringify({id: idContext})
        };
        fetch('http://127.0.0.1:5000/api/cart', requestOptions)
            .then(response => console.log(response.json()))
            .then(data => console.log(data));
    }


    let game = FindGame()
    let imag = FindImage()
    return (
        <div>

            <p>{game.title}</p>
            <p>{game.text}</p>
            <p>{game.genre}</p>
            <p>{game.price}</p>
            <img className={s.img} src={`data:image/jpeg;base64,${imag}`} alt='image'/>
            <button className={s.game__buy_button} onClick={() => handleBuy()}>Buy</button>


        </div>
    )
}

export {DetailedGame};