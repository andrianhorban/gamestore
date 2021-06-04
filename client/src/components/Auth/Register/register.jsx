import React from "react";
import s from "./style.module.css";
import {Redirect} from "react-router";


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Your name',
            age: 0,
            nick_name: ' Your nick-name',
            password: 'Your password',
            mail: 'forexample@mail.com',
            redirect: false
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeNick = this.handleChangeNick.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeNick(event) {
        this.setState({
            nick_name: event.target.value,
        });
        event.preventDefault();
    }

    handleChangePassword(event) {
        this.setState({
            password: event.target.value,
        });
        event.preventDefault();
    }

    handleChangeMail(event) {
        this.setState({
            mail: event.target.value,
        });
        event.preventDefault();
    }

    handleChangeName(event) {
        this.setState({
            name: event.target.value,
        });
        event.preventDefault();
    }

    handleChangeAge(event) {
        this.setState({
            age: event.target.value,
        });
        event.preventDefault();
    }

    handleSubmit(event) {
        this.setState({
            redirect: true
        })
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({
                name: this.state.name,
                age: this.state.age,
                password: this.state.password,
                nick_name: this.state.nick_name,
                mail: this.state.mail
            })
        }
        console.log(requestOptions.body)
        fetch('http://127.0.0.1:5000/register', requestOptions)
            .then(response => console.log(response.json()))
            .then(data => console.log(data));

    }


    render() {
        const redirect = this.state.redirect
        if (redirect) {
            return <Redirect to="/thanks/reg"/>;
        }
        return (
            <div className={s.body}>
                <div className={s.form__div}>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Your name:
                            <input type="text" value={this.state.value} onChange={this.handleChangeName}/>
                        </label>
                        <label>
                            Nick name:
                            <input type="text" value={this.state.value} onChange={this.handleChangeNick}/>
                        </label>
                        <label>
                            Your age:
                            <input type="text" value={this.state.value} onChange={this.handleChangeAge}/>
                        </label>
                        <label>
                            Email (forexample@mail.com):
                            <input type="text" value={this.state.value} onChange={this.handleChangeMail}/>
                        </label>
                        <label>
                            Password:
                            <input type="password" value={this.state.value} onChange={this.handleChangePassword}/>
                        </label>
                        <input type="submit" value="Register!"/>
                    </form>
                </div>
            </div>
        )
    }

}

export {Register}