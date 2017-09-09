// @flow

import * as React from 'react';

import '../app/scss/app.scss';

type Props = {
  title: string
};

function App (props: Props) {
  return <h1>{props.title}</h1>;
}

export default App;
