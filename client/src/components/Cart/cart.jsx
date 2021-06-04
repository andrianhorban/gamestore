import React, {useEffect, useState} from 'react';
import s from './style.module.css';
import {CartItem} from "./CartItem/cartitem";

function Cart() {
    const [cart, setCart] = useState([]);
    var sum = 0;
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
        fetch('http://127.0.0.1:5000/api/cart', {credentials: "include",}).then(response =>
            response.json().then(data => {
                setCart(data)
            })
        );
    });

    function Sum() {
        for (const item of chunks) {

            sum += item[0].price * item[0].quantity
        }
        console.log('Price')
        console.log(sum)
        return sum
    }

    const total_sum = Sum()
    return (
        <div className={s.body}>
            <div className={s.cart__div_main}>
                <div className={s.cart__total_price}>
                    Total price: ${total_sum}.00
                </div>

                {chunks.map((f) =>
                    <div>
                        {f.map((value) => (
                            <div className={s.game_list}>
                                <CartItem
                                    id={value.id}
                                    title={value.title}
                                    price={value.price}
                                    quantity={value.quantity}
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