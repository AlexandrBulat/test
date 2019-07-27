import 'react-native';
import React from 'react';
import { mount } from 'enzyme';

jest.mock('../../src/Localize', () => ({ translate: (key: string) => key }));
import { Cryptocurrencies } from '../../src/containers/Cryptocurrencies';
import { Converter } from '../../src/types';
import CryptocurrencyItem from '../../src/components/CryptocurrencyItem';

describe('Cryptocurrencies container', () => {
  const fetchCryptoCurrencies = jest.fn();

  it('Cryptocurrencies: renders error', () => {
    const wrapper = mount(<Cryptocurrencies
      currencies={[]}
      isLoading={false}
      error={new Error('error')}
      fetchCryptoCurrencies={fetchCryptoCurrencies}
    />);
    expect(wrapper.find('ListError').exists()).toBeTruthy();
  });

  it('Cryptocurrencies: renders empty', () => {
    const wrapper = mount(<Cryptocurrencies
      currencies={[]}
      isLoading={false}
      fetchCryptoCurrencies={fetchCryptoCurrencies}
    />);
    expect(wrapper.find('ListEmpty').exists()).toBeTruthy();
  });

  it('Cryptocurrencies: renders item', () => {
    const wrapper = mount(<Cryptocurrencies
      currencies={[{
        id: 1,
        cmcRank: 1,
        name: "Bitcoin",
        symbol: "BTC",
        quote: {
          [Converter.USD]: {
            price: 1,
            volume24h: 2,
            percentChange1h: 3,
            percentChange24h: 4,
            percentChange7d: 5,
            marketCap: 6,
          }
        }
      }]}
      isLoading={false}
      fetchCryptoCurrencies={fetchCryptoCurrencies}
    />);
    expect(wrapper.find(CryptocurrencyItem).exists()).toBeTruthy();
  });
});