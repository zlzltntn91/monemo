import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React, {ReactNode} from "react";
import {View} from "react-native";
import {StatusBar} from "expo-status-bar";
import Constants from "expo-constants";


export default function MyView(props: { children?: ReactNode } & React.ComponentProps<typeof SafeAreaView>) {
    return (
        <>

            <SafeAreaProvider>
                <SafeAreaView style={[{flex: 1, backgroundColor: '#212121'}]} testID={'myView'}>
                    {props.children}
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}