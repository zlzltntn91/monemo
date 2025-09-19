import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from "@/constatns/color";

function Separator({type}: { type: 'income' | 'expense' }) {
    return (
        <View
            style={[
                styles.separator,
                {borderColor: type === 'income' ? COLORS.INCOME : COLORS.EXPENSE}
            ]}
        />
    )
}

const styles = StyleSheet.create({
    separator: {
        height: '100%',
        padding: 4,
        borderLeftWidth: 8,
    },
})

export default Separator;

