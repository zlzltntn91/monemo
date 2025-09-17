import {createContext} from "react";
import {Dimensions, DimensionValue} from "react-native";

type ContextType = {
    width: any;
    height: any;
    cellWidth: any;
    cellHeight: any;
};


const cellWidth = "14.28%" as DimensionValue;
const cellHeight = "16.67%" as DimensionValue;
const width = '100%';
const height = Dimensions.get('screen').height * 0.6;
export const defaultContextValue = {width, height, cellWidth, cellHeight};

const CalendarContext = createContext<ContextType>(defaultContextValue);

export default CalendarContext;
