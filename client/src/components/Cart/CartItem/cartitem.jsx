import React, {useEffect, useState} from 'react';
import s from './style.module.css';

function CartItem({id, title, price}) {
    const [images, setImage] = useState([]);
    const chunks = images.reduce((chunks, value, index) => {
        const chunkIndex = Math.floor(index);
        if (!chunks[chunkIndex]) {
            chunks[chunkIndex] = [];
        }
        chunks[chunkIndex].push(value);
        return chunks;

    }, []);
    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/image').then(response =>
            response.json().then(data => {
                setImage(data)
            })
        );
    },[]);

    function handleDelete() {
        console.log('delete')
        const requestOptions = {
            method: 'Delete',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({id: id})
        };
        fetch('http://127.0.0.1:5000/api/cart', requestOptions)
            .then(response => console.log(response.json()))
            .then(data => console.log(data));

    }


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

    let temp = FindImage()
    return (

        <div className={s.cartitem__div_block}>
            <img className={s.cartitem__img_logo} src={`data:image/jpeg;base64,${temp}`} alt='image'/>
            <div className={s.cartitem__div_section_left}>
                <p className={s.cartitem__p_title}>{title}</p>
                <p className={s.cartitem__p_price}>${price}.00</p>
            </div>

            <div className={s.cartitem__div_section_right}>
                <div className={s.cartitem__div_section_left_2}>
                    asd
                </div>
                <div className={s.cartitem__div_section_right_2}>
                    <button className={s.cartitem__button_delete} onClick={handleDelete}>X</button>
                </div>
            </div>
        </div>
    )
}

export {CartItem}