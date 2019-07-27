import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components/native'
import { fetchCryptocurrencies } from '../actions';
import { getCryptocurrencies, isLoading, getError } from '../reducers';
import { State } from '../reducers/types';
import { Cryptocurrency, Converter } from '../types';
import ListEmpty from '../components/ListEmpty';
import CryptocurrencyItem from '../components/CryptocurrencyItem';
import { Toast } from 'native-base';
import { translate } from '../Localize';
import Theme from '../styles/Theme';

interface Props {
    readonly fetchCryptoCurrencies: typeof fetchCryptocurrencies,
    readonly currencies: Cryptocurrency[],
    readonly isLoading: boolean,
    readonly error?: Error
};

export const Wrapper = styled.View`
    flex: 1;
`

export const List = styled(FlatList).attrs({
    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: Theme.color.grey50
    }
})`
`

//TODO Test
export class Cryptocurrencies extends React.Component<Props> {

    componentDidMount() {
        this.props.fetchCryptoCurrencies();
    }

    componentWillReceiveProps(nextProps: Props) {
        const { currencies } = this.props
        if (!nextProps.isLoading && nextProps.error && currencies.length === 0) {
            Toast.show({
                text: translate("error"),
                duration: 10000,
                buttonText: translate("tryAgain"),
                onClose: ((reason) => {
                    if (reason === "user") {
                        this.props.fetchCryptoCurrencies()
                    }
                })
            })
        }
    }

    render() {
        const { isLoading, currencies, fetchCryptoCurrencies } = this.props

        return (
            <Wrapper>
                <List
                    ListEmptyComponent={ <ListEmpty message={translate('emptyList')} /> }
                    refreshing={isLoading}
                    data={currencies}
                    //@ts-ignore
                    keyExtractor={(item: Cryptocurrency) => `${item.id}`}
                    //@ts-ignore
                    renderItem={({ item }: { item: Cryptocurrency }) => this.renderItem(item)}
                    onRefresh={fetchCryptoCurrencies}
                />
            </Wrapper>
        );
    }

    private renderItem(item: Cryptocurrency) {
        const quote = item.quote[Converter.USD]!!;
        return (<CryptocurrencyItem
            name={item.name}
            symbol={item.symbol}
            cmcRank={item.cmcRank}
            price={quote.price}
            volume24h={quote.volume24h}
            percentChange1h={quote.percentChange1h}
            percentChange24h={quote.percentChange24h}
            percentChange7d={quote.percentChange7d}
            marketCap={quote.marketCap} />);
    }
}

const mapStateToProps = (state: State) => {
    return {
        currencies: getCryptocurrencies(state),
        isLoading: isLoading(state),
        error: getError(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchCryptoCurrencies: (page?: number) => dispatch(fetchCryptocurrencies(page)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cryptocurrencies)