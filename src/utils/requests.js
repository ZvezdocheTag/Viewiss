export function fetchIssues(data) {
    return fetch(`https://api.github.com/repos/${data.name}/${data.repo}/issues?page=1&per_page=30&state=${data.state}`)
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(err))
  }

  export function fetchUser (data) {
    return fetch(`https://api.github.com/users/${data.name}`)
    .then(res =>  {
      if(res.status === 404) {
        return res;
      }
      return res.json()
    })
    .then(reps => reps)
    .catch(err => err)
  }
  
  export function fetchRepos (val, pager) {
    return fetch(`${val.repos_url}?page=${pager}&per_page=30`)
    .then(res =>  res.json())
    .then(res =>  res)
    .catch(err => console.log(err))
  }
  