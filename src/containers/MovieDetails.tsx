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
import { Movie } from '../types';
import Theme from '../styles/Theme';
import ListError from '../components/ListError';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import MovieDetailsItem from '../components/MovieDetailsItem';

interface Props {
    readonly navigation: NavigationScreenProp<NavigationState>,
    readonly fetchMovie: typeof fetchMovie,
    readonly movie: Movie | null,
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

export const List = styled(FlatList as new () => FlatList<any>).attrs({
    contentContainerStyle: {
        paddingTop: 10,
        paddingBottom: 15,
        marginLeft: 10,
    }
})`
`
const Divider = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${Theme.color.white};
`

const SafeArea = styled.SafeAreaView`
    flex: 1;
    background-color: ${Theme.color.black};
`

//TODO Test
export class MovieDetails extends React.Component<Props> {

    componentDidMount() {
        this.props.fetchMovie(this.props.navigation.getParam('movieId'));
    }

    render() {
        const { isLoading, error, movie } = this.props

        return (
            <SafeArea>
                <Wrapper>
                    {isLoading && <ActivityIndicator size="large" color={Theme.color.white} style={{ alignSelf: 'center' }} />}
                    {error && <ListError message={"An error occured!"} />}
                    <List
                        ItemSeparatorComponent={() => <Divider />}
                        data={Object.entries(movie || {})}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }: { item: Movie }) => this.renderItem(item)}
                    />
                </Wrapper>
            </SafeArea>
        );
    }

    private renderItem = (item: any[]) =>
        (<MovieDetailsItem
            title={item[0]}
        />)
}

const mapStateToProps = (state: State, ownProps: Props) => {
    const movieId = ownProps.navigation.getParam('movieId');
    return {
        movie: getMovie(state, movieId),
        isLoading: isLoading(state),
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