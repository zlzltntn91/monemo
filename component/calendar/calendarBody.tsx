import {Pressable, StyleSheet, Text, View} from "react-native";
import {useContext} from "react";
import CalendarContext from "@/component/calendar/context/calendarContext";
import {Day} from "@/component/calendar/day";
import {CalendarDataContext} from "./context/calendarDataContext";

export default function CalendarBody() {
    const _context = useContext(CalendarContext);
    const context = useContext(CalendarDataContext);
    const {item} = context;

    function calculateCellHeight() {
        let height = _context.cellHeight;
        if ((item.day.length + item.startWeekOfFirstDay + (6 - item.startWeekOfEndDay)) !== 42) {
            height = '20%';
        }
        return height;
    }

    const height = calculateCellHeight()

    return (
        <View style={[styles.container, {height: _context.height}]}
              onLayout={(e) => {
              }}>

            {/*~ 시작요일 ~ 시작일*/}
            {
                Array.from({length: item.startWeekOfFirstDay})
                    .map((v, index) => {
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
                item.day.map((v: number, index: number) => {
                        return (
                            <Day
                                key={index}
                                day={v}
                                style={{height: height}}
                            ></Day>
                        );
                    }
                )
            }
            {/*마지막일 ~ 해당주 마지막 요일*/
            }
            {
                Array.from({length: 6 - item.startWeekOfEndDay})
                    .map((v, index) => {
                            return (
                                <View key={index} style={[
                                    styles.cellContainer, {width: _context.cellWidth, height: height}
                                ]}>
                                    <Text
                                        style={[styles.text, {width: _context.cellWidth, height: height}]}
                                        key={`_${index}`}>
                                    </Text>
                                </View>
                            )
                        }
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // borderWidth: 10,
        flexWrap: "wrap",
        borderLeftWidth: 0.2,
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
