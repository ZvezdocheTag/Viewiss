import React, { Component } from 'react'

export const ButtonLoad = (props) => { 
    if(typeof props.data.user !== "undefined") {
      return props.data.user.public_repos > props.data.repos.length ? <button className="btn-load-more"onClick={props.loadMore}>Load more</button> : null
    } else {
      return <div className="cssload-jumping">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
    }
  }