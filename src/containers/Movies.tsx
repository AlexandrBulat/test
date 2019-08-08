import React from 'react';
import { FlatList, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components/native'
import { fetchMovies } from '../actions';
import { getMovies, isLoading, getError } from '../reducers';
import { State } from '../reducers/types';
import { Movie } from '../types';
import CryptocurrencyItem from '../components/MovieItem';
import Theme from '../styles/Theme';

interface Props {
    readonly fetchMovies: typeof fetchMovies,
    readonly movies: Movie[],
    readonly isLoading: boolean,
    readonly error: Error | null,
};

export const Wrapper = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: Theme.color.black
    }
})`
`

export const List = styled(FlatList as new () => FlatList<Movie>).attrs({
    contentContainerStyle: {
        paddingTop: 10,
        paddingBottom: 15,
        marginLeft: 10,
    }
})`
`

const Header = styled.Text`
    font-size: 16px;
    margin-left: 10px;
    margin-top: 10px
    color: ${Theme.color.white};
    font-style: normal;
    font-weight: bold;
    flex-wrap: wrap;
`

const Space = styled.View`
    width: 10px;
`

const window = Dimensions.get('window');
const WIDTH = window.width / 2;
const HEIGHT = window.height / 4;
const POPULAR_WIDTH = window.width - 40;
const POPULAR_HEIGHT = window.height / 2;

//TODO Test
export class Movies extends React.Component<Props> {

    componentDidMount() {
        this.props.fetchMovies();
    }

    render() {
        const { isLoading, error, movies } = this.props

        return (
            <View>
                <Header>{'Popular'}</Header>
                <List
                    horizontal
                    ItemSeparatorComponent={() => <Space />}
                    data={movies}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item }: { item: Movie }) => this.renderItem(item, POPULAR_WIDTH, POPULAR_HEIGHT)}
                />
                <Header>{'Top'}</Header>
                <List
                    horizontal
                    ItemSeparatorComponent={() => <Space />}
                    data={movies}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item }: { item: Movie }) => this.renderItem(item, WIDTH, HEIGHT)}
                />
                <Header>{'Upcoming'}</Header>
                <List
                    horizontal
                    ItemSeparatorComponent={() => <Space />}
                    data={movies}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item }: { item: Movie }) => this.renderItem(item, WIDTH, HEIGHT)}
                />
            </View>
        );
    }

    private renderItem(item: Movie, width: number, height: number) {
        return (<CryptocurrencyItem
            source={item.poster_path}
            width={width}
            height={height}
        />);
    }
}

const mapStateToProps = (state: State) => {
    return {
        movies: getMovies(state),
        isLoading: isLoading(state),
        error: getError(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchMovies: () => dispatch(fetchMovies()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Movies)