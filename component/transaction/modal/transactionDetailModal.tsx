import React, {useContext} from 'react';
import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import ModalContext from "@/component/transaction/modal/modalContext";
import {useSharedValue, withSequence, withTiming} from "react-native-reanimated";

function TransactionDetailModal() {
    const modalContext = useContext(ModalContext);
    const viewScale = useSharedValue(1);
    return (
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
                    <Pressable onPress={() => {}}
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
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {},
    text: {}
})

export default TransactionDetailModal;

