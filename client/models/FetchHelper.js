const get = (url) => {
  return fetch(url)
    .then(response => response.json());
}

const post = (url, params) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(response => response.json());
}


module.exports = {
  get,
  post,
}
