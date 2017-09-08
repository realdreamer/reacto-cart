import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import App from '../app/app.js';

describe('App', () => {
  it('App renders reacto-cart', () => {
    const app = shallow(<App title={'Reacto-cart'} />);
    expect(app.find('h1').text()).toEqual('Reacto-cart');
  });
});
