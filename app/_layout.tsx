import {Tabs} from "expo-router";
import CalendarContext, {defaultContextValue} from "@/component/calendar/context/calendarContext";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function RootLayout() {
    return (
        <>
            <CalendarContext value={defaultContextValue}>
                <Tabs>
                    <Tabs.Screen name={"index"} options={{title: "INDEX", headerShown: false}}/>
                    <Tabs.Screen name={"calendar/page"}

                                 options={{
                                     title: "", headerShown: false, tabBarIcon: () => {
                                         return <MaterialCommunityIcons name={'calendar'} color={'blue'} size={24}
                                                                        style={{top: 2}}/>;
                                     }
                                 }}/>
                </Tabs>
            </CalendarContext>
        </>)

}
