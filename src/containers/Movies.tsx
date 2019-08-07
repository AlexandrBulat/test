import React from 'react';
import { FlatList, Platform, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components/native'
import { fetchMovies } from '../actions';
import { getMovies, isLoading, getError } from '../reducers';
import { State } from '../reducers/types';
import { Movie } from '../types';
import ListEmpty, { ListError } from '../components/ListEmpty';
import CryptocurrencyItem from '../components/MovieItem';
import Theme from '../styles/Theme';

interface Props {
    readonly fetchCryptoCurrencies: typeof fetchMovies,
    readonly currencies: Movie[],
    readonly isLoading: boolean,
    readonly error?: Error,
    readonly title:string
};

export const Wrapper = styled.ScrollView.attrs(({ background }: any): any => ({
    keyboardDismissMode: Platform.OS == 'ios' ? "on-drag" : "none",
    bounces: false,
    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: Theme.color.black
    }
}))`
`

export const List = styled(FlatList).attrs({
    contentContainerStyle: {
        height: 210,
        paddingTop: 15,
        paddingBottom: 15,
    }
})`
`

const Title = styled.Text`
    font-size: 16px;
    margin-left: 16px;
    margin-top: 10
    color: ${Theme.color.white};
    font-style: normal;
    font-weight: bold;
    flex-wrap: wrap;
`

//TODO Test
export class Cryptocurrencies extends React.Component<Props> {

    componentDidMount() {
        this.props.fetchCryptoCurrencies();
    }

    render() {
        const { isLoading, error, currencies, fetchCryptoCurrencies ,title } = this.props

        return (
            <View>
                <Title numberOfLines={1} >{title}</Title>
                <List
                    horizontal
                    ListEmptyComponent={!isLoading && error ?
                        <ListError message={'error'} /> :
                        <ListEmpty message={'emptyList'} />
                    }
                    data={currencies}
                    //@ts-ignore
                    keyExtractor={(item: Movie) => `${item.id}`}
                    //@ts-ignore
                    renderItem={({ item }: { item: Movie }) => this.renderItem(item)}
                />
            </View>
        );
    }

    private renderItem(item: Movie) {
        return (<CryptocurrencyItem movie={item} />);
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