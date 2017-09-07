import React from 'react';

export const RepoCard = (props) => {
    let {
        name, 
        description, 
        updated_at, 
        language, 
        html_url
    } = props.data;

    return (
        <div className="repo-card"> 
            <a href={html_url} className="repo-card__name">{name}</a>
            <div className="repo-card__description">{description}</div>
            <div className="repo-card__language">{language}</div>
            <div className="repo-card__update">
                <span>Last update:</span>
                <span>
                    {
                    updated_at.indexOf('T') !== -1
                        ? updated_at.slice(0, updated_at.indexOf('T'))
                        : updated_at
                    }
                </span>
            </div>
        </div>
    )
}