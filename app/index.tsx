import {Button, Pressable, Text, View} from "react-native";
import MyView from "@/component/myView";
import {Link} from "expo-router";

export default function Index() {
    return (
        <MyView>
            <Pressable style={{
                marginTop: 10,
                shadowRadius: 4,
                height: 40,
                shadowOffset: {width: 2, height: 1},
                shadowOpacity: 0.2,
                backgroundColor: 'aliceblue',
                justifyContent: 'center'
            }}
            >
                <Link href={'/calendar/page'}
                      style={{textAlign: 'center', fontWeight: 'bold'}}>
                    Go Calendar
                </Link>
            </Pressable>
        </MyView>
    );
}
