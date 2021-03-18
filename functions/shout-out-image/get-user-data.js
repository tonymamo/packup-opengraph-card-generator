const fetch = require('node-fetch');

exports.getUserData = async function (username) {
  const userData = await fetch(`https://us-central1-getpackup.cloudfunctions.net/getUserInfo?username=${username}`)
    .then((res) => res.json())
    .then((json) => {
      return {
        photoURL: json.photoURL,
        username: `@${username}`,
      };
    })
    .catch((err) => console.error('error:' + err));

  return userData;
};
