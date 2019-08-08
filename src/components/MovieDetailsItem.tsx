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
`

// TODO Make sub bigger
export default (props: Props) => {
    return (
        <View>
            <Title>{props.title}</Title>
            <Title>{props.subtitle}</Title>
        </View>
    )
}