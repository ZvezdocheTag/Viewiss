import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchIssueForm } from './components/SearchIssueForm'
import { RepoCard } from './components/RepoCard'
import { UserCard } from './components/UserCard'
import { IssuesList } from './components/IssuesList'


const fetchUserRepos = (data, cb) => {
  return fetch(`https://api.github.com/users/${data.name}/repos?page=1&per_page=10`)
    .then(res =>  res.json())
    .then(reps => {
      return ({
        user: !!reps.length ? reps[0].owner : 'none',
        repos: reps
      })
    })
    .catch(err => console.log(err))
}

const fetchIssues = (data) => {
  return fetch(`https://api.github.com/repos/${data.name}/${data.repo}/issues`)
  .then(res => res.json())
  .then(res => data)
  .catch(err => console.log(err))
}

class App extends Component {
  state = { loginMessage: null, picked: null, repos: [], repo: {}, issue: [] }

  handleSubmitSearch(context) {
    fetchUserRepos(context).then(val => {
        this.setState({
          ...val
        })
        return val;
      })
    .catch(err => console.log(err))
  }

  handleGetAuthoreRepos(context) {
    fetchUserRepos(context).then(val => {
      console.log(val)
        this.setState({
          ...val
        })
        return val;
      })
    .catch(err => console.log(err))
  }

  filteredLength() {
    // let { filteredObj, picked } = this.state;
    // let value = !!filteredObj.value ? filteredObj.value : picked.length;
    
    // this.setState({
    //     pickedCount: value
    // })

  }



  render() {
    let {
       pickedCount, 
       picked, 
       filteredObj, 
       prePicked, 
       user,
       issue,
       repos
    } = this.state;

    console.log(this)
    return (
      <div className="App">
        <header className="header">
            <div className="header__inner">
                <div className="logo">
                <a href="#">Searchiss</a>
              </div>
              <div className="search-form">
                  <SearchIssueForm submitSearch={this.handleSubmitSearch.bind(this)}  handleGetAuthoreRepos={this.handleGetAuthoreRepos.bind(this)} self={this}/>
              </div>
            </div>
        </header>
        <section className="content">
          <div className="user">
            <h3 className="content__title">User:</h3>
            <div>
            {
              typeof user !== 'undefined' ?  <UserCard data={user}/> : false
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
            <div className="issues__filters">
              {/* <div className="issues__count">
                  <input type="number" ref={obj => this.state.filteredObj = obj}/>
                  <button className="issues-btn issues-btn--filter" onClick={this.filteredLength.bind(this)}>Count</button>
              </div> */}
              <div className="issues__status">
           
                  <button className="issues-btn issues-btn--open">Open</button>    
                  <button className="issues-btn issues-btn--close">Close</button>    
              </div>
            </div>
            <IssuesList issues={issue}/>
          </div>
        </section>


      </div>
    );
  }
}

export default App;
