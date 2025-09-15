import * as React from 'react';
import {TransactionT} from "@/constatns/types/types";
import CalendarContext from "@/component/calendar/calendarContext";
import {useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet, LayoutChangeEvent} from "react-native";
import Transaction from "@/component/transaction/transaction";
import {CalendarDataContext} from "@/component/calendar/calendarBody";
import {DateTime} from "luxon";

type Props = {
    style?: any,
    onLayout?: (e: any) => void,
    day: number,
};
export const Day = (props: Props) => {
    const currentDay = DateTime.local();
    const context = useContext(CalendarDataContext);
    const item = context.item;
    const day = props.day;
    const transactions: TransactionT[] = context.transactions;
    const [visibleCounts, setVisibleCounts] = useState<number>(0);
    const currentDateTransactions: TransactionT[] = transactions.filter(_v => {
        if (_v.createAt.getTime() === DateTime.local(item.year, item.month, day).toJSDate().getTime()) {
            return _v;
        }
    })

    const _context = useContext(CalendarContext);
    const [containerHeight, setContainerHeight] = useState(0);
    const [childrensTotalHeight, setChildrensTotalHeight] = useState(0);

    useEffect(() => {
        if (containerHeight === 0) {
            return;
        }
        console.log(Math.floor(containerHeight - childrensTotalHeight / 24));
        setVisibleCounts(Math.floor((containerHeight - childrensTotalHeight) / 24) - 1);
    }, [containerHeight]);

    let today = currentDay.toISODate() === DateTime.local(item.year, item.month, day).toISODate();
    return (
        <View
            style={[
                styles.cellContainer, {
                    gap: 2,
                    width: _context.cellWidth,
                    overflow: 'hidden'
                }, props.style
            ]}
            onLayout={(e) => {
                setContainerHeight(e.nativeEvent.layout.height);
            }}>
            <Text
                style={[styles.text, {
                    color: (((item.startWeekOfFirstDay + (day - 1)) % 7 === 0) || ((item.startWeekOfFirstDay + (day)) % 7 === 0) ? 'grey' : 'black'),
                }]}
                onLayout={(e) => {
                    setChildrensTotalHeight(v => v + e.nativeEvent.layout.height);
                }}
            >
                {today &&

                    <View style={{
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: 'red',
                        width: 20,
                        borderRadius: 10,
                        height: 20,
                        alignItems: 'center'
                    }}>
                        <Text>{day}</Text>
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
                        textAlign: 'center',
                        color: 'grey',
                        bottom: 0
                    }}>+{currentDateTransactions.length - visibleCounts}개</Text>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    cellContainer: {
        borderRightWidth: 0.2,
        borderBottomWidth: 0.2,
    },
    text: {
        paddingTop: 4,
        paddingRight: 4,
        textAlign: "right",
    }
});