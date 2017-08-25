// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  title: string
};

function App (props: Props) {
  return <h1>{props.title}</h1>;
}

ReactDOM.render(
  <App title = {'Reacto-cart'} />,
  document.getElementById('app'),
);
