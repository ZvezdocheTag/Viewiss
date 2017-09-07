import React from 'react'

export const ButtonLoad = (props) => { 
    let { state } = props.data;

    if(typeof state.user !== "undefined") {
      return state.user.public_repos > state.repos.length
         ? <a className="btn-load-more" onClick={props.loadMore}>Load more</a>
         : null
    } else {
      return <div className="cssload-jumping"></div>
    }
  }