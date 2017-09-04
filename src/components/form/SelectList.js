import React, { Component } from 'react'
import { ButtonLoad } from './ButtonLoad'

export const SelectList = (props) => {
    let { repos, pickRepos, state, loadMore } = props;
    return (
      <ul className={`repo-autocomplete` } ref={(select) => this.select = select}>
      {
        repos.map(
       (item, i) => 
        <li 
            className={`repo-autocomplete__item ${typeof item.activeItem === "undefined" ? '' : item.activeItem}`}
            onClick={pickRepos} 
            data-id={item.id}
            key={item.id}>
            {item.name}
        </li>
      )
      }
      <ButtonLoad data={state} loadMore={loadMore}/>
      </ul>
    )
  }