import React, { Component } from 'react'

const IssueCard = (props) => 
    <div className="issue-card">
        
        <div className="issue-card__body">
            <a 
            href={props.data.html_url} 
            className="issue-card__title">
                <span className="issue-card__number">{`#${props.data.number}:`}</span>
                {props.data.title}
            </a>
            <div className="issue-card__date">
                <span className="issue-card__date-labe">Created: </span>
                {props.data.created_at}
                <span className="issue-card__state" title={props.data.state}>{props.data.state}</span>
            </div>
        </div>
        
    </div>


export const IssuesList = (props) => {
    const { issues } = props;

    if(issues.length) {
        return             <div className="issue-list">
        {
            props.issues.map((item, i) => <IssueCard data={item} key={i}/>)
        }
        </div>

    } else {
        return <div className="issue-list">
            <li>No issues in the repository</li>
        </div>
    }

}
