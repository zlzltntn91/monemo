import React, {useContext, useState} from 'react';
import {Alert, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {TransactionT} from '@/constatns/types/types';
import MyCard from '@/component/ui/myCard';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import TransactionsContext from "@/component/transaction/transactionsContext";
import {DateTime} from "luxon";
import Separator from "@/component/transaction/separator";
import {COLORS} from "@/constatns/color";
import TransactionContext from "@/component/transaction/transactionContext";
import TransactionDetailModal from "@/component/transaction/modal/transactionDetailModal";
import ModalContext from "@/component/transaction/modal/modalContext";


const TransactionRow = ({transaction}: { transaction: TransactionT }) => {
    const {transactions, setTransactions} = useContext(TransactionsContext);
    const [transactionDetailVisible, setTransactionDetailVisible] = useState(false);

    // 거래 삭제 함수
    const handleDeleteTransaction = () => {
        setTransactions(prev => {
            return prev.filter(v => v.id !== transaction.id);
        });
    };

    // 삭제 확인 함수
    const confirmDelete = () => {
        if (Platform.OS === 'web') {
            if (window.confirm('이 내역을 삭제하시겠습니까?')) {
                handleDeleteTransaction();
            }
        } else {
            Alert.alert(
                '삭제',
                '이 내역을 삭제하시겠습니까?',
                [
                    {text: '취소', style: 'cancel'},
                    {text: '삭제', onPress: handleDeleteTransaction},
                ],
            );
        }
    };

    // 날짜 포맷 함수
    const formatDate = (date: DateTime) => {
        return `${date.month}월 ${date.day}일`;
    };


    // 거래 정보 컴포넌트
    const TransactionInfo = () => (
        <View style={styles.infoContainer}>
            <Text style={styles.dateText}>
                {formatDate(transaction.createAt)}
            </Text>
            <Text style={styles.amountText}>
                {transaction.amount?.toLocaleString()}원
            </Text>
            <Text style={styles.memoText}>
                {transaction.memo}
            </Text>
        </View>
    );

    // 삭제 버튼 컴포넌트
    const DeleteButton = () => (
        <View style={styles.deleteButtonContainer}>
            <Pressable
                style={styles.deleteButton}
                onPress={confirmDelete}
                accessibilityLabel="거래 내역 삭제"
                accessibilityRole="button"
            >
                <MaterialCommunityIcons
                    name="close-circle"
                    style={{left: 2}}
                    size={20}
                    color={COLORS.DELETE}
                />
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <MyCard style={styles.card}>
                <Pressable onPress={() => {
                    setTransactionDetailVisible(true);
                }}>
                    <View style={styles.rowContainer}>
                        <Separator type={transaction.type}/>
                        <TransactionInfo/>
                        <DeleteButton/>
                    </View>
                </Pressable>
            </MyCard>
            <ModalContext.Provider value={{
                isVisible: transactionDetailVisible,
                setIsVisible: setTransactionDetailVisible
            }}>
                <TransactionContext.Provider value={transaction}>
                    <TransactionDetailModal></TransactionDetailModal>
                </TransactionContext.Provider>
            </ModalContext.Provider>
        </View>
    )
        ;
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    card: {
        width: '100%',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    infoContainer: {
        justifyContent: 'center',
        paddingLeft: 4,
        flex: 1,
    },
    dateText: {
        fontWeight: '500',
        fontSize: 16,
    },
    amountText: {
        fontSize: 12,
    },
    memoText: {
        fontSize: 12,
        color: COLORS.TEXT_SECONDARY,
    },
    deleteButtonContainer: {
        height: '100%',
        flex: 0.13,
    },
    deleteButton: {
        width: '100%',
        position: 'absolute',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.BORDER,
        borderLeftWidth: 1,
    },
});

export default TransactionRow;