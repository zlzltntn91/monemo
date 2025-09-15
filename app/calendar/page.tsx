import MyView from "@/component/myView";
import Animated from "react-native-reanimated";
import {useCallback, useContext, useRef, useState} from "react";
import {ScrollView, FlatList, Text, View} from "react-native";
import MyCalendar, {MyCalendarT} from "@/src/calendar";
import {DateTime} from "luxon";
import CalendarBody from "@/component/calendar/calendarBody";
import CalendarContext from "@/component/calendar/calendarContext";
import CalendarHeader from "@/component/calendar/calendarHeader";
import {transactions} from "@/constatns/transaction";
import {TransactionT} from "@/constatns/types/types";
import TransactionRow from "@/component/transaction/transactionRow";
import transaction from "@/component/transaction/transaction";

const viewAbleConfig = {
    // waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 80,
    // itemVisiblePercentThreshold: 60
}

function initData() {
    let calendar = MyCalendar.getCalendar(DateTime.local());
    let before = MyCalendar.minusOneMonthCalendar(DateTime.local());
    let after = MyCalendar.plusOneMonthCalendar(DateTime.local());
    return [before, calendar, after];
}

// 빈자리 체워들어가게 한번 만들어보자
export default function CalendarPage() {
    const now = MyCalendar.getCalendar(DateTime.local());
    const context = useContext(CalendarContext);

    const [title, setTitle] = useState(`${now.year}년 ${now.month}월`);
    const [isScrolling, setScrolling] = useState(false);
    const [datas, setDatas] = useState(initData());
    const listRef = useRef<FlatList>(null);
    const _tr: TransactionT[] = transactions;

    const handleViewableItemsChanged = useCallback((info: any) => {
        info.viewableItems.forEach(({item}: { item: MyCalendarT }) => {
            setTitle(`${item.year}년 ${item.month}월`);
            // listRef.current?.scrollToIndex({
            //     index: info.viewableItems[0].index,
            //     animated: true,
            //     viewPosition: 0,
            //     viewOffset: 0
            // });
        });
    }, []);

    return (
        <MyView>
            <CalendarHeader title={title}></CalendarHeader>
            <View style={{height: context.height, borderBottomWidth: 2}}>
                <Animated.FlatList
                    getItemLayout={(_, index) => {
                        return {length: context.height, offset: context.height * index, index};
                    }}
                    ref={listRef}
                    initialScrollIndex={1}
                    scrollEventThrottle={16}
                    // extraData={isScrolling}
                    keyExtractor={(item, index) => item.year + item.month + ''}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={(e) => {
                        // setScrolling(true);
                        // console.log(e.nativeEvent);
                    }}
                    viewabilityConfig={viewAbleConfig}
                    onViewableItemsChanged={handleViewableItemsChanged}
                    data={datas}
                    renderItem={({item}) => {
                        return <>
                            {isScrolling &&
                                <Text style={{
                                    position: 'absolute',
                                    top: -25,
                                    fontWeight: 'bold',
                                    fontSize: 32,
                                    zIndex: 200
                                }}>
                                    {`${item.year}년 ${item.month}월`}
                                </Text>
                            }
                            <CalendarBody item={item}/>
                        </>
                    }}
                >
                </Animated.FlatList>
            </View>
            {/*<View>*/}
                <ScrollView ref={listRef} contentContainerStyle={{marginTop: 4, gap: 4}}>
                    {
                        _tr.sort((v, v2) => {
                            return v.createAt.getTime() - v2.createAt.getTime();
                        }).map((item, index) => {
                            return <TransactionRow key={index} transaction={item}></TransactionRow>
                        })
                    }
                </ScrollView>
            {/*</View>*/}
        </MyView>
    );
}