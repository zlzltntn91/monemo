import MyView from "@/component/myView";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming} from "react-native-reanimated";
import {useCallback, useContext, useRef, useState} from "react";
import {FlatList, GestureResponderEvent, Text, View} from "react-native";
import MyCalendar, {MyCalendarT} from "@/src/calendar";
import {DateTime} from "luxon";
import CalendarBody from "@/component/calendar/calendarBody";
import CalendarContext from "@/component/calendar/context/calendarContext";
import CalendarHeader from "@/component/calendar/calendarHeader";
import {MaterialIcons} from "@expo/vector-icons";
import {transactions as defaultTransactions} from "@/constatns/transaction";
import {TransactionT} from "@/constatns/types/types";
import TransactionRow from "@/component/transaction/transactionRow";
import {CalendarDataContext} from "@/component/calendar/context/calendarDataContext";
import TransactionsContext from "@/component/transaction/transactionsContext";

const viewAbleConfig = {
    viewAreaCoveragePercentThreshold: 70,
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
    const viewableIndex = useRef(1);

    const [title, setTitle] = useState(`${now.year}년 ${now.month}월`);
    const [isScrolling, setScrolling] = useState(false);
    const [datas, setDatas] = useState(initData());
    const listRef = useRef<FlatList>(null);
    const [transactions, setTransactions] = useState<TransactionT[]>(defaultTransactions);

    // 애니메이션 값 추가
    const titleOpacity = useSharedValue(1);
    const titleTranslateY = useSharedValue(0);
    const transactionOpacity = useSharedValue(1);
    const transactionTranslateY = useSharedValue(0);

    // 제목 애니메이션 스타일
    const titleAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: titleOpacity.value,
            transform: [{translateY: titleTranslateY.value}]
        };
    });

    // 트랜잭션 리스트 애니메이션 스타일
    const transactionAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: transactionOpacity.value,
            transform: [{translateY: transactionTranslateY.value}]
        };
    });

    const handleViewableItemsChanged = useCallback((info: any) => {
        info.viewableItems.forEach(({item}: { item: MyCalendarT }) => {
            transactionOpacity.value = withSequence(
                withTiming(0, {duration: 200}),
                withTiming(1, {duration: 800, easing: Easing.out(Easing.cubic)})
            );
            transactionTranslateY.value = withSequence(
                withTiming(20, {duration: 200}),
                withTiming(0, {duration: 400, easing: Easing.out(Easing.cubic)})
            );

            // 타이틀과 트랜잭션 설정
            setTitle(`${item.year}년 ${item.month}월`);
            setTransactions(transactions.filter(_v => {
                let year = _v.createAt.year;
                let month = _v.createAt.month;
                if (item.year === year && item.month === month) {
                    return _v;
                }
            }));
            listRef.current?.scrollToIndex({
                index: info.viewableItems[0].index,
                animated: true,
                viewPosition: 0,
                viewOffset: 0
            });
        });
    }, []);

    const onPressHandler = (e: GestureResponderEvent) => {
        setDatas(initData());
        listRef.current?.scrollToIndex({
            index: 1,
            animated: false,
            viewPosition: 0,
            viewOffset: 0
        })
    }


    return (
        <MyView>
            <TransactionsContext.Provider value={{transactions, setTransactions}}>
                <Animated.View style={{flex: 1}}>
                    <View>
                        <MaterialIcons name={'add'}></MaterialIcons>
                    </View>
                    <View style={titleAnimatedStyle}>
                        <CalendarHeader title={title}
                                        onTodayPress={onPressHandler}>
                        </CalendarHeader>
                    </View>
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
                                let scrollY = e.nativeEvent.contentOffset.y;
                                let newIndex = Math.floor((scrollY * 1.5) / (context.height));
                                if (viewableIndex.current !== newIndex) {
                                    viewableIndex.current = newIndex;
                                    listRef.current?.scrollToIndex({
                                        index: viewableIndex.current < 0 ? 0 : viewableIndex.current > datas.length - 1 ? datas.length - 1 : viewableIndex.current,
                                        animated: true,
                                    });
                                }
                            }}
                            viewabilityConfig={viewAbleConfig}
                            onViewableItemsChanged={handleViewableItemsChanged}
                            data={datas}
                            renderItem={({item}) => {
                                return <>
                                    <CalendarDataContext.Provider value={{item, transactions}}>
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
                                        <CalendarBody/>
                                    </CalendarDataContext.Provider>
                                </>
                            }}
                        >
                        </Animated.FlatList>
                    </View>
                    <View style={{flex: 1}}>
                        <Animated.ScrollView
                            showsVerticalScrollIndicator={false}
                            style={[transactionAnimatedStyle]}
                            contentContainerStyle={{marginTop: 4, gap: 4, flex: 1}}>
                            {
                                [...transactions].sort((v, v2) => {
                                    return v.createAt.toMillis() - v2.createAt.toMillis();
                                }).map((item, index) => {
                                    return <TransactionRow key={index} transaction={item}></TransactionRow>
                                })
                            }
                        </Animated.ScrollView>
                    </View>
                </Animated.View>
            </TransactionsContext.Provider>
        </MyView>
    );
}