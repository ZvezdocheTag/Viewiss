import React from 'react'
import { ButtonLoad } from './ButtonLoad'
// Если в родительском элементе нет стейта или refs

export function fetchIssues(data) {
  return fetch(`https://api.github.com/repos/${data.name}/${data.repo}/issues?page=1&per_page=30&state=${data.state}`)
  .then(res => res.json())
  .then(res => res)
  .catch(err => console.log(err))
}


export const SelectList = (props) => {
    let { state, statusSelect, setPickedName, self, repos  } = props;
    let selectFilter = self.state.selectFilter;
    // let repos = selectFilter.length > 0 ? selectFilter :  props.repos;

    const pickReposs = function(e) {
      let id = +e.target.dataset.id;
     
      let picked = repos.filter(item => item.id === id)[0];
 
      props.self.setState({
        picked: picked
      })

      if(picked.has_issues) {
        fetchIssues({
          name: picked.owner.login,
          repo: picked.name,
          state: state
        }).then(res => {
          props.self.setState({
            issue: res
          })
        })
        .catch(err => console.log(err))
      }
      let select = document.querySelector('.repo-autocomplete');
      setPickedName(picked.name)
      select.classList.remove('active')
    }
    
    return (
      <ul className={`repo-autocomplete ${statusSelect}`}>
      {
        repos.map(
       (item, i) => 
        <li 
            className={`repo-autocomplete__item ${typeof item.activeItem === "undefined" ? '' : item.activeItem}`}
            onClick={pickReposs} 
            data-id={item.id}
            key={item.id}>
            {item.name}
        </li>
      )
      }
      <ButtonLoad data={props.self} loadMore={props.loadMore}/>
      </ul>
    )
  }