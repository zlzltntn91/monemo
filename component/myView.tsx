import {SafeAreaProvider} from "react-native-safe-area-context";
import {SafeAreaView} from "react-native";
import React, {ReactNode} from "react";

export default function MyView({children}: { children: ReactNode }) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}