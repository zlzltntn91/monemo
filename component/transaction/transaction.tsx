
import React, {SyntheticEvent, useCallback, useContext, useState} from 'react';
import {LayoutChangeEvent, Text, View} from "react-native";
import CalendarContext from "@/component/calendar/context/calendarContext";
import {TransactionT} from '@/constatns/types/types'
import {MaterialCommunityIcons} from "@expo/vector-icons";

type Props = {
    transaction: TransactionT
}

function Transaction(props: Props) {
    const context = useContext(CalendarContext);
    const [fontSize, setFontSize] = useState(16);
    const {transaction} = props;
    const onLayoutHandler = useCallback((e: LayoutChangeEvent) => {
        setFontSize(e.nativeEvent.layout.height / 2);
    }, []);
    return (
        <View style={{
            backgroundColor: transaction.type !== 'income' ? '#BBDEFB' : '#FFCDD2',
            flexDirection: 'row',
            marginLeft: 4,
            marginRight: 4,
            // minWidth: 10,
            height: 20,
            borderRadius: 8,
            alignItems: 'center',
        }}
              onLayout={onLayoutHandler}>
            {transaction.type === 'income' ?
                <MaterialCommunityIcons name={'chevron-up'}
                                        style={{paddingLeft: 4}}
                                        size={fontSize + 4}
                                        color={'red'}
                ></MaterialCommunityIcons>
                :
                <MaterialCommunityIcons name={'chevron-down'}
                                        style={{paddingLeft: 4}}
                                        size={fontSize + 4}
                                        color={'blue'}
                ></MaterialCommunityIcons>
            }
            <Text style={{
                fontSize: fontSize,
                flex: 1,           // 이 속성 추가
                textAlign: 'right',
                paddingRight: 4,
                // flexShrink: 1      // 이 속성 추가
            }}
                  {...props}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}  // 닫는 괄호 추가
                  adjustsFontSizeToFit={true}
                  allowFontScaling={true}
                  minimumFontScale={0.5}
            >
                {transaction.amount?.toLocaleString()}
            </Text>
        </View>
    );
}

export default Transaction;