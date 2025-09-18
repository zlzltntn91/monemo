import React, {useContext} from 'react';
import {Alert, LayoutAnimation, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {TransactionT} from '@/constatns/types/types';
import MyCard from '@/component/ui/myCard';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import TransactionContext from '@/component/transaction/transactionContext';

// 컬러 상수 정의
const COLORS = {
    INCOME: '#BBDEFB',
    EXPENSE: '#FFCDD2',
    BORDER: '#E0E0E0',
    DELETE: '#f82c2c',
    TEXT_SECONDARY: 'grey',
};

const TransactionRow = ({transaction}: { transaction: TransactionT }) => {
    const {transactions, setTransactions} = useContext(TransactionContext);

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
    const formatDate = (date: Date) => {
        return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    // 구분선 컴포넌트
    const Separator = () => (
        <View
            style={[
                styles.separator,
                {borderColor: transaction.type === 'income' ? COLORS.INCOME : COLORS.EXPENSE}
            ]}
        />
    );

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
                <View style={styles.rowContainer}>
                    <Separator/>
                    <TransactionInfo/>
                    <DeleteButton/>
                </View>
            </MyCard>
        </View>
    );
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
    separator: {
        flex: 0.02,
        height: '100%',
        borderLeftWidth: 8,
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