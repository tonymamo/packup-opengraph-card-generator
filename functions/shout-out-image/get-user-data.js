const fetch = require('node-fetch');

let url = `https://us-central1-getpackup.cloudfunctions.net/getUserInfo?username=`;

exports.getUserData = async function (username) {
  const userData = await fetch(`${url}${username}`)
    .then((res) => res.json())
    .then((json) => {
      return {
        image: `https://avatars.githubusercontent.com/u/1933657?v=4`,
        username: `@${json.username}`,
      };
    })
    .catch((err) => console.error('error:' + err));

  return userData;
};
