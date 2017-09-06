import React from 'react'
import { SelectList } from './SelectList'

export const InputFindRepo = (props) => {
    let { state, repos, repoPage, userName, setRepo } = props;
    let select = document.querySelector('.repo-autocomplete');
    
    const findRepoForAutocomplete = (loadMore) => {
        if(userName === '') return;
        select.classList.add('active')
        props.handleGetAuthoreRepos({
            name: userName,
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
          props.self.setState({
            selectFilter: filtered
          })
        
      }

      const nullFilteredRepoList = (e) => {
        setRepo(e)
        props.self.setState({
          selectFilter: []
        })
      }
      const loadMore = (e) => {
        loadMoreRepos()
      }

      const setPickedName = (name) => {
          this.repo.value = name;
      }
     
    return (
      <div className="search-issue__fieldset">
          <lable className="search-issue__title">repository</lable>
          <input 
            type="text" 
            className="search-issue__field field--user-repo" 
            ref={(repo) => this.repo = repo} 
            onChange={fineNameInSelect}
            placeholder="repository" 
            onFocus={findRepoForAutocomplete}
            onBlur={nullFilteredRepoList}
          />
               <SelectList 
                self={props.self}
                state={state}
                setPickedName={setPickedName}
                repos={repos}
                statusSelect={''}
                loadMore={loadMore}
                />
        </div>
    )
  }