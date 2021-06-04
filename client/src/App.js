import React, {useState} from 'react';
import {Index} from "./components/Index";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import {Cart} from "./components/Cart/cart";
import {Register} from "./components/Auth/Register/register";
import {TokenContext} from "./context/tokenContext";
import {Image} from "./components/Image/image";
import {AdminPage} from "./components/AdminPage/adminPage";
import {AddGame} from "./components/Index/AddGame/AddGame";
import {DetailedGame} from "./components/Index/DetailedGame/DetailedGame";


function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

function App() {
    const [tokenContext, setTokenContext] = useState("");
    const [roleContext, setRoleContext] = useState("");
    const [idContext, setIdContext] = useState("");
    return (
        <div className="App">

            <BrowserRouter>
                <TokenContext.Provider
                    value={[tokenContext, setTokenContext, roleContext, setRoleContext, idContext, setIdContext]}>
                    <Header setToken={setToken}/>
                    <Switch>
                        <Route exact path='/'>
                            <Index/>
                        </Route>
                        <Route exact path='/cart'>
                            <Cart/>
                        </Route>
                        <Route exact path='/register'>
                            <Register/>
                        </Route>
                        <Route exact path='/edit'>
                            {roleContext === 'admin' && <Image/>}
                        </Route>
                        <Route exact path='/users'>
                            {roleContext === 'admin' && <AdminPage/>}
                        </Route>
                        <Route exact path='/add_game'>
                            {roleContext === 'admin' && <AddGame/>}
                        </Route>
                        <Route exact path='/detailed_game'>
                            <DetailedGame/>
                        </Route>
                    </Switch>
                    <Footer/>
                </TokenContext.Provider>
            </BrowserRouter>
        </div>
    );

}

export {App};