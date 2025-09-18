import {GestureResponderEvent, Pressable, Text, View} from "react-native";
import {useContext} from "react";
import CalendarContext from "@/component/calendar/context/calendarContext";
import Animated from "react-native-reanimated";


export default function CalendarHeader({title, onTodayPress}: {
    title: string,
    onTodayPress?: (e: GestureResponderEvent) => void
}) {
    const context = useContext(CalendarContext)
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    return (<View style={{
            flexDirection: 'column',
            width: context.width,
            alignSelf: 'auto',
            // backgroundColor: '#CFD8DC',
            borderBottomWidth: 2,
        }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Animated.Text style={{paddingLeft: 4, fontWeight: 'bold', fontSize: 32, marginBottom: 8}}>{title}</Animated.Text>
                <Pressable style={{
                    width: 40,
                    height: 20,
                    marginLeft: 'auto',
                    right: 8,
                    backgroundColor: '#E0E0E0',
                    borderRadius: 8,
                }}
                onPress={onTodayPress ? onTodayPress : () => {}}>
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: 500
                    }}>오늘</Text>
                </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                {
                    days.map((v, i) => {
                        return (
                            <Text
                                key={v + i}
                                style={{
                                    width: context.cellWidth,
                                    textAlign: 'right',
                                    paddingRight: 4,
                                    paddingBottom: 4,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    color: (i % 6 === 0 ? 'grey' : 'black')
                                }}>{v}</Text>
                        )
                    })
                }
            </View>
        </View>
    )
}