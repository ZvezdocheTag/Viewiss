import React from 'react';

export const SearchIssueForm = (props) => {
    let { prePicked } = props.self.state;

      
    const handleSubmit = (e) => {
        e.preventDefault()
        props.submitSearch({
            name: this.name.value,
            repo: this.repo.value
        })
    }

    const findRepoForAutocomplete = (e) => {
      
      this.select.classList.add('active')
      props.handleGetAuthoreRepos({
          name: this.name.value,
          repo: this.repo.value
      })


    }

    const pickRepos = (e) => {
      this.repo.value = e.target.textContent;

      fetch(`https://api.github.com/repos/${this.name.value}/${this.repo.value}?page=1&per_page=100`)
      .then(res => res.json())
      .then(data => {
        props.self.setState({
          picked: data
        })
        return data
      })
      .catch(err => console.log(err))
      this.select.classList.remove('active')
    }
    console.log(prePicked)
    return (
      <form className="search-issue" onSubmit={handleSubmit}>
      <div className="search-issue__fieldset">
        <lable className="search-issue__title">user</lable>
        <input type="text" className="search-issue__field" ref={(name) => {this.name = name;}} placeholder="name"/>
      </div>
      <div className="search-issue__fieldset">
        <lable className="search-issue__title">repository</lable>
        <input type="text" className="search-issue__field" ref={(repo) => this.repo = repo} placeholder="repository" onFocus={findRepoForAutocomplete}/>
        <ul className={`repo-autocomplete` } ref={(select) => this.select = select}>
          {
            typeof prePicked !== "undefined"
             ? prePicked.map((item, i) => <li className="repo-autocomplete__item" onClick={pickRepos} key={i}>{item.name}</li>)
             : false
          }
        </ul>
      </div>
      <button className="search-issue__submit" type="submit">Search</button>
    </form>
    )
  }