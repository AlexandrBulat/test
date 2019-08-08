import React from 'react';
import styled from 'styled-components/native'
import Theme from '../styles/Theme';

interface Props {
    title?: string,
    subtitle?: string
}

const Title = styled.Text`
    color: ${Theme.color.white}
`

export default (props: Props) => {
    return (
            <Title>{props.title}</Title>
    )
}