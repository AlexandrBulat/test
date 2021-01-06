import React from 'react';
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native';
import { useTheme, ThemeMode } from '../ThemeContext';

const Title = styled.Text`
    font-size: 20px;
    font-weight: normal;
    flex-wrap: wrap;
    align-self:center;
    color:${(props:any) => props.theme.text}
    margin-left: 16px;
    margin-right: 16px;
`

export const ButtonRectangle = styled.View`
    height: 47px;
    background-color: ${(props:any) => props.theme.background};
    shadowOpacity: 0;
    elevation: 0;
    justify-content: center;
    border-color: transparent;
`

const TopBar = () => {

    const { theme, setTheme } = useTheme();

    const changeTheme = () => {
        const isDarkMode = theme === ThemeMode.Dark
        setTheme(isDarkMode ? ThemeMode.Light : ThemeMode.Dark)
    }

    return (
        <TouchableOpacity onPress={changeTheme}>
            <ButtonRectangle>
                <Title>{theme}</Title>
            </ButtonRectangle>
        </TouchableOpacity>
    )

}

export default TopBar