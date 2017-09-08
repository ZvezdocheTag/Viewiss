import React, { Component } from 'react'
import {  fetchIssues, fetchUser, fetchRepos } from '../helpers/requests'
import SearchIssueForm from './form'

function changeToUpperCase(str) {
    return str.toUpperCase();
  }

export default class Header extends Component {
    constructor(props) {
    super(props);
        this.handleLoadMoreRepos = this.handleLoadMoreRepos.bind(this)
        this.handleGetAuthoreRepos = this.handleGetAuthoreRepos.bind(this)
    }

    handleFetchRepos(val, param) {
        let { self } = this.props;
        fetchRepos(val, param)
        .then(res =>  {
            self.setState({repos: res})
            return res;
        }).catch(err => console.log(err))
    }

    handleFetchUser(context) {
        let { self } = this.props;

        fetchUser(context).then(val => {
            if(val.id === self.state.user.id) {
                return null
            }
            if(val.status === 404) {
                self.setState({
                    valudation: {user: false},
                    repos: [],
                    user: {id: 'none'},
                    repoPage: 1,
                    picked: null,
                    issue: []
                })

                return null;
            }

            self.setState({
            user: val,
            picked: null,
            issue: [],
            valudation: {user: true},
            repoPage: val.id !== self.state.user.id ? 1 : self.state.repoPage
            })

            return val
        })
        .then(val => {
            this.handleFetchRepos(val, self.state.repoPage)
        })
        .catch(err => console.log(err))
    }

    handleGetAuthoreRepos(context) {
        let { self } = this.props;
        if(changeToUpperCase(context.name) !== changeToUpperCase(self.state.user.login)) {
            this.handleFetchUser(context);
        }
    }

    handleLoadMoreRepos(param) {
        let { self } = this.props;

        fetchRepos(self.state.user, param.repoPage)
        .then(res =>  {
            self.setState({
                repos: [...self.state.repos, ...res]
            })
            return res;
        })
        .catch(err => console.log(err))
    }
    
    render() {
        return (
            <header className="header">
                <div className="header__inner">
                    <div className="logo">
                        <a href="#">Viewiss</a>
                    </div>
                    <div className="search-form">
                        <SearchIssueForm 
                        handleLoadMoreRepos={this.handleLoadMoreRepos}  
                        handleGetAuthoreRepos={this.handleGetAuthoreRepos} 
                        self={this.props.self}
                        />
                    </div>
                </div>
            </header>
        )
    }
}
