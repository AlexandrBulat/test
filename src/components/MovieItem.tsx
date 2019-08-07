import React from 'react';
import styled from 'styled-components/native'
import { Movie } from '../types';
import { Constants } from '../constants/Constants';

const Image = styled.Image`
    width:200;
    height:200;
    margin-left: 16px;
    margin-right: 16px;
    border-radius:5;
`

interface Props {
    movie: Movie
}

export default (props: Props) => {
    return (
        <Image source={{ uri: `${Constants.IMAGE_URL}${props.movie.poster_path}` }} />
    )
}