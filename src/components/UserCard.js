import React from 'react';

export const UserCard = (props) => {
    let {
        avatar_url, 
        html_url, 
        login, 
        name,
    } = props.data;

    return (
        <div className="user-card"> 
            <img src={avatar_url} alt="" className="user-card__img"/>
            <div className="user-card__name">{name}</div>
            <div className="user-card__login">{login}</div>
            <a href={html_url} className="user-card__link">{html_url}</a>
        </div>
    )
}