import React from 'react';
import styled from 'styled-components/native'
import Theme from '../styles/Theme';
import { View } from 'react-native';

interface Props {
    title?: string,
    subtitle?: string
}

const Title = styled.Text`
    color: ${Theme.color.white}
    font-size: 12px
`

const Subtitle = styled.Text`
    color: ${Theme.color.white};
    font-size: 16px
`

// TODO Make sub bigger
export default (props: Props) => {
    return (
        <View>
            <Title>{props.title}</Title>
            <Subtitle>{props.subtitle}</Subtitle>
        </View>
    )
}