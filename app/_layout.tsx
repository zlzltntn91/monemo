import {Tabs} from "expo-router";
import CalendarContext, {defaultContextValue} from "@/component/calendar/calendarContext";

export default function RootLayout() {
    return (
        <>
            <CalendarContext value={defaultContextValue}>
                <Tabs>
                    <Tabs.Screen name={"index"} options={{title: "INDEX", headerShown: false}}/>
                    <Tabs.Screen name={"calendar/page"} options={{title: "CALENDAR", headerShown: false}}/>
                </Tabs>
            </CalendarContext>
        </>)

}
