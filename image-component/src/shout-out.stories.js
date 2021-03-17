import React from 'react';

import { ShoutOut } from './shout-out';

export default {
  title: 'ShoutOut',
  component: ShoutOut,
};

const Template = (args) => <ShoutOut {...args} />;

export const Default = Template.bind({});
Default.args = {
  image: 'https://firebasestorage.googleapis.com/v0/b/getpackup.appspot.com/o/PxJ6sK8Aw7PxUam69moS5jNd6yG2%2Favatar?alt=media&token=4c8dd3d6-a5ab-4177-b528-1cc5943f44f3',
  username: '@tonymamo',
  displayName: 'Tony Mamo'
};
