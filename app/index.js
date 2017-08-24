// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  title: string
};

function App(props: Props) {
  return <div>{props.title}</div>;
}

ReactDOM.render(
  <App title = {42} />,
  document.getElementById('app'),
);
