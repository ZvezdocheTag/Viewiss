import React, { Component } from 'react';
import './App.css';
import { SearchIssueForm } from './components/SearchIssueForm'
import { fetchIssues } from './components/SearchIssueForm'
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



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loginMessage: null, 
      picked: null, 
      repos: [], repo: {}, 
      issue: [],
      dataFetching: false,
      repoPage: 1,
      state: 'open',
      user: {
        id: 'none'
      }
     }
     this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
     this.handleLoadMoreRepos = this.handleLoadMoreRepos.bind(this)
     this.handleGetAuthoreRepos = this.handleGetAuthoreRepos.bind(this)
     this.toggleIssueState = this.toggleIssueState.bind(this)
  }


  handleSubmitSearch(context) {

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
  toggleIssueState(e) {
    this.setState({
      state: e.target.dataset.value
    })
    fetchIssues({
      name: this.state.user.login,
      repo: this.state.picked.name,
      state: this.state.state
    }).then(res => {
      this.setState({
        issue: res
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    let { 
       picked, 
       user,
       issue,
    } = this.state;

    return (
      <div className="App">
        <header className="header">
            <div className="header__inner">
                <div className="logo">
                <a href="#">Viewiss</a>
              </div>
              <div className="search-form">
                  <SearchIssueForm 
                  submitSearch={this.handleSubmitSearch}  
                  handleLoadMoreRepos={this.handleLoadMoreRepos}  
                  handleGetAuthoreRepos={this.handleGetAuthoreRepos} 
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
          <h3 className="content__title">Repository:</h3>
          <div className="result">
            {picked
              ? <RepoCard data={picked}/>
              : <div>No repo now</div>
            }
          </div>
          </div>
          <div className="issues">
          <h3 className="content__title">Issues:</h3>
            <IssuesList issues={issue} toggleIssueState={this.toggleIssueState}/>
          </div>
        </section>


      </div>
    );
  }
}

export default App;
