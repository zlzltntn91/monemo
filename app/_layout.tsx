// App.tsx
import * as React from 'react';
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {KeyboardProvider} from "react-native-keyboard-controller";


export default function RootLayout() {
    return (
        <>
            <KeyboardProvider>
                <StatusBar style={"light"}>
                </StatusBar>
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen
                        name="index"
                        options={{title: "로그인", headerShown: false}}
                    />
                </Stack>
            </KeyboardProvider>
        </>
    )
}
