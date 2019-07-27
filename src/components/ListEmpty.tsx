import React from 'react';
import styled from 'styled-components/native'
import Theme from '../styles/Theme';

const Wrapper = styled.View`
    height: 100%;
    justify-content: center;
    background-color:${Theme.color.white}
    align-items: center;
`

const Message = styled.Text`
    margin-left: 36px;
    margin-right: 36px;
    margin-top: 12px;
    font-size: 18;
    text-align: center;
    color: ${Theme.color.black}
`

const ErrorMessage = styled(Message)`
    color: ${Theme.color.red}
`

interface Props {
    message: string
}

export class ListError extends React.PureComponent<Props> {
    render() {
        const { message } = this.props
        return (
            <Wrapper>
                <ErrorMessage>{message}</ErrorMessage>
            </Wrapper>
        )
    }
}

export default class ListEmpty extends React.PureComponent<Props> {
    render() {
        const { message } = this.props
        return (
            <Wrapper>
                <Message>{message}</Message>
            </Wrapper>
        )
    }
}