import {Platform, Pressable, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import MyView from "@/component/myView";
import MyTextInput from "@/component/ui/myTextInput";
import MyCard from "@/component/ui/myCard";
import {LinearGradient} from "expo-linear-gradient";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {COLORS} from "@/constatns/color";
import {LAYOUTS, SPACES} from "@/constatns/space";
import Checkbox from 'expo-checkbox';
import React, {useState} from "react";
import "./index.css";
import {navigation} from "@/navigation";
import {useRouter} from "expo-router";
import MyTextField from "@/component/ui/myTextField";


export default function Index() {

    const {width, height} = useWindowDimensions();
    const [rememberMe, setRememberMe] = useState<boolean | undefined>(false);

    const onLoginPress = () => {

    }

    const router = useRouter();

    const onSignUpPress = () => {
        router.navigate('/account/register');
        console.log('sign up')
    }

    return (
        <MyView style={{}}>
            <View style={{
                ...LAYOUTS.minMax,
                flex: 1,
                gap: 24,
                margin: SPACES.xxl,
                ...LAYOUTS.center
            }}>
                <View style={{height:120, justifyContent: 'center', alignItems: 'center', gap: SPACES.md}}>
                    <View style={{flex: 0.7, ...LAYOUTS.center}}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 56}}>MoneMo</Text>
                    </View>
                    <View style={{flexDirection: 'row', flex: 0.3, ...LAYOUTS.center}}>
                        <Text style={{color: 'white', textAlign: 'center'}}>아직 회원이 아니신가요?</Text>
                        <Text>{' '}</Text>
                        <TouchableOpacity
                            onPress={onSignUpPress}
                            >
                            <Text style={{color: 'white', textAlign: 'center'}}>회원가입</Text>
                            <View style={{
                                height: 1,
                                borderTopWidth: 0.2,
                                borderColor: COLORS.BORDER
                            }}>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/*아이디, 비밀번호*/}
                <MyCard style={{
                    width: '100%',
                    height: 120,
                    justifyContent: 'space-around',
                }}>
                    <MyTextField testId={'userId'}
                                 color={'#3D5AFE'}
                                 icon={'email-outline'}
                                 placeholder={'아이디'}
                                 separator={true}
                    ></MyTextField>
                    <MyTextField testId={'password'}
                                 secureTextEntry={true}
                                 autoCorrect={false}
                                 textContentType={'password'}
                                 keyboardType={'default'}
                                 color={'#3D5AFE'}
                                 icon={'lock-outline'}
                                 placeholder={'비밀번호'}
                                 separator={false}
                    ></MyTextField>
                </MyCard>
                {/*아이디, 비밀번호 END*/}
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between',}}>
                    <TouchableOpacity style={{flexDirection: 'row', gap: 8}}
                                      onPress={() => setRememberMe(!rememberMe)}>
                        <Checkbox
                            value={rememberMe}
                            onValueChange={setRememberMe}
                            color='#3D5AFE'
                            style={{
                                borderColor: 'transparent',
                                width: 20,
                                height: 20,
                            }}>
                        </Checkbox>
                        <Text style={{color: 'white'}}>Remember me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            style={{color: 'white', fontSize: SPACES.md}}>비밀번호를 잊으셨나요?</Text>
                        <View style={{
                            height: 1,
                            top: 1,
                            borderTopWidth: 1,
                            borderColor: COLORS.BORDER
                        }}></View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onLoginPress}
                                  style={{
                                      width: '100%',
                                  }}>
                    <LinearGradient
                        style={{
                            height: SPACES.lg * 3,
                            ...LAYOUTS.center,
                            borderRadius: 8,
                            padding: 8,
                        }}
                        colors={['#3D5AFE', '#304FFE', '#3D5AFE']}
                        locations={[0, 0.5, 1]}
                    >
                        <Text style={{
                            color: 'white', textAlign: 'center', textAlignVertical: 'center',
                        }}>
                            로그인
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: SPACES.sm, width: '100%'}}>
                    <View style={{
                        flex: 1,
                        borderTopWidth: 0.2,
                        borderColor: COLORS.BORDER
                    }}>
                    </View>
                    <Text style={{color: 'white'}}>또는</Text>
                    <View style={{
                        flex: 1,
                        borderTopWidth: 0.2,
                        borderColor: COLORS.BORDER
                    }}>
                    </View>
                </View>
                <TouchableOpacity onPress={onLoginPress}
                                  style={{
                                      height: SPACES.lg * 3,
                                      width: '100%',
                                      backgroundColor: 'white',
                                      ...LAYOUTS.center,
                                      borderRadius: 8,
                                  }}>

                    <Text style={{
                        color: 'black', textAlign: 'center', textAlignVertical: 'center',
                    }}>
                        구글 계정으로 로그인
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onLoginPress}
                                  style={{
                                      height: SPACES.lg * 3,
                                      width: '100%',
                                      backgroundColor: 'white',
                                      ...LAYOUTS.center,
                                      borderRadius: 8,
                                  }}>
                    <Text style={{
                        color: 'black', textAlign: 'center', textAlignVertical: 'center',
                    }}>
                        카카오톡으로 로그인
                    </Text>
                </TouchableOpacity>
            </View>
        </MyView>
    );
}
