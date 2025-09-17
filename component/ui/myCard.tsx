import React from 'react';
import {View, StyleSheet} from 'react-native';

function MyCard(props: React.ComponentProps<typeof View>) {
    return (
        <View style={[{
            borderRadius: 8,
            backgroundColor: 'white',
            padding: 8,
            shadowRadius: 4,
            shadowColor: 'grey',
            shadowOpacity: 0.2,
            shadowOffset: {width: 0, height: 2},
            elevation: 4
        }, props.style]}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    text: {}
})

export default MyCard;

