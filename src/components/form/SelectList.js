import React from 'react'
import { ButtonLoad } from './ButtonLoad'
import { fetchIssues } from '../../utils/requests'
// Если в родительском элементе нет стейта или refs

export const SelectList = (props) => {
    let { state, statusSelect, setPickedName, self, repos  } = props;
    let selectFilter = self.state.selectFilter;

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
      } else {
        props.self.setState({
          issue: []
        })
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