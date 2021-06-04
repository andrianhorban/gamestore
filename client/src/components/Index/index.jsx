import React, {useEffect, useState} from 'react';
import s from './style.module.css';
import {Game} from "./Game/game";

function Index() {
    const [games, setGames] = useState([]);
    const chunks = games.reduce((chunks, value, index) => {
        const chunkIndex = Math.floor(index);
        if (!chunks[chunkIndex]) {
            chunks[chunkIndex] = [];
        }
        chunks[chunkIndex].push(value);
        return chunks;

    }, []);
    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/game').then(response =>
            response.json().then(data => {
                setGames(data)
            })
        );
    }, []);

    return (
        <div className={s.body}>
            <div className={s.game__div_main}>
                {chunks.map((f) =>
                    <div>
                        {f.map((value) => (
                            <div className={s.game_list}>
                                <Game
                                    title={value.title}
                                    text={value.text}
                                    price={value.price}
                                    genre={value.genre}
                                    id={value.id}
                                />
                            </div>

                        ))}
                    </div>
                )}
            </div>
        </div>

    );

}

export {Index};