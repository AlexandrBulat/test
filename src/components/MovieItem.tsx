import React from 'react';
import styled from 'styled-components/native'
import Theme from '../styles/Theme';
import { translate } from '../Localize';
import i18n from "i18n-js";
import CryptoCurrencyItemRow from './MovieItemRow';

const Card = styled.View`
    flex:1;
    background-color: ${Theme.color.white};
    border-radius: 8px;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 10px;
    margin-bottom: 10px;
    shadow-color: ${Theme.color.black};
    color:${Theme.color.black};
    shadow-offset: { width: 2, height: 32 };
    shadow-opacity: 1;
`

interface Props {
    name?: string,
    symbol?: string
    price: number
    volume24h: number
    percentChange1h: number
    percentChange24h: number
    percentChange7d: number
    marketCap: number
    cmcRank: number
}

export default (props: Props) => {
    const name = props.name
    const symbol = props.symbol
    const price = i18n.toNumber(props.price)
    const volume24h = i18n.toNumber(props.volume24h)
    const percentChange1h = props.percentChange1h ? props.percentChange1h.toFixed(2) : undefined
    const percentChange24h = props.percentChange24h ? props.percentChange24h.toFixed(2) : undefined
    const percentChange7d = props.percentChange7d ? props.percentChange7d.toFixed(2) : undefined
    const marketCup = i18n.toNumber(props.marketCap)
    return (
        <Card>
            <CryptoCurrencyItemRow value={props.cmcRank} title={translate("rank")} />
            <CryptoCurrencyItemRow value={name} title={translate("name")} />
            <CryptoCurrencyItemRow value={symbol} title={translate("symbol")} />
            <CryptoCurrencyItemRow value={`$${marketCup}`} title={translate('marketCup')} />
            <CryptoCurrencyItemRow value={`$${price}`} title={translate('price')} />
            <CryptoCurrencyItemRow value={volume24h} title={translate('volume24h')} />
            <CryptoCurrencyItemRow value={`${percentChange1h}%`} title={translate('percentChange1h')} />
            <CryptoCurrencyItemRow value={`${percentChange24h}%`} title={translate('percentChange24h')} />
            <CryptoCurrencyItemRow value={`${percentChange7d}%`} title={translate('percentChange7d')} />
        </Card>
    )
}