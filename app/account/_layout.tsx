// App.tsx
import * as React from 'react';
import {useEffect} from 'react';
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import * as SystemUI from 'expo-system-ui';
import {View} from "react-native";
import {KeyboardProvider} from "react-native-keyboard-controller";


export default function AccountLayout() {

    return (
        <>
            <KeyboardProvider>
                <StatusBar style={"light"}/>
                <Stack screenOptions={{headerShown: true}}>
                    <Stack.Screen name="register" options={{
                        headerTintColor: 'white',
                        headerTransparent: true,
                        title: '',
                        headerBackground: () => <View style={{flex: 1, backgroundColor: '#212121'}}/>
                    }}/>
                </Stack>
            </KeyboardProvider>
        </>
    )
}
