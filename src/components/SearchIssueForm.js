import React from 'react';

export const SearchIssueForm = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        props.submitSearch({
            name: this.name.value,
            repo: this.repo.value
        })
    }
    return (
      <form className="search-issue" onSubmit={handleSubmit}>
      <div className="search-issue__fieldset">
        <lable className="search-issue__title">Имя пользователя</lable>
        <input type="text" className="search-issue__field" ref={(name) => {this.name = name;}} placeholder="name"/>
      </div>
      <div className="search-issue__fieldset">
        <lable className="search-issue__title">Название репозитория</lable>
        <input type="text" className="search-issue__field" ref={(repo) => this.repo = repo} />
      </div>
      <button className="search-issue__submit" type="submit">Поиск</button>
    </form>
    )
  }