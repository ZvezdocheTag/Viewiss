import React, { Component } from 'react';

export const RepoCard = (props) => {
    let {name, created_at, id} = props.data;
    return (
        <div className="repo-card"> 
            <div className="repo-card__name">{name}</div>
            <div className="repo-card__date">{created_at}</div>
            <div className="repo-card__id">{id}</div>
        </div>
    )
}