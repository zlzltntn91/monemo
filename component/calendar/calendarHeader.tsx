import {Text, View} from "react-native";
import {useContext} from "react";
import CalendarContext from "@/component/calendar/calendarContext";


export default function CalendarHeader({title}: { title: string }) {
    const context = useContext(CalendarContext)
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return (<View style={{
            flexDirection: 'column',
            width: context.width,
            alignSelf: 'auto',
            borderBottomWidth: 2,
        }}>
            <Text style={{paddingLeft: 4, fontWeight: 'bold', fontSize: 32, marginBottom: 8}}>{title}</Text>
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