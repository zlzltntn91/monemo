// App.tsx
import * as React from 'react';
import {Text, View, Button, Platform, NativeModules} from 'react-native';
import {Stack} from "expo-router";
import Constants from "expo-constants";
import {StatusBar} from "expo-status-bar";
import {useEffect} from "react";
import * as SystemUI from 'expo-system-ui';


export default function RootLayout() {
    useEffect(() => {
        // 하단 네비게이션 바 색상 설정
        SystemUI.setBackgroundColorAsync('#212121');
        // 투명도 설정도 가능 (Android만 지원)
        // SystemUI.setNavigationBarTranslucent(false);
    }, []);

    return (
        <>
            <StatusBar backgroundColor={'transparent'} style={"light"}>
            </StatusBar>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{title: "홈 화면", headerShown: false}}
                />
            </Stack>
        </>
    )
}
