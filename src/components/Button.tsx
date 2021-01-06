import React from 'react';
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native';
import Theme from '../styles/Theme';

const Title = styled.Text`
    font-size: 20px;
    font-weight: normal;
    flex-wrap: wrap;
    align-self:center;
    color:${Theme.color.black}
    margin-left: 16px;
    margin-right: 16px;
`

export const ButtonRectangle = styled.View`
    height: 47px;
    background-color: ${Theme.color.white};
    shadowOpacity: 0;
    elevation: 0;
    justify-content: center;
    margin-top: 10
    border-color: transparent;
`

interface Props {
    title?: string,
    onPress?: () => void
}

class Button extends React.PureComponent<Props> {

    render() {
        const { title, onPress } = this.props
        return (
            <TouchableOpacity onPress={onPress}>
                <ButtonRectangle>
                    <Title>{title}</Title>
                </ButtonRectangle>
            </TouchableOpacity>
        )
    }
}

export default Button