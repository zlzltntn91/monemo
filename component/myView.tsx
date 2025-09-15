import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
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