import React from 'react';
import styled from 'styled-components/native'
import Theme from '../styles/Theme';

const Wrapper = styled.View`
    height: 100%;
    justify-content: center;
    background-color:${Theme.color.black}
    align-items: center;
`

const Message = styled.Text`
    font-size: 18;
    text-align: center;
    color: ${Theme.color.white}
`

interface Props {
    message: string
}

export default class extends React.PureComponent<Props> {
    render() {
        const { message } = this.props
        return (
            <Wrapper>
                <Message>{message}</Message>
            </Wrapper>
        )
    }
}