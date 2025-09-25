import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {SPACES} from "@/constatns/space";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import MyTextInput from "@/component/ui/myTextInput";
import {COLORS} from "@/constatns/color";
import separator from "@/component/ui/separator";

type MyTextFieldPropsT = {
    testId: string,
    icon?: string,
    color?: string,
    separator?: boolean,
}

function MyTextField(props: MyTextFieldPropsT & React.ComponentProps<typeof TextInput>) {

    return (
        <>
            <View
                testID={props.testID}
                style={{
                    marginLeft: SPACES.lg,
                    marginRight: SPACES.lg,
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: SPACES.xs
                }}>
                <MaterialCommunityIcons
                    style={{top: 1}}
                    name={props.icon} size={SPACES.xl}
                    color={props.color}></MaterialCommunityIcons>
                <View style={{flex: 1}}>
                    <MyTextInput
                        textContentType={props.textContentType ?? 'none'}
                        keyboardType={props.keyboardType ?? 'default'}
                        autoCorrect={props.autoCorrect ?? false}
                        secureTextEntry={props.secureTextEntry ?? false}
                        style={[{
                            flex: 1,
                            fontSize: SPACES.xl,
                            paddingLeft: 4
                        }]}
                        value={props.value}
                        onChangeText={props.onChangeText}
                        placeholder={props.placeholder ?? ''}></MyTextInput>
                </View>
            </View>
            {props.separator &&
                <View
                    style={{
                        width: '100%',
                        height:1,
                        borderTopWidth: 0.5,
                        borderColor: COLORS.BORDER
                    }}
                >
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
    text: {}
})

export default MyTextField;

