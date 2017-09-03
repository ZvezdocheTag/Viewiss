import React from 'react';

const ButtonLoad = (props) => {
  
  if(typeof props.data.user !== "undefined") {
    return props.data.user.public_repos > props.data.repos.length ? <button className="btn-load-more"onClick={props.loadMore}>Load more</button> : null
  } else {
    return <div className="cssload-jumping">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
  }
}
// Если в родительском элементе нет стейта или refs
export function fetchIssues(data) {
  return fetch(`https://api.github.com/repos/${data.name}/${data.repo}/issues?page=1&per_page=30&state=${data.state}`)
  .then(res => res.json())
  .then(res => res)
  .catch(err => console.log(err))
}

export const SearchIssueForm = (props) => {
    let { repos, repoPage, state } = props.self.state;
    const handleSubmit = (e) => {
        e.preventDefault()
        props.submitSearch({
            name: this.name.value,
            repo: this.repo.value,
            repoPage: repoPage
        })
    }

    const findRepoForAutocomplete = (loadMore) => {
      if(this.name.value === '') return;
      this.select.classList.add('active')
      props.handleGetAuthoreRepos({
          name: this.name.value,
          repo: this.repo.value,
          repoPage: repoPage
      })
    }

    const loadMoreRepos = () => {
      props.self.setState({
        repoPage: repoPage + 1
      })
  
      props.handleLoadMoreRepos({
          repoPage: repoPage + 1
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
      loadMoreRepos()
    }

    const pickRepos = (e) => {
      let id = +e.target.dataset.id;
      let picked = repos.filter(item => item.id === id)[0];

      props.self.setState({
        picked: picked
      })

      if(picked.has_issues) {
        fetchIssues({
          name: picked.owner.login,
          repo: picked.name,
          state: state
        }).then(res => {
          props.self.setState({
            issue: res
          })
        })
        .catch(err => console.log(err))
      }

      this.repo.value = picked.name;
      this.select.classList.remove('active')

      // fetch(`https://api.github.com/repos/${this.name.value}/${this.repo.value}/issues`)
      // .then(res => res.json())
      // .then(res => {
      //   props.self.setState({
      //     issue: res
      //   })
      // })
      // .catch(err => console.log(err))
      
    }
    return (
      <form className="search-issue" onSubmit={handleSubmit}>
      <div className="search-issue__fieldset">
        <lable className="search-issue__title">user</lable>
        <input 
          type="text" 
          className="search-issue__field field--user-name" 
          ref={name => this.name = name} 
          placeholder="name"
        />
      </div>
      <div className="search-issue__fieldset">
        <lable className="search-issue__title">repository</lable>
        <input 
          type="text" 
          className="search-issue__field field--user-repo" 
          ref={(repo) => this.repo = repo} 
          onChange={fineNameInSelect}
          placeholder="repository" 
          onFocus={findRepoForAutocomplete}
        />
        <ul className={`repo-autocomplete` } ref={(select) => this.select = select}>
          {
            typeof repos !== "undefined"
             ? repos.map(
               (item, i) => 
                <li 
                    className={`repo-autocomplete__item ${typeof item.activeItem === "undefined" ? '' : item.activeItem}`}
                    onClick={pickRepos} 
                    data-id={item.id}
                    key={item.id}>
                    {item.name}
                </li>
              )
             : false
          }
          <ButtonLoad data={props.self.state} loadMore={loadMore}/>
        </ul>
      </div>
      <button className="search-issue__submit" type="submit">Search</button>
    </form>
    )
  }