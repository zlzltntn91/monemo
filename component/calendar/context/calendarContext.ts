import {createContext} from "react";
import {Dimensions, DimensionValue} from "react-native";
import {DateTime} from "luxon";

type ContextType = {
    width: any;
    height: any;
    cellWidth: any;
    cellHeight: any;
    onPressDay?:  undefined | ((dateTime: DateTime) => void);
    onPressLongDay?: undefined | ((dateTime: DateTime) => void);
    isVisible?: boolean;
    setIsVisible?: undefined | ((v: boolean) => void);
};


const cellWidth = "14.28%" as DimensionValue;
const cellHeight = "16.67%" as DimensionValue;
const width = '100%';
const height = Dimensions.get('window').height * 0.5;
export const defaultContextValue = {width, height, cellWidth, cellHeight, isVisible: true};
const CalendarContext = createContext<ContextType>(defaultContextValue);

export default CalendarContext;
