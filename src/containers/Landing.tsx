import React from 'react';
import styled from 'styled-components/native'
import Theme from '../styles/Theme';
import Movies from './Movies';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';

interface Props {
};

const Wrapper = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: Theme.color.black
    }
})`
`

const SafeArea = styled.SafeAreaView`
    flex: 1;
    background-color: #000000;
`

const PopularWrapper = styled.View`
    height: ${Dimensions.get('window').height / 2};
    background-color: #000000;
`

export class Landing extends React.Component<Props> {

    render() {

        return (
            <SafeArea>
                <Wrapper>
                    {/* <PopularWrapper> */}
                        <Movies title={"Popular"} />
                    {/* </PopularWrapper> */}
                    {/* <TouchableWithoutFeedback>
                    <Movies title={"Top"} />
                    </TouchableWithoutFeedback>
                    <Movies title={"Upcoming"} /> */}
                </Wrapper>
            </SafeArea>
        );
    }
}

export default Landing