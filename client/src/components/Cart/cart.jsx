import React, {useEffect, useState} from 'react';
import s from './style.module.css';
import {CartItem} from "./CartItem/cartitem";

function Cart() {
    const [cart, setCart] = useState([]);
    const chunks = cart.reduce((chunks, value, index) => {
        const chunkIndex = Math.floor(index);
        if (!chunks[chunkIndex]) {
            chunks[chunkIndex] = [];
        }
        chunks[chunkIndex].push(value);
        console.log("Chunks:")
        console.log(chunks)
        return chunks;

    }, []);
    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/cart',{credentials: "include",} ).then(response =>
            response.json().then(data => {
                setCart(data)
            })
        );
    },[]);

    return (
        <div className={s.body}>
            <div className={s.cart__div_main}>
            {chunks.map((f) =>
                <div>
                    {f.map((value) => (
                        <div className={s.game_list}>
                            <CartItem
                                id = {value.id}
                                title={value.title}
                                price={value.price}
                            />
                        </div>

                    ))}
                </div>
            )}
            </div>
        </div>

    );

}

export
{
    Cart
}