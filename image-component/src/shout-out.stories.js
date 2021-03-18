import React from 'react';
import fetch from 'node-fetch';

import { ShoutOut } from './shout-out';

export default {
  title: 'ShoutOut',
  component: ShoutOut,
};

const getUserData = async (username) => {
  const userData = await fetch(`https://us-central1-getpackup.cloudfunctions.net/getUserInfo?username=${username}`)
    .then((res) => res.json())
    .then((json) => {
      return {
        image: json.photoURL,
        username: `@${username}`,
        lastUpdated: `${json.lastUpdated.valueOf()}`,
      };
    })
    .catch((err) => console.error('error:' + err));

  return userData;
}

const Template = (args, { loaded: { data } }) => <ShoutOut {...args} image={data.photoURL || args.image} />;

export const Default = Template.bind({});
Default.args = {
  image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&d=mp&s=280',
  username: '@tonymamo',
};

Default.loaders = [
  async () => ({
    data: await fetch('https://us-central1-getpackup.cloudfunctions.net/getUserInfo?username=tonymamo').then((res) => { return res.json()}),
  })
];


