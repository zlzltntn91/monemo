import React, {useContext, useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import ModalContext from "@/component/transaction/modal/modalContext";
import {useSharedValue, withSequence, withTiming} from "react-native-reanimated";
import {TransactionContext} from "@/component/transaction/transactionContext";
import MyCard from "@/component/ui/myCard";
import Separator from "@/component/transaction/separator";
import {COLORS} from "@/constatns/color";
import TransactionEditModal from "@/component/transaction/modal/transactionEditModal";

function TransactionDetailModal() {
    const modalContext = useContext(ModalContext);
    const transactionContext = useContext(TransactionContext);
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
    const {id, memo, currency, amount, type, createAt} = transactionContext;
    const viewScale = useSharedValue(1);
    return (
        <>
            <Modal
                visible={modalContext.isVisible}
                onShow={() => {
                    viewScale.value = withSequence(
                        withTiming(0.98, {duration: 100}),
                    );
                }}
                // visible={true}
                animationType="slide"
                transparent={true}
                statusBarTranslucent={false}
                onRequestClose={() => {
                    console.log('onRequestClose');
                }}
            >
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
                                setIsEditModalVisible(true);
                            }}
                                       style={{
                                           alignSelf: 'flex-end',
                                           paddingTop: 4,
                                           paddingBottom: 4,
                                           paddingLeft: 8,
                                           paddingRight: 8,
                                           borderRadius: 16,
                                       }}>

                                <Text style={{color: 'black', fontWeight: 500, fontSize: 16}}>편집</Text>
                            </Pressable>
                        </View>
                        {/*닫기, 저장 버튼 END*/}
                        {/*트랜잭션 타입*/}
                        <MyCard>
                            <View style={{flexDirection: 'row'}}>
                                <Separator type={type}></Separator>
                                <View style={{}}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            textAlign: 'left',
                                            fontSize: 20,
                                        }}>{createAt.setLocale('kr').toFormat('yyyy년 M월 dd일 cccc')}</Text>
                                    <Text style={{fontWeight: 500, fontSize: 16}}>
                                        <Text>{amount?.toLocaleString()}원</Text>
                                        {'\n'}
                                        <Text style={{fontSize: 14}}>{memo}</Text>
                                    </Text>
                                </View>
                            </View>
                        </MyCard>
                        {/*트랜잭션 타입 END*/}
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            marginTop: 'auto', borderTopWidth: 1, borderColor: COLORS.BORDER,
                            height: '5%',
                            justifyContent: 'center'
                        }}>
                            <Pressable
                                onPress={() => {
                                    console.log('삭제');
                                }}>
                                <Text style={{fontWeight: 500, color: 'red', textAlign: 'center'}}>내역 삭제</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <ModalContext.Provider value={{isVisible: isEditModalVisible, setIsVisible: setIsEditModalVisible}}>
                <TransactionContext.Provider value={transactionContext}>
                    <TransactionEditModal at={transactionContext.createAt}></TransactionEditModal>
                </TransactionContext.Provider>
            </ModalContext.Provider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
    text: {}
})

export default TransactionDetailModal;

