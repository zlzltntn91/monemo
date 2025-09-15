import {StyleSheet, Text, View} from "react-native";
import {MyCalendarT} from "@/src/calendar";
import {createContext, useContext, useState} from "react";
import CalendarContext from "@/component/calendar/calendarContext";
import {TransactionT} from '@/constatns/types/types'
import {DateTime} from 'luxon';
import {transactions as initTransactions} from '@/constatns/transaction'
import {Day} from "@/component/calendar/day";

export const CalendarDataContext = createContext<any>(null);

export default function CalendarBody({item}: { item: MyCalendarT }) {
    const _context = useContext(CalendarContext);
    const [transactions, setTransactions] = useState<TransactionT[]>(initTransactions);

    return (
        <CalendarDataContext.Provider value={{item, transactions}}>
            <View style={[styles.container, {height: _context.height}]}
                  onLayout={(e) => {

                  }}>
                {/*~ 시작요일 ~ 시작일*/}
                {
                    Array.from({length: item.startWeekOfFirstDay})
                        .map((v, index) => {
                                let height = _context.cellHeight;
                                if ((item.day.length + item.startWeekOfFirstDay + (6 - item.startWeekOfEndDay)) != 42) {
                                    height = '20%';
                                }
                                return (
                                    <View key={index} style={[
                                        styles.cellContainer, {width: _context.cellWidth, height: height}
                                    ]}>
                                        <Text
                                            style={[styles.text, {width: _context.cellWidth, height: height}]}
                                            key={`_${index}`}>
                                        </Text>
                                    </View>)
                            }
                        )
                }
                {/*시작일 ~ 마지막일*/}
                {
                    item.day.map((v, index) => {
                            let height = _context.cellHeight;
                            if ((item.day.length + item.startWeekOfFirstDay + (6 - item.startWeekOfEndDay)) != 42) {
                                height = '20%';
                            }
                            return (
                                <Day
                                    day={v}
                                    key={item.year + item.month + index}
                                    style={{height: height}}
                                ></Day>
                            );
                        }
                    )
                }

                {/*마지막일 ~ 해당주 마지막 요일*/}
                {
                    Array.from({length: 6 - item.startWeekOfEndDay})
                        .map((v, index) => {
                                let height = _context.cellHeight;
                                if ((item.day.length + item.startWeekOfFirstDay + (6 - item.startWeekOfEndDay)) != 42) {
                                    height = '20%';
                                }
                                return (
                                    <View key={index} style={[
                                        styles.cellContainer, {width: _context.cellWidth, height: height}
                                    ]}>
                                        <Text
                                            style={[styles.text, {width: _context.cellWidth, height: height}]}
                                            key={`_${index}`}>
                                        </Text>
                                    </View>)
                            }
                        )
                }
            </View>
        </CalendarDataContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // borderWidth: 10,
        flexWrap: "wrap",
        // height: Dimensions.get('window').height * 0.6
    },
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
