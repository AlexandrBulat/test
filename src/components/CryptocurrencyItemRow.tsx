import React from 'react';
import styled from 'styled-components/native'
import Theme from '../styles/Theme';

const Wrapper = styled.View`
    flex:1;
    justify-content: space-between;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 5px;
    margin-bottom: 5px;
    flex-direction: row;
    background-color: transparent;
`

export const Value = styled.Text`
    font-size: 12px;
    margin-left: 32px;
    margin-right: 17px;
    color: ${Theme.color.black};
    font-style: normal;
    font-weight: bold;
    flex-wrap: wrap;
`

const ValueWrapper = styled.View`
    flex:1;
    justify-content: center
    align-items: flex-end
`

const Title = styled.Text`
    font-size: 12px;
    align-self: center;
    margin-left: 17px;
    color: ${Theme.color.black};
    font-style: normal;
    font-weight: bold;
    flex-wrap: wrap;
    align-self:center
`

interface Props {
    value: string | number | undefined,
    title: string
}

export default (props: Props) => {
    const { value, title } = props
    return (
        <Wrapper>
            <Title numberOfLines={1} >{title}</Title>
            <ValueWrapper>
                <Value numberOfLines={1}>{value ? value : "N/A"}</Value>
            </ValueWrapper>
        </Wrapper>
    )
}
