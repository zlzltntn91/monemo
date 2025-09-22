import {Pressable, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import MyView from "@/component/myView";
import MyTextInput from "@/component/ui/myTextInput";
import MyCard from "@/component/ui/myCard";
import {LinearGradient} from "expo-linear-gradient";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {COLORS} from "@/constatns/color";
import {LAYOUTS, SPACES} from "@/constatns/space";
import Checkbox from 'expo-checkbox';
import {useState} from "react";
import {flexDirection} from "@mui/system";


export default function Index() {

    const {width, height} = useWindowDimensions();
    const [rememberMe, setRememberMe] = useState<boolean | undefined>(false);
    console.log(width);

    const onLoginPress = () => {

    }

    const onSignUpPress = () => {

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
                <View style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex: 1, ...LAYOUTS.center}}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 56}}>MoneMo</Text>
                    </View>
                    <View style={{flexDirection: 'row', flex: 1, ...LAYOUTS.center}}>
                        <Text style={{color: 'white', textAlign: 'center'}}>아직 회원이 아니신가요?</Text>
                        <Text>{' '}</Text>
                        <Pressable>
                            <Text style={{color: 'white', textAlign: 'center'}}>회원가입</Text>
                            <View style={{
                                height: 1,
                                borderTopWidth: 0.2,
                                borderColor: COLORS.BORDER
                            }}>
                            </View>
                        </Pressable>
                    </View>
                </View>

                <MyCard style={{
                    width: '100%',
                    flex: 0.12,
                    ...LAYOUTS.paddingLR('md'),
                    justifyContent: 'space-around',
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: SPACES.xs
                    }}>
                        <MaterialCommunityIcons name={'email-outline'} size={SPACES.md}
                                                color={'#3D5AFE'}></MaterialCommunityIcons>
                        <MyTextInput
                            textContentType={'emailAddress'}
                            keyboardType={'email-address'}
                            autoCorrect={false}
                            style={{fontSize: SPACES.lg}}
                            placeholder={'ID'}></MyTextInput>
                    </View>
                    <View style={{
                        borderWidth: 1,
                        borderColor: COLORS.BORDER
                    }}></View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row', alignItems: 'center', gap: SPACES.xs
                    }}>
                        <MaterialCommunityIcons name={'lock-outline'} size={SPACES.md}
                                                color={'#3D5AFE'}></MaterialCommunityIcons>
                        <View style={{}}>
                            <MyTextInput
                                textContentType={'password'}
                                keyboardType={'default'}
                                secureTextEntry={true}
                                autoCorrect={false}
                                style={{fontSize: SPACES.lg}}
                                placeholder={'Password'}></MyTextInput>
                        </View>
                    </View>
                </MyCard>
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Pressable style={{flexDirection: 'row', gap: 8}}
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
                    </Pressable>
                    <TouchableOpacity>
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
