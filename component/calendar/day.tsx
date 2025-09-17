import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {TransactionT} from "@/constatns/types/types";
import CalendarContext from "@/component/calendar/context/calendarContext";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Transaction from "@/component/transaction/transaction";
import {DateTime} from "luxon";
import {CalendarDataContext} from "@/component/calendar/context/calendarDataContext";
import {ModalContext} from "@/component/modal/transactionModal";

type Props = {
    style?: any,
    onLayout?: (e: any) => void,
    day: number,
};
export const Day = (props: Props) => {
    const currentDay = DateTime.local();
    const context = useContext(CalendarDataContext);
    const modalContext = useContext(ModalContext);
    const item = context.item;
    const day = props.day;
    const transactions: TransactionT[] = context.transactions;
    const [visibleCounts, setVisibleCounts] = useState<number>(1);
    const currentDateTransactions: TransactionT[] = transactions.filter(_v => {
        if (_v.createAt.getTime() === DateTime.local(item.year, item.month, day).toJSDate().getTime()) {
            return _v;
        }
    })

    const _context = useContext(CalendarContext);
    const [containerHeight, setContainerHeight] = useState(0);
    const [childrenTotalHeight, setChildrenTotalHeight] = useState(0);

    useEffect(() => {
        if (containerHeight === 0) {
            return;
        }
        setVisibleCounts(Math.floor((containerHeight - childrenTotalHeight - 20) / 20));
    }, [containerHeight, childrenTotalHeight]);

    let today = currentDay.toISODate() === DateTime.local(item.year, item.month, day).toISODate();
    return (
            <Pressable
                onLongPress={(e) => {
                    modalContext.setIsVisible(true);
                    modalContext.setCreateAt(DateTime.local(item.year, item.month, day));
                    console.log('onLongPress');
                }}
                onPressIn={() => {
                    console.log('onPressIn');
                }}
                onPressOut={() => {
                    console.log('onPressOut');
                }}
                onPress={() => {
                    console.log('onPress');
                }}
                style={[
                    styles.cellContainer, {
                        gap: 2,
                        width: _context.cellWidth,
                        overflow: 'hidden'
                    }, props.style
                ]}
                onLayout={(e) => {
                    if (e.nativeEvent && e.nativeEvent.layout) {
                        const height = e.nativeEvent.layout?.height;
                        setContainerHeight(height);
                    }
                }}>
                <Text
                    style={[styles.text, {
                        color: (((item.startWeekOfFirstDay + (day - 1)) % 7 === 0) || ((item.startWeekOfFirstDay + (day)) % 7 === 0) ? 'grey' : 'black'),
                    }]}
                    onLayout={(e) => {
                        if (e.nativeEvent && e.nativeEvent.layout) {
                            const height = e.nativeEvent.layout?.height;
                            setChildrenTotalHeight(v => v + height);
                        }
                    }}
                >
                    {today &&
                        <View style={{
                            backgroundColor: 'red',
                            width: 20,
                            borderRadius: 10,
                            height: 20,
                            alignItems: 'center'
                        }}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>{day}</Text>
                        </View>
                    }
                    {!today &&
                        <Text>
                            {day}
                        </Text>
                    }
                </Text>
                {
                    currentDateTransactions && currentDateTransactions.slice(0, visibleCounts).map((_v, index) => {
                        return (
                            <Transaction
                                key={_v.id}
                                transaction={_v}
                            >
                            </Transaction>);
                    })
                }
                {
                    currentDateTransactions && currentDateTransactions.length != 0 && currentDateTransactions.length > visibleCounts && (
                        <Text style={{
                            fontSize: 12,
                            textAlign: 'center',
                            color: 'grey',
                        }}>+{currentDateTransactions.length - visibleCounts}개</Text>
                    )
                }
            </Pressable>
    );
};

const styles = StyleSheet.create({
    cellContainer: {
        borderRightWidth: 0.2,
        borderBottomWidth: 0.2,
    },
    text: {
        paddingRight: 2,
        textAlign: "right",
    }
});