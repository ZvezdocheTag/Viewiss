import React, { Component } from 'react'

export const InputFindUser = (props) => {
    let { user, setName } = props;
    return (
      <div className="search-issue__fieldset">
      <lable className="search-issue__title">user</lable>
      <input 
        type="text" 
        onBlur={setName}
        className="search-issue__field field--user-name" 
        placeholder={'name'}
        style={{
          borderColor: user ? 'rgb(238, 238, 238)' : '#f00'
        }}
      />
      <div className="search-issue__validation-label">
          {user ? '' : 'user not found'}
      </div>
    </div>
    )
  }