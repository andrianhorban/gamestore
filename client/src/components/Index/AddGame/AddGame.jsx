import React, {useContext} from "react";
import axios from 'axios';
import s from '../AddGame/style.module.css';
import {TokenContext} from "../../../context/tokenContext";

class AddGame extends React.Component {
    static contextType = TokenContext

    constructor(props) {
        super(props);
        console.log(this.props.search)
        this.state = {
            imageURL: '',
            data: '',
            id: '',
            title: '',
            genre: '',
            price: 0,
            text: '',
            quantity: 0,
            event: Event
        };
        console.log(this.state)
        this.handleSaveChanges = this.handleSaveChanges.bind(this)
        this.handleChangeGenre = this.handleChangeGenre.bind(this)
        this.handleChangePrice = this.handleChangePrice.bind(this)
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
        this.handleChangeText = this.handleChangeText.bind(this)
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
    }

    handleChangeTitle(event) {
        this.setState({
            title: event.target.value,
        });
        event.preventDefault();
    }

    handleChangeText(event) {
        this.setState({
            text: event.target.value,
        });
        event.preventDefault();
    }

    handleChangePrice(event) {
        this.setState({
            price: event.target.value,
        });
        event.preventDefault();
    }

    handleChangeQuantity(event) {
        this.setState({
            quantity: event.target.value,
        });
        event.preventDefault();
    }

    handleChangeGenre(event) {
        this.setState({
            genre: event.target.value,
        });
        event.preventDefault();
    }


    handleSaveChanges(ev) {
        const formData = new FormData();
        formData.append("file", this.uploadInput.files[0]);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({
                title: this.state.title,
                genre: this.state.genre,
                text: this.state.text,
                price: this.state.price,
                quantity: this.state.quantity
            })
        }
        console.log(requestOptions.body)
        fetch('http://127.0.0.1:5000/api/game', requestOptions)
            .then(response => console.log(response.json()))
            .then(data => console.log(data)).then(axios({
            method: 'post',
            url: 'http://localhost:5000/api/image',
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        }))



        ev.preventDefault()

    }

    render() {
        const {tokenContext, setTokenContext, roleContext, setRoleContext, idContext, setIdContext} = this.context
        let cont = this.context[4]
        return (
            <div className={s.body}>
                <div className={s.form__div}>
                    <form>
                        <div>
                            <label>
                                New title:
                                <input type="text" value={this.state.value} onChange={this.handleChangeTitle}/>
                            </label>
                            <label>
                                New text:
                                <textarea className={s.form__textarea} placeholder='Description of a game'
                                          value={this.state.value} onChange={this.handleChangeText}/>
                            </label>
                            <label>
                                New price:
                                <input type="text" value={this.state.value} onChange={this.handleChangePrice}/>
                            </label>
                            <label>
                                Quantity:
                                <input type="text" value={this.state.value} onChange={this.handleChangeQuantity}/>
                            </label>

                            <label>
                                Genre:
                                <input type="text" value={this.state.value} onChange={this.handleChangeGenre}/>
                            </label>
                            <label>
                                Picture:
                                <input ref={(ref) => {
                                    this.uploadInput = ref;
                                }} type="file"/>
                            </label>
                            <button onClick={this.handleSaveChanges} value={cont}> Add Game</button>

                        </div>


                    </form>
                </div>
            </div>
        );
    }
}

export {
    AddGame
};