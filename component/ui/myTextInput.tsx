import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type MyTextInputPropsT = {
    appendString?: string,
}

function MyTextInput(props: MyTextInputPropsT & React.ComponentProps<typeof TextInput>) {

    const {appendString} = props;

    return (
        <>
            <View style={{
                padding: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TextInput style={[{fontSize: 16, flex: 1, borderColor: 'transparent'}]}
                           underlineColorAndroid={'transparent'}
                           focusable={true}
                           autoCapitalize={'none'}
                           keyboardType={'default'}
                           placeholderTextColor={'grey'}
                           {...props}
                >
                </TextInput>
                {appendString && <Text>{appendString}</Text>}
            </View>
            <View style={{
                top: -10,
                position: 'sticky',
                marginLeft: 8,
                marginRight: 8,
                borderBottomWidth: 1,
                borderColor: '#BDBDBD'
            }}></View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {},
    text: {}
})

export default MyTextInput;

