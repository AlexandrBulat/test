import React from 'react';
import {
    FlatList,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components/native'
import { fetchMovies } from '../actions';
import { makeGetMovies, isLoading, getError } from '../reducers';
import { State } from '../reducers/types';
import { Movie } from '../types';
import MovieItem from '../components/MovieItem';
import Theme from '../styles/Theme';
import { MovieCategory } from '../services';
import ListError from '../components/ListError';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import NavigationScreen from '../navigators/NavigationScreen';
import SafeArea from '../components/SafeArea';
import { baseStyle } from '../styles/Base';
import TopBar from '../components/TopBar';

interface Props {
    readonly navigation: NavigationScreenProp<NavigationState>,
    readonly fetchMovies: typeof fetchMovies,
    readonly popularMovies: Movie[],
    readonly topMovies: Movie[],
    readonly upcomingMovies: Movie[],
    readonly isLoading: boolean,
    readonly error: Error | null,
    readonly theme: any
};

export const Wrapper = styled.ScrollView.attrs(({ theme }: any): any =>({
    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: theme.background
    }
}))`
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
    color:${(props:any) => props.theme.text}
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

    handleTap(movieId: number): void {
        this.props.navigation.push(NavigationScreen.DETAILS, { movieId })
    }

    componentDidMount() {
        this.props.fetchMovies();
    }

    render() {
        const { isLoading, error, popularMovies, topMovies, upcomingMovies, fetchMovies } = this.props

        return (
            <SafeArea>
                <TopBar/>
                {isLoading && <ActivityIndicator size="large"
                    color={Theme.color.white} style={baseStyle.loading} />}
                {!isLoading && error && <ListError message={"An error occured!"}
                    title={"Please retry"}
                    onPress={fetchMovies} />}

                {!isLoading && !error && <Wrapper>
                    <Header>{'Popular'}</Header>
                    <List
                        horizontal
                        ItemSeparatorComponent={() => <Space />}
                        data={popularMovies}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }: { item: Movie }) => this.renderItem(item, POPULAR_WIDTH, POPULAR_HEIGHT)}
                    />
                    <Header>{'Top'}</Header>
                    <List
                        horizontal
                        ItemSeparatorComponent={() => <Space />}
                        data={topMovies}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }: { item: Movie }) => this.renderItem(item, WIDTH, HEIGHT)}
                    />
                    <Header>{'Upcoming'}</Header>
                    <List
                        horizontal
                        ItemSeparatorComponent={() => <Space />}
                        data={upcomingMovies}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }: { item: Movie }) => this.renderItem(item, WIDTH, HEIGHT)}
                    />
                </Wrapper>}
            </SafeArea>
        );
    }

    private renderItem = (item: Movie, width: number, height: number) =>
        (<MovieItem
            source={item.posterPath}
            width={width}
            height={height}
            onPress={() => this.handleTap(item.id)}
        />)
}

const mapStateToProps = (state: State) => {
    const getMovies = makeGetMovies()
    return {
        popularMovies: getMovies(state, MovieCategory.Popular),
        topMovies: getMovies(state, MovieCategory.Top),
        upcomingMovies: getMovies(state, MovieCategory.Upcoming),
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