import React, { Component } from 'react';
import './App.css';
import {  fetchIssues } from './helpers/requests'
import { RepoCard } from './components/RepoCard'
import { UserCard } from './components/UserCard'
import { IssuesList } from './components/IssuesList'
import Header from './components/Header'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      valudation: {
        user: true
      },
      loginMessage: null, 
      picked: null, 
      repos: [], repo: {}, 
      issue: [],
      selectFilter: [],
      dataFetching: false,
      repoPage: 1,
      state: 'open',
      user: {
        id: 'none',
        login: ''
      }
     }

     this.toggleIssueState = this.toggleIssueState.bind(this)
  }

  componentDidMount = () => {
    const select = document.querySelector('.repo-autocomplete');

    window.addEventListener('click', function(e) {
      let val = e.target.classList.value;

      if(
        !!e.target.closest('.repo-autocomplete') 
        || val.indexOf('field--user-repo') !== -1
      ) {
        return;
      } 
      
      if(select.classList.contains('active')) {
        select.classList.remove('active')
      }
    })
  }

  toggleIssueState(e) {
    const { state } = this;

    if(state.state === e.target.dataset.value) {
      return;
    }

    this.setState({
      state: e.target.dataset.value
    })

    fetchIssues({
      name: state.user.login,
      repo: state.picked.name,
      state: e.target.dataset.value
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
        <Header self={this}/>
        <section className="content">
          <div className="user">
            <h3 className="content__title">User:</h3>
            <div>
              {
                user.id !== 'none' 
                  ? <UserCard data={user}/> 
                  : <div>No picked user</div>
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
            <IssuesList 
              issues={issue} 
              toggleIssueState={this.toggleIssueState}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
