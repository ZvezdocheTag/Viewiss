import React, { Component } from 'react'
import { ButtonLoad } from './ButtonLoad'
import { InputFindRepo } from './InputFindRepo'
import { InputFindUser } from './InputFindUser'
import { SelectList } from './InputFindUser'

// Если в родительском элементе нет стейта или refs
export function fetchIssues(data) {
  return fetch(`https://api.github.com/repos/${data.name}/${data.repo}/issues?page=1&per_page=30&state=${data.state}`)
  .then(res => res.json())
  .then(res => res)
  .catch(err => console.log(err))
}

export default class SearchIssueForm extends Component {
    constructor() {
        super();
        this.state = {
            repoName: '',
            userName: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setName= this.setName.bind(this);
        this.pickRepos= this.pickRepos.bind(this);
    }
     handleSubmit (e) {
        e.preventDefault()
        // props.submitSearch({
        //     name: this.name.value,
        //     repo: this.repo.value,
        //     repoPage: repoPage
        // })
    }



     pickRepos(e) {
    //   let id = +e.target.dataset.id;
    //   let picked = repos.filter(item => item.id === id)[0];

    //   props.self.setState({
    //     picked: picked
    //   })

    //   if(picked.has_issues) {
    //     fetchIssues({
    //       name: picked.owner.login,
    //       repo: picked.name,
    //       state: state
    //     }).then(res => {
    //       props.self.setState({
    //         issue: res
    //       })
    //     })
    //     .catch(err => console.log(err))
    //   }

    //   this.repo.value = picked.name;
    //   this.select.classList.remove('active')
    }


     setName(e){
        let name =  e.target.value;
        this.setState({
            userName: e.target.value
        })
    }
    render() {
        // console.log(this.props.handleGetAuthoreRepos)
        let { repos, repoPage, state, valudation } = this.props.self.state;
        return (
            <form className="search-issue" onSubmit={this.handleSubmit}>
              <InputFindUser user={valudation.user} setName={this.setName}/>
              <InputFindRepo 
                state={state} 
                repos={repos}
                handleGetAuthoreRepos={this.props.handleGetAuthoreRepos}
                userName={this.state.userName}
                pickRepos={this.pickRepos} 
                repoPage={repoPage}
              />
            <button className="search-issue__submit" type="submit">Search</button>
          </form>
          )
    }
}
