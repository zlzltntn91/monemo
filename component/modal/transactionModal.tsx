import React, {createContext, useContext, useEffect, useState} from 'react';
import Animated, {useSharedValue, withSequence, withTiming} from "react-native-reanimated";
import {Dimensions, DimensionValue, Modal, Pressable, Text, View} from "react-native";
import MyTextInput from "@/component/ui/myTextInput";
import MyCard from "@/component/ui/myCard";
import {DateTime} from "luxon";
import {CalendarDataContext} from "@/component/calendar/context/calendarDataContext";
import {transactions} from "@/constatns/transaction";
import CalendarBody from "@/component/calendar/calendarBody";
import MyCalendar from "@/src/calendar";
import CalendarHeader from "@/component/calendar/calendarHeader";
import CalendarContext from "@/component/calendar/context/calendarContext";

export const ModalContext = createContext({
    isVisible: false,
    setIsVisible: (v: boolean) => {
    },
    amount: '',
    setAmount: (v: string) => {
    },
    memo: '',
    setMemo: (v: string) => {
    },
    createAt: DateTime.local(),
    setCreateAt: (v: DateTime) => {
    },
});


const cellWidth = "14.28%" as DimensionValue;
const cellHeight = "16.67%" as DimensionValue;
const width = '100%';
const height = '80%';

const defaultValue = {cellWidth, cellHeight, width, height};

function TransactionModal() {
    const modalContext = useContext(ModalContext);
    const {amount, setAmount, memo, setMemo, createAt, setCreateAt} = modalContext;
    const viewScale = useSharedValue(1);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');

    useEffect(() => {
        if (!modalContext.isVisible) {
            setAmount('');
            setMemo('');
        }
    }, [modalContext.isVisible]);

    return (
        <Modal
            onDismiss={() => {
                console.log('onDismiss');
            }}
            onShow={() => {
                viewScale.value = withSequence(
                    withTiming(0.98, {duration: 100}),
                );
            }}
            // visible={true}
            visible={modalContext.isVisible}
            animationType="slide"
            transparent={true}
            statusBarTranslucent={false}
            onRequestClose={() => {
                console.log('onRequestClose');
            }}
        >
            {/*모달 전체 뷰*/}
            <View style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: 'center',
            }}>
                <View
                    style={{
                        padding: 8,
                        backgroundColor: 'white',
                        width: '96%',
                        height: '99%',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        gap: 12,
                    }}>
                    {/*닫기, 저장 버튼*/}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Pressable onPress={() => {
                            modalContext.setIsVisible(false);
                        }}
                                   style={{
                                       alignSelf: 'flex-start',
                                       // backgroundColor: '#4FC3F7',
                                       paddingTop: 4,
                                       paddingBottom: 4,
                                       paddingLeft: 8,
                                       paddingRight: 8,
                                       borderRadius: 16,
                                   }}>

                            <Text style={{color: 'red', fontWeight: 500, fontSize: 16}}>닫기</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            modalContext.setIsVisible(false);
                        }}
                                   style={{
                                       alignSelf: 'flex-end',
                                       paddingTop: 4,
                                       paddingBottom: 4,
                                       paddingLeft: 8,
                                       paddingRight: 8,
                                       borderRadius: 16,
                                   }}>

                            <Text style={{color: 'black', fontWeight: 500, fontSize: 16}}>저장</Text>
                        </Pressable>
                    </View>
                    {/*닫기, 저장 버튼 END*/}
                    {/*트랜잭션 타입*/}
                    <View style={{
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        shadowRadius: 4,
                        shadowColor: 'grey',
                        backgroundColor: 'white',
                        shadowOpacity: 0.2,
                        shadowOffset: {width: 0, height: 2},
                        elevation: 4
                    }}>
                        <Pressable style={({pressed}) => ({
                            flex: 1,
                            padding: 8,
                            backgroundColor: transactionType === 'income' ? '#E0E0E0' : 'white',
                            borderTopLeftRadius: 8,
                            borderBottomLeftRadius: 8,
                            borderTopRightRadius: transactionType === 'income' ? 8 : undefined,
                            borderBottomRightRadius: transactionType === 'income' ? 8 : undefined,
                        })}
                                   onPress={() => {
                                       setTransactionType('income');
                                   }}>
                            <Text style={{fontWeight: 500, textAlign: 'center'}}>수입</Text>
                        </Pressable>
                        <Pressable style={{
                            flex: 1,
                            padding: 8,
                            backgroundColor: transactionType === 'expense' ? '#E0E0E0' : 'white',
                            borderTopLeftRadius: transactionType === 'expense' ? 8 : undefined,
                            borderBottomLeftRadius: transactionType === 'expense' ? 8 : undefined,
                            borderTopRightRadius: 8,
                            borderBottomRightRadius: 8,
                        }}
                                   onPress={() => {
                                       setTransactionType('expense');
                                   }}>
                            <Text style={{fontWeight: 500, textAlign: 'center'}}>지출</Text>
                        </Pressable>
                    </View>
                    {/*트랜잭션 타입 END*/}
                    {/*금액, 메모*/}
                    <MyCard>
                        {/*금액*/}
                        <MyTextInput appendString={'원'}
                                     value={amount ? Number(amount).toLocaleString() : undefined}
                                     onChange={(e) => {
                                         const _amount = e.nativeEvent.text.replace(/[^0-9]/g, '');
                                         setAmount(_amount);
                                     }}
                                     keyboardType={'number-pad'}
                                     placeholder={'금액'}
                        ></MyTextInput>
                        {/*금액 END*/}
                        {/*메모*/}
                        <MyTextInput
                            multiline={true}
                            numberOfLines={3}
                            maxLength={100}
                            value={memo}
                            onChangeText={setMemo}
                            keyboardType={'default'}
                            placeholder={'메모'}
                            style={{
                                flex: 1,
                                fontSize: 16,
                                height: 'auto',
                                textAlign: 'left'
                            }}
                        ></MyTextInput>
                        {/*메모 END*/}
                    </MyCard>
                    {/*금액, 메모 END*/}
                    {/*일자*/}
                    <MyCard>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{
                                fontSize: 16,
                                padding: 8,
                            }}>
                                {transactionType === 'income' ? '수입일자' : '지출일자'}
                            </Text>
                            <MyCard style={{width: 100, backgroundColor: '#E0E0E0', marginRight: 8, height: '90%'}}>
                                <Pressable onPress={() => {
                                    setIsCalendarVisible(!isCalendarVisible);
                                    console.log('onPress');
                                }}>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >{modalContext.createAt.toFormat('yyyy.MM.dd')}
                                    </Text>
                                </Pressable>

                            </MyCard>

                        </View>
                        <View style={{
                            position: 'sticky',
                            marginLeft: 8,
                            marginRight: 8,
                            borderBottomWidth: 1,
                            borderColor: '#BDBDBD'
                        }}>
                        </View>
                        {isCalendarVisible &&
                            <View style={{height:400}}>
                                <CalendarContext value={defaultValue}>
                                    <CalendarDataContext
                                        value={{item: MyCalendar.getCalendar(createAt), transactions: []}}>
                                        <CalendarHeader title={`${createAt.year}년 ${createAt.month}월`}
                                                        onTodayPress={() => {
                                                        }}>
                                        </CalendarHeader>
                                        <CalendarBody>
                                        </CalendarBody>
                                    </CalendarDataContext>
                                </CalendarContext>
                            </View>
                        }
                    </MyCard>
                    {/*일자 END*/}

                </View>
            </View>
        </Modal>
    );
}

export default TransactionModal;