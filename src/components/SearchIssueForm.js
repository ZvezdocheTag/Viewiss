import React from 'react';

const fetchIssues = (data) => {
  return fetch(`https://api.github.com/repos/${data.name}/${data.repo}/issues?page=1&per_page=100`)
  .then(res => res.json())
  .then(res => data)
  .catch(err => console.log(err))
}

const ButtonLoad = (props) => {
  
  if(typeof props.data.user !== "undefined") {
    return props.data.user.public_repos > props.data.repos.length ? <button className="btn-load-more"onClick={props.loadMore}>Load more</button> : null
  } else {
    return <div className="cssload-jumping">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
  }
}
export const SearchIssueForm = (props) => {
    let { repos, repoPage, user } = props.self.state;
    const handleSubmit = (e) => {
        e.preventDefault()
        props.submitSearch({
            name: this.name.value,
            repo: this.repo.value,
            repoPage: repoPage
        })
    }

    const findRepoForAutocomplete = (loadMore) => {
      this.select.classList.add('active')
      props.handleGetAuthoreRepos({
          name: this.name.value,
          repo: this.repo.value,
          repoPage: !!loadMore ? repoPage: repoPage + 1 
      })
    }
    const fineNameInSelect = (e) => {
      let filtered = repos.filter((item, i) => item.name.indexOf(e.target.value) !== -1);

      if(filtered.length === 1) {
        props.self.setState({
          repos: repos.map(item => item.id === filtered[0].id ? {...item, activeItem: 'focus'} : {...item, activeItem: ''} )
        })
      }
    }

    const loadMore = (e) => {
      findRepoForAutocomplete(false)
    }

    const pickRepos = (e) => {
      this.repo.value = e.target.textContent;

      fetch(`https://api.github.com/repos/${this.name.value}/${this.repo.value}?page=1&per_page=200`)
      .then(res => res.json())
      .then(data => {
        props.self.setState({
          picked: data
        })
        return data
      })
      .catch(err => console.log(err))

      fetch(`https://api.github.com/repos/${this.name.value}/${this.repo.value}/issues`)
      .then(res => res.json())
      .then(res => {
        props.self.setState({
          issue: res
        })
      })
      .catch(err => console.log(err))
      this.select.classList.remove('active')
    }
    return (
      <form className="search-issue" onSubmit={handleSubmit}>
      <div className="search-issue__fieldset">
        <lable className="search-issue__title">user</lable>
        <input type="text" className="search-issue__field" ref={(name) => {this.name = name;}} placeholder="name"/>
      </div>
      <div className="search-issue__fieldset">
        <lable className="search-issue__title">repository</lable>
        <input 
        type="text" 
        className="search-issue__field" 
        ref={(repo) => this.repo = repo} 
        onChange={fineNameInSelect}
        placeholder="repository" 
        onFocus={findRepoForAutocomplete}/>
        <ul className={`repo-autocomplete` } ref={(select) => this.select = select}>
          {
            typeof repos !== "undefined"
             ? repos.map((item, i) => <li className={`repo-autocomplete__item ${typeof item.activeItem === "undefined" ? '' : item.activeItem}`} onClick={pickRepos} key={i}>{item.name}</li>)
             : false
          }
          <ButtonLoad data={props.self.state} loadMore={loadMore}/>
        </ul>
      </div>
      <button className="search-issue__submit" type="submit">Search</button>
    </form>
    )
  }