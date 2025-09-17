import React from 'react';
import {Text, View} from "react-native";
import {TransactionT} from "@/constatns/types/types";

const TransactionRow = ({transaction}: { transaction: TransactionT }) => {
    return (
        <View style={{flexDirection: 'row', width: '100%'}}>
            <View style={{
                marginLeft: 4,
                borderLeftWidth: 8,
                borderColor: (transaction.type === 'income' ? '#BBDEFB' : '#FFCDD2')
            }}></View>
            <View style={{justifyContent: 'center', paddingLeft: 4}}>
                <Text style={{fontWeight: 500, flex: 1, fontSize: 16}}>
                    {`${transaction.createAt.getMonth() + 1}월 ${transaction.createAt.getDate()}일`}
                </Text>
                <Text style={{fontSize: 12}}>
                    {transaction.amount?.toLocaleString()}원
                </Text>
                <Text style={{fontSize: 12, color: 'grey'}}>
                    {transaction.memo}
                </Text>
            </View>
        </View>
    );
};

export default TransactionRow;