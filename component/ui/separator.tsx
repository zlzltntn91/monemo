import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from "@/constatns/color";

function Separator() {
    return (
        <View style={{
            height: 1,
            borderTopWidth: 1,
            borderColor: COLORS.BORDER
        }}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    text: {}
})

export default Separator;

