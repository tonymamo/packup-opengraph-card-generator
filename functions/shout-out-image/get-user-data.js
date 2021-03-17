const fetch = require('node-fetch');

let url = `https://us-central1-getpackup.cloudfunctions.net/getUserInfo`;

exports.getUserData = async function (username) {
  const userData = await fetch(`${url}?username=${username}`)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return {
        image: json.photoURL,
        displayName: json.displayName,
        username: `@${username}`,
      };
    })
    .catch((err) => console.error('error:' + err));

  return userData;
};
