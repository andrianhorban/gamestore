import React, {useEffect, useState} from 'react';
import s from './style.module.css';
import {User} from './User/user';

function AdminPage() {
    const [users, setUser] = useState([]);
    const chunks = users.reduce((chunks, value, index) => {
        const chunkIndex = Math.floor(index);
        if (!chunks[chunkIndex]) {
            chunks[chunkIndex] = [];
        }
        chunks[chunkIndex].push(value);
        return chunks;

    }, []);
    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/user').then(response =>
            response.json().then(data => {
                setUser(data)
            })
        );
    });

    return (
        <div className={s.body}>
            {chunks.map((f) =>
                <div>
                    {f.map((value) => (
                        <div className={s.game_list}>
                            <User
                                name={value.name}
                                nick_name={value.nick_name}
                                mail={value.mail}
                                role={value.role}
                                age = {value.age}
                                id={value.id}
                            />
                        </div>

                    ))}
                </div>
            )}
        </div>

    );

}

export {AdminPage};