import React, { Component } from 'react';
import './App.css';
import { SearchIssueForm } from './components/SearchIssueForm'
import { RepoCard } from './components/RepoCard'
import { UserCard } from './components/UserCard'
import { IssuesList } from './components/IssuesList'



const fetchUser = (data) => {
  return fetch(`https://api.github.com/users/${data.name}`)
  .then(res =>  res.json())
  .then(reps => reps)
  .catch(err => console.log(err))
}

const fetchRepos = (val, pager) => {
  return fetch(`${val.repos_url}?page=${pager}&per_page=30`)
  .then(res =>  res.json())
  .then(res =>  res)
  .catch(err => console.log(err))
}

// const fetchIssues = (data) => {
//   return fetch(`https://api.github.com/repos/${data.name}/${data.repo}/issues`)
//   .then(res => res.json())
//   .then(res => data)
//   .catch(err => console.log(err))
// }

class App extends Component {
  state = { 
    loginMessage: null, 
    picked: null, 
    repos: [], repo: {}, 
    issue: [],
    dataFetching: false,
    repoPage: 1,
    user: {
      id: 'none'
    }
   }

  handleSubmitSearch(context) {
    // let current = this.state.repos;
    // fetchUserRepos(context).then(val => {
    //     this.setState({
    //       ...val,
    //       repos: [...val.repos, ...current]
    //     })
    //     return val;
    //   })
    // .catch(err => console.log(err))
  }

  handleLoadMoreRepos(repoPage) {
    let { repos, user } = this.state;
    
    fetchRepos(user, repoPage.repoPage)
    .then(res =>  {
      this.setState({repos: [...repos, ...res]})
      return res;
    }).catch(err => console.log(err))
  }

  handleFetchRepos(val, repoPage) {
    fetchRepos(val, repoPage)
    .then(res =>  {
      this.setState({repos: res})
      return res;
    }).catch(err => console.log(err))
  }

  handleFetchUser(context) {
    fetchUser(context).then(val => {
      if(val.id === this.state.user.id ) {
        return null
      }
      this.setState({
        user: val,
        repoPage: val.id !== this.state.user.id ? 1 : this.state.repoPage
      })

      return val
    })
    .then(val => this.handleFetchRepos(val, this.state.repoPage))
    .catch(err => console.log(err))
  }

  handleGetAuthoreRepos(context) {
    this.handleFetchUser(context);
  }

  filteredLength() {
    // let { filteredObj, picked } = this.state;
    // let value = !!filteredObj.value ? filteredObj.value : picked.length;
    
    // this.setState({
    //     pickedCount: value
    // })

  }

  componentDidMount = () => {
    const select = document.querySelector('.repo-autocomplete');

    window.addEventListener('click', function(e) {
      let val = e.target.classList.value;

      if(!!e.target.closest('.repo-autocomplete') || val.indexOf('field--user-repo') !== -1) {
        return;
      } 
      
      if(select.classList.contains('active')) {
        select.classList.remove('active')
      }
    })
  }
  

  render() {
    let { 
       picked, 
       user,
       issue,
    } = this.state;
    // console.log(this, "RENDER")
    return (
      <div className="App">
        <header className="header">
            <div className="header__inner">
                <div className="logo">
                <a href="#">Searchiss</a>
              </div>
              <div className="search-form">
                  <SearchIssueForm 
                  submitSearch={this.handleSubmitSearch.bind(this)}  
                  handleLoadMoreRepos={this.handleLoadMoreRepos.bind(this)}  
                  handleGetAuthoreRepos={this.handleGetAuthoreRepos.bind(this)} 
                  self={this}/>
              </div>
            </div>
        </header>
        <section className="content">
          <div className="user">
            <h3 className="content__title">User:</h3>
            <div>
            {
              user.id !== 'none' ?  <UserCard data={user}/> : <div>No picked user</div>
            }
            </div>
          </div>
          <div className="repositories">
          <h3 className="content__title">Repositories:</h3>
          <div className="result">
            {picked
              ? <RepoCard data={picked}/>
              : <div>No repo now</div>
            }
          </div>
          </div>
          <div className="issues">
          <h3 className="content__title">Issues:</h3>
            <IssuesList issues={issue}/>
          </div>
        </section>


      </div>
    );
  }
}

export default App;
