import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchIssueForm } from './components/SearchIssueForm'
import { RepoCard } from './components/RepoCard'
import { UserCard } from './components/UserCard'


const fetchUserName = (data, cb) => {
  return fetch(`https://api.github.com/users/${data.name}`)
    .then(res =>  res.json())
    .then(reps => fetchRepo(reps))
    .catch(err => console.log(err))
}

const fetchRepo = (url) => {
  return fetch(url.repos_url)
  .then(res => res.json())
  .then(res => ({
    user: url,
    repos: res
  }))
  .catch(err => console.log(err))
}

// const fetchRepo = (repo) => {
//   return fetch(url.repos_url)
//   .then(res => res.json())
//   .then(res => ({
//     user: url,
//     repos: res
//   }))
//   .catch(err => console.log(err))

// }

class App extends Component {
  state = { loginMessage: null, picked: [], pickedCount: null, repo: {} }

  handleSubmitSearch(context) {
    fetchUserName(context).then(val => {
        this.setState({
          ...this.state,
          ...val,
          picked: val.repos.filter(item => item.name.indexOf(context.repo) !== -1)
        })
        return val;
      })
    .catch(err => console.log(err))
  }

  handleGetAuthoreRepos(context) {
    fetchUserName(context).then(val => {
      console.log(val)
        this.setState({
          prePicked: val.repos,
          user: val.user
        })
        return val;
      })
    .catch(err => console.log(err))
  }

  filteredLength() {
    let { filteredObj, picked } = this.state;
    let value = !!filteredObj.value ? filteredObj.value : picked.length;
    
    this.setState({
        pickedCount: value
    })
  }

  render() {
    let {
       pickedCount, 
       picked, 
       filteredObj, 
       prePicked, 
       user 
    } = this.state;

    return (
      <div className="App">
        <header className="header">
            <div className="header__inner">
                <div className="logo">
                <a href="#">Searche-issue</a>
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
            {picked.length
              ? picked.filter((item, i) => pickedCount !== null ? pickedCount > i : true).map((item, i) => <RepoCard data={item} key={i}/>)
              : <div>No repo now</div>
            }
          </div>
          </div>
          <div className="issues">
          <h3 className="content__title">Issues:</h3>
            <div className="issues__filters">
              <div className="issues__count">
                  <input type="number" ref={obj => this.state.filteredObj = obj}/>
                  <button onClick={this.filteredLength.bind(this)}>Uuuu</button>
              </div>
              <div className="issues__status">
           
                  <button className="issues-btn issues-btn--open">Open</button>    
                  <button className="issues-btn issues-btn--close">Close</button>    
              </div>
            </div>
          </div>
        </section>


      </div>
    );
  }
}

export default App;
