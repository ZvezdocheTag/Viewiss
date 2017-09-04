import React, { Component } from 'react'
import { ButtonLoad } from './ButtonLoad'
import { InputFindRepo } from './InputFindRepo'
import { InputFindUser } from './InputFindUser'
import { SelectList } from './InputFindUser'

export default class SearchIssueForm extends Component {
    constructor() {
        super();
        this.state = {
            repoName: '',
            userName: '',
            select: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setName= this.setName.bind(this);
        this.setRepo = this.setRepo.bind(this);
    }

     handleSubmit (e) {
        e.preventDefault()
        let { repoName, userName } = this.state;
        let { repoPage } = this.props.self.state;
    }

     setName(e){
        let name =  e.target.value;
        this.setState({
            userName: name
        })
    }
     setRepo(e){
        let repo =  e.target.value;
        this.setState({
            repoName: repo
        })
    }

    render() {
        let { 
            repos,
            repoPage, 
            state, 
            valudation
        } = this.props.self.state;

        return (
            <form className="search-issue" onSubmit={this.handleSubmit}>
              <InputFindUser user={valudation.user} setName={this.setName}/>
              <InputFindRepo 
                state={state} 
                repos={repos}
                handleGetAuthoreRepos={this.props.handleGetAuthoreRepos}
                userName={this.state.userName}
                repoPage={repoPage}
                self={this.props.self}
              />
            <button className="search-issue__submit" type="submit">Search</button>
          </form>
          )
    }
}
