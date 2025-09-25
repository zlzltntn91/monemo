import React, {useRef, useState} from 'react';
import {Keyboard, Modal, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LAYOUTS, SPACES} from "@/constatns/space";
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import MyView from "@/component/myView";
import MyCard from "@/component/ui/myCard";
import {useRouter} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import {useHeaderHeight} from "@react-navigation/elements";
import MyTextField from "@/component/ui/myTextField";
import UnderLine from "@/component/ui/separator";
import {SIGN_UP_SCHEMA} from "@/constatns/schema/schema";
import {Controller, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import supabaseClient from "@/src/supabaseClient";
import {COLORS} from "@/constatns/color";
import {BlurView} from 'expo-blur';


function Register() {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<z.infer<typeof SIGN_UP_SCHEMA>>({
        resolver: zodResolver(SIGN_UP_SCHEMA),
    });
    type SignUpType = z.infer<typeof SIGN_UP_SCHEMA>;

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [password, setPassword] = React.useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');
    const [isKeyboardVisible, setIsKeyboardVisible] = React.useState<boolean>(false);
    const [supabaseMessage, setSupabaseMessage] = React.useState<string | null>(null);
    const router = useRouter();
    const nameRef = useRef('Anonymous');

    const onPressGoLoginPage = () => {
        router.navigate("/");
    }

    React.useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true);
        });
        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false);
        });
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const headerHeight = useHeaderHeight();

    async function onValid(e: SignUpType) {
        const {data: signUpData, error: signUpError} = await supabaseClient.auth.signUp({
            email: e.email,
            password: e.password,
            options: {
                data: {
                    name: e.name,
                    preferences: {theme: 'dark', language: 'ko'}
                }
            }
        });

        if (signUpData) {
            setSupabaseMessage('');
            nameRef.current = e.name;
            setIsVisible(true);
        }

        if (signUpError) {
            let message = signUpError.message.includes('already registered');
            setSupabaseMessage(message ? '이미 가입된 회원입니다.' : '');
        }
    }

    function onInvalid(errors: SignUpType, v) {
        console.log(errors);
        console.log(v);
    }

    return (
        <>

            <MyView style={{}}>
                <Modal
                    visible={isVisible}
                    style={{flex: 1}}
                    animationType={'slide'}
                    transparent={true}
                    statusBarTranslucent={false}
                >
                    <BlurView style={{flex: 1}} intensity={100} tint="dark">
                        <View style={{
                            margin: 'auto',
                            width: '80%',
                            shadowColor: COLORS.BORDER,
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.2,
                            flex: 0.25,
                            shadowRadius: 12,
                            elevation: 5,
                            backgroundColor: '#212121',
                            borderRadius: 10,
                            gap: SPACES.md,
                            justifyContent: 'space-around'
                        }}>
                            <View style={{height: SPACES.lg * 3, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: SPACES.xl,
                                    fontWeight: 'bold'
                                }}>{nameRef.current}님, {' '}
                                    <Text style={{fontSize: SPACES.xl}}>
                                        환영해요!
                                    </Text>
                                </Text>
                            </View>
                            <View style={{height: SPACES.lg * 3, alignItems: 'center'}}>
                                <Text style={{textAlign: 'left', color: COLORS.BORDER, fontSize: SPACES.md}}>
                                    가입이 완료되었습니다.
                                    {'\n'}
                                    이제
                                    {' '}
                                    <Text style={{
                                        top: 1,
                                        color: '#3D5AFE',
                                        fontSize: SPACES.xl,
                                        fontWeight: 'bold',
                                    }}>MoneMo</Text>
                                    {' '}
                                    에서 지출내역을 기록해보세요.
                                </Text>
                            </View>
                            <View style={{height: SPACES.lg * 3, width: '100%'}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsVisible(false);
                                        router.navigate("/");
                                    }}
                                    style={{
                                        flex: 1,
                                        ...(!isKeyboardVisible ? {
                                            marginLeft: SPACES.xxl,
                                            marginRight: SPACES.xxl
                                        } : {}),
                                        marginBottom: 6,
                                    }}>
                                    <LinearGradient
                                        style={{
                                            height: SPACES.lg * 3,
                                            ...LAYOUTS.center,
                                            ...(!isKeyboardVisible ? {borderRadius: 8} : {}),
                                        }}
                                        colors={['#3D5AFE', '#304FFE', '#3D5AFE']}
                                        locations={[0, 0.5, 1]}
                                    >
                                        <Text style={{
                                            color: 'white', textAlign: 'center', textAlignVertical: 'center',
                                        }}>
                                            확인
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </BlurView>
                </Modal>
                <KeyboardAvoidingView style={{flex: 1}}
                                      keyboardVerticalOffset={headerHeight}
                                      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                >
                    <View style={{
                        ...LAYOUTS.minMax,
                        flex: 1,
                        gap: 24,
                        ...LAYOUTS.center
                    }}>
                        <View style={{height: 120, justifyContent: 'center', alignItems: 'center', gap: SPACES.md}}>
                            <View style={{flex: 0.7, ...LAYOUTS.center}}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 56}}>회원가입</Text>
                            </View>
                            <View style={{flexDirection: 'row', flex: 0.3, ...LAYOUTS.center}}>
                                <Text style={{color: 'white', textAlign: 'center'}}>이미 회원이신가요?</Text>
                                <Text>{' '}</Text>
                                <TouchableOpacity
                                    onPress={onPressGoLoginPage}
                                >
                                    <Text style={{color: 'white', textAlign: 'center'}}>로그인하기</Text>
                                    <UnderLine/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{height: 240, width: '100%'}}>
                            <MyCard style={{flex: 1, marginLeft: SPACES.xxl, marginRight: SPACES.xxl}}>
                                <Controller
                                    name={'name'}
                                    control={control}
                                    render={({field: {value, onChange}}) => {
                                        return (
                                            <MyTextField testId={'userName'}
                                                         value={value}
                                                         maxLength={15}
                                                         onChangeText={onChange}
                                                         color={'#3D5AFE'}
                                                         icon={'account-circle-outline'}
                                                         placeholder={'이름'}
                                                         separator={true}>
                                            </MyTextField>
                                        )
                                    }}>
                                </Controller>
                                <Controller
                                    name={'email'}
                                    control={control}
                                    render={({field: {value, onChange}}) => {
                                        return (<MyTextField testId={'userId'}
                                                             value={value}
                                                             onChangeText={onChange}
                                                             color={'#3D5AFE'}
                                                             icon={'email-outline'}
                                                             placeholder={'아이디'}
                                                             separator={true}

                                        ></MyTextField>)
                                    }}>
                                </Controller>
                                <Controller
                                    name={'password'}
                                    control={control}
                                    render={({field: {value, onChange}}) => (
                                        <MyTextField testId={'password'}
                                                     value={value}
                                                     onChangeText={onChange}
                                                     secureTextEntry={true}
                                                     autoCorrect={false}
                                                     textContentType={'password'}
                                                     color={'#3D5AFE'}
                                                     icon={'lock-outline'}
                                                     placeholder={'비밀번호'}
                                                     separator={true}
                                        ></MyTextField>
                                    )}>
                                </Controller>
                                <Controller
                                    name={'passwordConfirm'}
                                    control={control}
                                    render={({field: {value, onChange}}) => (
                                        <MyTextField testId={'passwordConfirm'}
                                                     value={value}
                                                     onChangeText={onChange}
                                                     secureTextEntry={true}
                                                     autoCorrect={false}
                                                     textContentType={'password'}
                                                     color={'#3D5AFE'}
                                                     icon={'lock-check-outline'}
                                                     placeholder={'비밀번호 확인'}
                                                     separator={false}
                                        ></MyTextField>)}>
                                </Controller>
                            </MyCard>
                        </View>
                        {Object.values(errors).find(e => e?.message) && (
                            <Text style={{color: 'white'}}>
                                {Object.values(errors).find(e => e?.message)?.message ?? ''}
                            </Text>
                        )}
                        {supabaseMessage && Object.keys(errors).length === 0 &&
                            <Text style={{color: 'white', fontSize: 'bold'}}>{supabaseMessage}</Text>
                        }
                        <View style={{width: '100%'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log('onPress');
                                    handleSubmit(onValid, onInvalid)();
                                }}
                                style={{
                                    flex: 1,
                                    ...(!isKeyboardVisible ? {marginLeft: SPACES.xxl, marginRight: SPACES.xxl} : {}),
                                }}>
                                <LinearGradient
                                    style={{
                                        height: SPACES.lg * 3,
                                        ...LAYOUTS.center,
                                        ...(!isKeyboardVisible ? {borderRadius: 8} : {}),
                                    }}
                                    colors={['#3D5AFE', '#304FFE', '#3D5AFE']}
                                    locations={[0, 0.5, 1]}
                                >
                                    <Text style={{
                                        color: 'white', textAlign: 'center', textAlignVertical: 'center',
                                    }}>
                                        등록
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </MyView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
    text: {}
})

export default Register;

