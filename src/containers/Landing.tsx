import React from 'react';
import { FlatList, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components/native'
import { fetchMovies } from '../actions';
import { getMovies, isLoading, getError } from '../reducers';
import { State } from '../reducers/types';
import { Movie } from '../types';
import Theme from '../styles/Theme';
import Movies from './Movies';

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
        flexGrow: 1,
        backgroundColor: Theme.color.black
    }
}))`
`

export class Landing extends React.Component<Props> {

    render() {
        return (
            <Wrapper>
                <Movies title={"Popular"} />
            </Wrapper>
        );
    }
}

export default Landing