import React from 'react';
import styled from 'styled-components/native'
import { Constants } from '../constants/Constants';
import Theme from '../styles/Theme';

interface Props {
    source: any,
    width: number,
    height: number
}

const Image = styled.Image`
    width: ${(props: Props) => props.width}px;
    height: ${(props: Props) => props.height}px;
    border-radius: 5px;
    border-color: ${Theme.color.white}
    border-width: 1px
`

export default (props: Props) => {
    return (
        <Image
            source={{ uri: `${Constants.IMAGE_URL}${props.source}` }}
            width={props.width}
            height={props.height}
            resizeMode={'cover'}
        />
    )
}