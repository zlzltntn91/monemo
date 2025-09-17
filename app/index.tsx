import {Button, Pressable, Text, View, Animated, Touchable, TouchableOpacity} from "react-native";
import MyView from "@/component/myView";
import {Link} from "expo-router";
import {useRef} from "react";
import {alignSelf} from "@mui/system";

export default function Index() {

    const opacity = useRef(new Animated.Value(0)).current;
    const translate = useRef(new Animated.Value(0)).current;

    return (
        <MyView>
            <View >
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 100,
                }}>Animated</Text>
                <View>
                    <Text style={{textAlign: 'center'}}>
                        Hello Animated
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Animated.View
                            style={{
                                width: 100,
                                height: 100,
                                backgroundColor: 'red',
                                opacity: opacity,
                                transform: [{translateX: translate}],
                            }}
                        >
                        </Animated.View>
                    </View>

                    <Pressable
                        style={{
                            width: 80,
                            height: 30,
                            backgroundColor: 'red',
                            borderRadius: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            Animated.sequence([
                                    Animated.timing(opacity, {
                                        toValue: 1,
                                        duration: 500,
                                        useNativeDriver: true,
                                    }),
                                    Animated.timing(translate, {
                                        toValue: 800,
                                        duration: 500,
                                        useNativeDriver: true,
                                    })
                                ]
                            ).start();
                        }}
                    >
                        <Text>left to right</Text>
                    </Pressable>

                    <Pressable
                        style={{
                            width: 80,
                            height: 30,
                            backgroundColor: 'red',
                            borderRadius: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            Animated.sequence([
                                    Animated.timing(opacity, {
                                        toValue: 1,
                                        duration: 500,
                                        useNativeDriver: true,
                                    }),
                                    Animated.timing(translate, {
                                        toValue: 0,
                                        duration: 500,
                                        useNativeDriver: true,
                                    })
                                ]
                            ).start();
                        }}
                    >
                        <Text>right to left</Text>
                    </Pressable>
                    <Pressable>
                        <Text>parallel</Text>
                    </Pressable>
                </View>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                        width: 80,
                        height: 30,
                        backgroundColor: 'red',
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: 8
                    }}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={{color: 'white'}}>TouchableOpacity</Text>
                </TouchableOpacity>
                <Pressable
                    style={{
                        width: 80,
                        height: 30,
                        backgroundColor: 'red',
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text style={{color: 'white'}}>Pressable</Text>
                </Pressable>
            </View>
        </MyView>
    );
}
