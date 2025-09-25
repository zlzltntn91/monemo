import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {TransactionT} from "@/constatns/types/types";
import CalendarContext from "@/component/calendar/context/calendarContext";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Transaction from "@/component/transaction/transaction";
import {DateTime} from "luxon";
import {CalendarDataContext} from "@/component/calendar/context/calendarDataContext";
import ModalContext from "@/component/transaction/modal/modalContext";
// import TransactionDetailModal from "@/component/transaction/modal/transactionDetailModal";
import TransactionContext, {defaultContextValue} from "@/component/transaction/transactionContext";
// import TransactionEditModal from "@/component/transaction/modal/transactionEditModal";

type Props = {
    style?: any,
    onLayout?: (e: any) => void,
    day: number,
};
export const Day = (props: Props) => {
        const currentDay = DateTime.local();
        const calendarContext = useContext(CalendarContext);
        const dataContext = useContext(CalendarDataContext);
        const item = dataContext.item;
        const day = props.day;
        const transactions: TransactionT[] = dataContext.transactions;
        const [visibleCounts, setVisibleCounts] = useState<number>(1);
        const [transaction, setTransaction] = useState<TransactionT>(defaultContextValue);

        const currentDateTransactions: TransactionT[] = transactions.filter(_v => {
            if (_v.createAt.toJSDate().getTime() === DateTime.local(item.year, item.month, day).toJSDate().getTime()) {
                return _v;
            }
        })
        const [transactionDetailVisible, setTransactionDetailVisible] = useState(false);

        const _context = useContext(CalendarContext);
        const [containerHeight, setContainerHeight] = useState(0);
        const [childrenTotalHeight, setChildrenTotalHeight] = useState(0);

        const [isVisible, setIsVisible] = useState(false);


        useEffect(() => {
            if (containerHeight === 0) {
                return;
            }
            setVisibleCounts(Math.floor((containerHeight - childrenTotalHeight - 20) / 20));
        }, [containerHeight, childrenTotalHeight]);

        let today = currentDay.toISODate() === DateTime.local(item.year, item.month, day).toISODate();
        return (
            <>
                <Pressable
                    onLongPress={(e) => {
                        setIsVisible(true);
                        console.log('onLongPress');
                    }}
                    onPressIn={(e) => {
                        if (calendarContext.onPressDay) {
                            calendarContext.onPressDay(DateTime.local(item.year, item.month, day));
                            return;
                        }
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
                        {today ? (
                            <View style={{
                                backgroundColor: 'red',
                                width: 20,
                                borderRadius: 10,
                                height: 20,
                                alignItems: 'center'
                            }}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>{day}</Text>
                            </View>
                        ) : (
                            <Text>
                                {day}
                            </Text>
                        )}
                    </Text>
                    {
                        currentDateTransactions && currentDateTransactions.slice(0, visibleCounts).map((_v, index) => {
                            return (
                                <Pressable key={_v.id}
                                           onPress={() => {
                                               setTransactionDetailVisible(true);
                                               setTransaction(_v);
                                           }}>
                                    <Transaction
                                        transaction={_v}
                                    >
                                    </Transaction>

                                </Pressable>
                            );
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
                {/*<ModalContext.Provider value={{isVisible, setIsVisible}}>*/}
                {/*    <TransactionEditModal at={DateTime.local(item.year, item.month, day)}></TransactionEditModal>*/}
                {/*</ModalContext.Provider>*/}
                {/*<ModalContext.Provider value={{*/}
                {/*    isVisible: transactionDetailVisible,*/}
                {/*    setIsVisible: setTransactionDetailVisible*/}
                {/*}}>*/}
                {/*    <TransactionContext.Provider value={transaction}>*/}
                {/*        <TransactionDetailModal></TransactionDetailModal>*/}
                {/*    </TransactionContext.Provider>*/}
                {/*</ModalContext.Provider>*/}
            </>
        );
    }
;

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