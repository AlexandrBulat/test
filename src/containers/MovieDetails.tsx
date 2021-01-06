import React from 'react';
import {
    FlatList,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components/native'
import { fetchMovie } from '../actions';
import { isLoading, getError, getMovie } from '../reducers';
import { State } from '../reducers/types';
import Theme from '../styles/Theme';
import ListError from '../components/ListError';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import MovieDetailsItem from '../components/MovieDetailsItem';
import SafeArea from '../components/SafeArea';
import { Fields } from '../types';
import { baseStyle } from '../styles/Base';

interface Props {
    readonly navigation: NavigationScreenProp<NavigationState>,
    readonly fetchMovie: typeof fetchMovie,
    readonly entries: [string, any][],
    readonly isLoading: boolean,
    readonly error: Error | null,
    readonly movieId: number
};

export const Wrapper = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: Theme.color.black
    }
})`
`

export const List = styled(FlatList as new () => FlatList<[string, any]>).attrs({
    contentContainerStyle: {
        paddingTop: 10,
        paddingBottom: 15,
        marginLeft: 10,
    }
})`
`
const Divider = styled.View`
    height: 1px;
    margin-top: 2px;
    margin-bottom: 2px;
    width: 100%;
    background-color: ${Theme.color.white};
`

//TODO Test
export class MovieDetails extends React.Component<Props> {

    static navigationOptions = {
        title: '',
        headerStyle: {
            backgroundColor: Theme.color.black,
            borderBottomWidth: 0,
        },
        headerTintColor: Theme.color.white,
    };

    componentDidMount() {
        this.props.fetchMovie(this.props.navigation.getParam('movieId'));
    }

    render() {
        const { isLoading, error, entries, movieId } = this.props

        return (
            <SafeArea>
                <Wrapper>
                    {isLoading && <ActivityIndicator size="large"
                        color={Theme.color.white} style={baseStyle.loading} />}
                    {!isLoading && error && <ListError message={"An error occured!"}
                        title={"Please retry"}
                        onPress={() => this.props.fetchMovie(movieId)} />}
                    {!isLoading && !error && <List
                        ItemSeparatorComponent={() => <Divider />}
                        data={entries}
                        keyExtractor={(item) => `${item[0]}`}
                        renderItem={({ item }: { item: [string, any] }) => this.renderItem(item)}
                    />}
                </Wrapper>
            </SafeArea>
        );
    }

    private renderItem = (item: [string, any]) => {
        let title = '', subtitle = '';
        const key = item[0];
        const value = item[1];
        if (key === Fields.Title) {
            title = 'Title'
            subtitle = value
        } else if (key === Fields.Overview) {
            title = 'Overview'
            subtitle = value
        } else if (key === Fields.ReleaseDate) {
            title = 'Date'
            subtitle = value
        } else if (key === Fields.VoteAverage) {
            title = 'Rating'
            subtitle = value
        } else if (key === Fields.Runtime) {
            title = 'Duration'
            subtitle = `${value} min`
        } else if (key === Fields.Genres) {
            title = 'Genres'
            subtitle = (value || []).map((genre: { name: string }) => genre.name).join(', ')
        }

        return (<MovieDetailsItem
            title={title}
            subtitle={subtitle}
        />)
    }
}

const mapStateToProps = (state: State, ownProps: Props) => {
    const movieId = ownProps.navigation.getParam('movieId');
    const movie = getMovie(state, movieId)
    return {
        entries: Object.entries(movie || {}).filter(entry => entry[0] !== 'id' && entry[0] !== 'posterPath'),
        isLoading: isLoading(state),
        movieId,
        error: getError(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchMovie: (id: number) => dispatch(fetchMovie(id)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieDetails)