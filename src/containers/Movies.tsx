import React from 'react';
import { FlatList, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components/native'
import { fetchMovies } from '../actions';
import { getMovies, isLoading, getError } from '../reducers';
import { State } from '../reducers/types';
import { Movie, Converter } from '../types';
import ListEmpty, { ListError } from '../components/ListEmpty';
import CryptocurrencyItem from '../components/MovieItem';
import { translate } from '../Localize';
import Theme from '../styles/Theme';

interface Props {
    readonly fetchCryptoCurrencies: typeof fetchMovies,
    readonly currencies: Movie[],
    readonly isLoading: boolean,
    readonly error?: Error
};

export const Wrapper = styled.ScrollView.attrs(({ background }: any): any => ({
    keyboardDismissMode: Platform.OS == 'ios' ? "on-drag" : "none",
    bounces: false,
    contentContainerStyle: {
        flexGrow: 1
    }
}))`
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

    render() {
        const { isLoading, error, currencies, fetchCryptoCurrencies } = this.props

        return (
            <Wrapper>
                <List
                    horizontal
                    ListEmptyComponent={!isLoading && error ?
                        <ListError message={translate('error')} /> :
                        <ListEmpty message={translate('emptyList')} />
                    }
                    refreshing={isLoading}
                    data={currencies}
                    //@ts-ignore
                    keyExtractor={(item: Movie) => `${item.id}`}
                    //@ts-ignore
                    renderItem={({ item }: { item: Movie }) => this.renderItem(item)}
                    onRefresh={fetchCryptoCurrencies}
                />
                <List
                    horizontal
                    ListEmptyComponent={!isLoading && error ?
                        <ListError message={translate('error')} /> :
                        <ListEmpty message={translate('emptyList')} />
                    }
                    refreshing={isLoading}
                    data={currencies}
                    //@ts-ignore
                    keyExtractor={(item: Movie) => `${item.id}`}
                    //@ts-ignore
                    renderItem={({ item }: { item: Movie }) => this.renderItem(item)}
                    onRefresh={fetchCryptoCurrencies}
                />
                <List
                    horizontal
                    ListEmptyComponent={!isLoading && error ?
                        <ListError message={translate('error')} /> :
                        <ListEmpty message={translate('emptyList')} />
                    }
                    refreshing={isLoading}
                    data={currencies}
                    //@ts-ignore
                    keyExtractor={(item: Movie) => `${item.id}`}
                    //@ts-ignore
                    renderItem={({ item }: { item: Movie }) => this.renderItem(item)}
                    onRefresh={fetchCryptoCurrencies}
                />
            </Wrapper>
        );
    }

    private renderItem(item: Movie) {
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
        currencies: getMovies(state),
        isLoading: isLoading(state),
        error: getError(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchCryptoCurrencies: (page?: number) => dispatch(fetchMovies(page)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cryptocurrencies)