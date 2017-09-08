import React from 'react'
import { SelectList } from './SelectList'

export const InputFindRepo = (props) => {
    const { 
      state, 
      repos, 
      repoPage, 
      userName, 
      setRepo, 
      setValue,
      self,
      handleLoadMoreRepos, 
      repoValue } = props,
      select = document.querySelector('.repo-autocomplete');
    
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
        self.setState({
          repoPage: repoPage + 1
        })
        handleLoadMoreRepos({
            repoPage: repoPage + 1
        })
      }

      const fineNameInSelect = (e) => {
        setValue(e.target.value)
      }

      const nullFilteredRepoList = (e) => {
        setRepo(e)
      }

      const loadMore = (e) => {
        loadMoreRepos()
      }

      const setPickedName = (name) => {
          this.repo.value = name;
      }
      
      const filtered = () => {
        if(repoValue === '') {
          return repos
        }
        return repos.filter(item => item.name.indexOf(repoValue) !== -1);
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
              self={self}
              state={state}
              setPickedName={setPickedName}
              repos={filtered()}
              statusSelect={''}
              setRepo={setRepo}
              loadMore={loadMore}
            />
          </div>
      )
  }