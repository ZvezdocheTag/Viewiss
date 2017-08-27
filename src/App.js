import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchIssueForm } from './components/SearchIssueForm'
import { RepoCard } from './components/RepoCard'


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

class App extends Component {
  state = { loginMessage: null, picked: [] }

  handleSubmitSearch(context) {
    // console.log(context.repo)

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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <SearchIssueForm submitSearch={this.handleSubmitSearch.bind(this)} self={this}/>
        <div className="result">
          {this.state.picked.length
            ? this.state.picked.map((item, i) => <RepoCard data={item} key={i}/>)
            : <div>No repo now</div>
          }
        </div>
      </div>
    );
  }
}

export default App;
