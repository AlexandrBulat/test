import 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

jest.mock('../../src/Localize', () => ({ translate: () => console.log('') }));
import { Cryptocurrencies } from '../../src/containers/Cryptocurrencies';

describe('Cryptocurrencies container', () => {
  const fetchCryptoCurrencies = jest.fn();
  it('Cryptocurrencies: renders correctly', () => {
    const wrapper = mount(<Cryptocurrencies
      currencies={[]}
      isLoading={false}
      fetchCryptoCurrencies={fetchCryptoCurrencies}
    />);
    expect(wrapper.props().title).to.equal('Name');
  });
});