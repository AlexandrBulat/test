import 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import CryptocurrencyItemRow, { Value } from '../../src/components/CryptocurrencyItemRow';

describe('CryptocurrencyItemRow component', () => {
  it('CryptocurrencyItemRow: renders correctly', () => {
    const wrapper = mount(<CryptocurrencyItemRow title='Name' value='Bitcoin'/>);
    expect(wrapper.props().title).to.equal('Name');
    wrapper.setProps({ value: undefined });
    expect(wrapper.text()).to.contain('N/A');
    expect(wrapper.find(Value).children().text()).to.contain('N/A');
  });
});