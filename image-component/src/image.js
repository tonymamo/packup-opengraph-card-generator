import React from 'react';
import { render } from 'react-dom';
import { ShoutOut } from './shout-out';

function App() {
  return <ShoutOut image={window.image} username={window.username} displayName={window.displayName} />;
}

render(<App />, document.getElementById('app'));
