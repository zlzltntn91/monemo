import React from 'react';
import {View, Text} from "react-native";
import {TransactionT} from "@/constatns/types/types";
import {transactions} from "@/constatns/transaction";

const TransactionRow = ({transaction}: { transaction: TransactionT }) => {
    return (
        <View style={{flexDirection: 'row', width: '100%'}}>
            <View style={{
                marginLeft: 4,
                borderLeftWidth: 8,
                borderColor: (transaction.type === 'income' ? '#BBDEFB' : '#FFCDD2')
            }}></View>
            <View style={{justifyContent: 'center', paddingLeft: 4}}>
                {/*<Text style={{paddingLeft: 4, fontSize: 16}}>*/}
                    <Text style={{fontWeight: 500, flex: 1, fontSize: 20}}>
                        {`${transaction.createAt.getFullYear()}년 ${transaction.createAt.getMonth() + 1}월 ${transaction.createAt.getDate()}일`}
                    </Text>
                    {' '}
                    <Text style={{fontSize: 16}}>
                        {transaction.amount?.toLocaleString()}원
                    </Text>
                    <Text>
                        {transaction.memo}
                    </Text>
                {/*</Text>*/}
            </View>
        </View>
    );
};

export default TransactionRow;