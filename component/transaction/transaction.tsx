import React, {useContext} from 'react';
import {View, Text} from "react-native";
import CalendarContext from "@/component/calendar/calendarContext";
import {TransactionT} from '@/constatns/types/types'
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

type Props = {
    transaction: TransactionT
}

function Transaction(props: Props) {
    const context = useContext(CalendarContext);
    const {transaction} = props;
    return (
        <Text style={{
            flexShrink: 0,
            marginBottom: 2,
            width: '96%',
            height: 25,
            justifyContent: 'center',
            alignSelf: 'center',
            fontWeight: 500,
            paddingLeft: 8,
            backgroundColor: transaction.type === 'income' ? '#BBDEFB' : '#FFCDD2',
            borderRadius: 8,
        }}
              {...props}
              numberOfLines={1}
              ellipsizeMode={'tail'}
        >            {transaction.type === 'income' ?
            <MaterialCommunityIcons name={'chevron-up'}
                                    style={{top: 2}}
                                    size={20}
                                    color={'blue'}
            ></MaterialCommunityIcons>
            :
            <MaterialCommunityIcons name={'chevron-down'}
                                    size={20}
                                    style={{top: 2}}
                                    color={'red'}
            ></MaterialCommunityIcons>
        }
            {' '}
            {transaction.amount?.toLocaleString()}
        </Text>
    );
}

export default Transaction;