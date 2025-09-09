import MyView from "@/component/myView";
import {SectionList, Text, View} from "react-native";

const TEST_DATA = [
    {data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], title: 'Section'},
];

// 빈자리 체워들어가게 한번 만들어보자
export default function CalendarPage() {
    return (
        <MyView>
            <SectionList
                // showsVerticalScrollIndicator={false}
                initialScrollIndex={3}
                initialNumToRender={2}
                getItemLayout={(data, index) => (
                    {length: 302, offset: (300 + 2) * index, index}
                )}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={true}
                scrollIndicatorInsets={{right: 1}}
                contentContainerStyle={{gap: 4}}
                sections={TEST_DATA}
                stickySectionHeadersEnabled={true}
                renderSectionHeader={(info) =>
                    <View style={{backgroundColor: 'black'}}>
                        <Text style={{color: 'white', textAlign: 'center'}}>HEADER</Text>
                    </View>
                }
                stickyHeaderHiddenOnScroll={true}
                renderSectionFooter={(info) =>
                    <View style={{backgroundColor: 'black'}}>
                        <Text style={{color: 'white', textAlign: 'center'}}>FOOTER</Text>
                    </View>
                }
                renderItem={({item, section}) => {
                    return (
                        <View style={{height: 300, borderWidth: 2, padding: 8, marginLeft: 4, marginRight: 4}}>
                            <Text>Hello{' '}{section.title}{' '}
                                <Text>{item}</Text>
                            </Text>
                        </View>
                    )
                }}>
            </SectionList>
        </MyView>
    )
}