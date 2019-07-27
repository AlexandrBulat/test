import React from 'react';
import styled from 'styled-components/native'
import Theme from '../styles/Theme';
import CryptocurrencyItemRow from './CryptocurrencyItemRow';
import { translate } from '../Localize';
import i18n from "i18n-js";

const Card = styled.View`
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
    const percentChange1h = props.percentChange1h.toFixed(2)
    const percentChange24h = props.percentChange24h.toFixed(2)
    const percentChange7d = props.percentChange7d.toFixed(2)
    const marketCup = i18n.toNumber(props.marketCap)
    return (
        <Card>
            <CryptocurrencyItemRow value={props.cmcRank} title={translate("rank")} />
            <CryptocurrencyItemRow value={name} title={translate("name")} />
            <CryptocurrencyItemRow value={symbol} title={translate("symbol")} />
            <CryptocurrencyItemRow value={`$${marketCup}`} title={translate('marketCup')} />
            <CryptocurrencyItemRow value={`$${price}`} title={translate('price')} />
            <CryptocurrencyItemRow value={volume24h} title={translate('volume24h')} />
            <CryptocurrencyItemRow value={`${percentChange1h}%`} title={translate('percentChange1h')} />
            <CryptocurrencyItemRow value={`${percentChange24h}%`} title={translate('percentChange24h')} />
            <CryptocurrencyItemRow value={`${percentChange7d}%`} title={translate('percentChange7d')} />
        </Card>
    )
}