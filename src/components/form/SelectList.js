import React from 'react'
import { ButtonLoad } from './ButtonLoad'
import { fetchIssues } from '../../helpers/requests'

export const SelectList = (props) => {
    const { 
      state, 
      statusSelect, 
      setPickedName, 
      self, 
      repos  
    } = props;

    const pickReposs = function(e) {
      let id = +e.target.dataset.id;
      let picked = repos.filter(item => item.id === id)[0];
 
      self.setState({
        picked: picked
      })

      if(picked.has_issues) {
        fetchIssues({
          name: picked.owner.login,
          repo: picked.name,
          state: state
        }).then(res => {
          self.setState({
            issue: res
          })
        })
        .catch(err => console.log(err))
      } else {
        self.setState({
          issue: []
        })
      }

      let select = document.querySelector('.repo-autocomplete');
      select.classList.remove('active')

      setPickedName(picked.name)
    }
    
    return (
      <ul className={`repo-autocomplete ${statusSelect}`}>
      {
        repos.map((item, i) => 
          <li 
              className={`repo-autocomplete__item 
                ${typeof item.activeItem === "undefined" ? '' : item.activeItem}`}
              onClick={pickReposs} 
              data-id={item.id}
              key={item.id}>
              {item.name}
          </li>
      )
      }
      <ButtonLoad 
        data={props.self} 
        loadMore={props.loadMore}
      />
      </ul>
    )
  }