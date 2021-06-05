import React, {useContext, useEffect, useState} from 'react';
import s from '../DetailedGame/style.module.css';
import {TokenContext} from "../../../context/tokenContext";
import {element} from "prop-types";


class DetailedGame extends React.Component {
    static contextType = TokenContext

    constructor(props) {
        super(props);

        this.state = {
            game: [],
            img: [],
            picture: '',
            title: '',
            text: '',
            price: '',
            genre: '',
            event: Event
        };

        this.handleBuy = this.handleBuy.bind(this)
    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/api/game').then(response =>
            response.json().then(data => {
                this.setState({game: data.find(element => element['id'] == this.context[4])})
                this.setState({
                    title: this.state.game['title'],
                    text: this.state.game['text'],
                    price: this.state.game['price'],
                    genre: this.state.game['genre']
                })
            })
        );
        fetch('http://127.0.0.1:5000/api/image').then(response =>
            response.json().then(data => {
                this.setState({img: data.find(element => element['game_id'] == this.context[4])})
                this.setState({picture: this.state.img['image']})
            })
        );
    }

    handleBuy(event, value) {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({id: this.context[4]})
        };
        fetch('http://127.0.0.1:5000/api/cart', requestOptions)
            .then(response => console.log(response.json()))
            .then(data => console.log(data));
    }

    render() {
        const {tokenContext, setTokenContext, roleContext, setRoleContext, idContext, setIdContext} = this.context
        let cont = this.context[4]
        return (

            <div className={s.body}>
                <div className={s.detailed__div_main}>

                    <div className={s.detailed__div_left}>

                        <img className={s.detailed__img} src={`data:image/jpeg;base64,${this.state.picture}`} alt='image'/>
                    </div>
                    <div className={s.detailed__div_right}>
                        <div className={s.detailed__div_title}>
                            {this.state.title}
                        </div>
                        <div className={s.detailed__div_genre}>
                            {this.state.genre}
                        </div>
                        <div className={s.detailed__div_text}>
                            {this.state.text}
                        </div>
                        <div className={s.detailed__div_price}>
                            Price: ${this.state.price}.00
                        </div>

                        <button className={s.detailed__button_buy} onClick={() => this.handleBuy()}>Add to cart</button>
                    </div>
                </div>
            </div>
        )
    }
}

export {DetailedGame};