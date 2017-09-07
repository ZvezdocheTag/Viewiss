import React, { Component } from 'react'
import { InputFindRepo } from './InputFindRepo'
import { InputFindUser } from './InputFindUser'
import { fetchIssues } from '../../utils/requests'

export default class SearchIssueForm extends Component {
    constructor() {
        super();
        this.state = {
            repoName: '',
            userName: '',
            select: null,
            selectList: [],
            repoValue: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setName= this.setName.bind(this);
        this.setRepo = this.setRepo.bind(this);
        this.setValue = this.setValue.bind(this);
    }

     handleSubmit (e) {
        e.preventDefault()
        let { 
            repos,
            state, 
        } = this.props.self.state;
        let { repoName, userName } = this.state;
        let picked = repos.filter(item => item.name === repoName)[0];

        this.props.self.setState({
          picked: picked
        })
        if(picked.has_issues) {
          fetchIssues({
            name: picked.owner.login,
            repo: picked.name,
            state: state
          }).then(res => {
            this.props.self.setState({
              issue: res
            })
          })
          .catch(err => console.log(err))
        }
        let select = document.querySelector('.repo-autocomplete');
        select.classList.remove('active')
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

    setValue(value) {
        this.setState({
            repoValue: value
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
                handleLoadMoreRepos={this.props.handleLoadMoreRepos}
                state={state} 
                repos={repos}
                handleGetAuthoreRepos={this.props.handleGetAuthoreRepos}
                userName={this.state.userName}
                repoValue={this.state.repoValue}
                repoPage={repoPage}
                setValue={this.setValue}
                setRepo={this.setRepo}
                self={this.props.self}
              />
            <button className="search-issue__submit" type="submit">Search</button>
          </form>
          )
    }
}
