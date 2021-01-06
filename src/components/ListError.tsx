import React from 'react';
import styled from 'styled-components/native'
import Theme from '../styles/Theme';
import Button from './Button';

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
    title?: string
    onPress?: () => void
}

export default class extends React.PureComponent<Props> {
    render() {
        const { message, onPress, title } = this.props
        return (
            <Wrapper>
                <Message>{message}</Message>
                {title && <Button onPress={onPress} title={title}></Button>}
            </Wrapper>
        )
    }
}