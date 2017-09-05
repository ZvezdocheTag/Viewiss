import React from 'react'

export const ButtonLoad = (props) => { 
    let state = props.data.state;
    if(typeof state.user !== "undefined") {
      return state.user.public_repos > state.repos.length ? <button className="btn-load-more"onClick={props.loadMore}>Load more</button> : null
    } else {
      return <div className="cssload-jumping">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
    }
  }