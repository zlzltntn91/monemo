import {ViewStyle} from "react-native";
import {left, right} from "@popperjs/core";

type SpaceT = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';


export const SPACES = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24
}

export const LAYOUTS = {
    minMax: {
        minWidth: 320,
        maxWidth: 1440,
        minHeight: 568,
        maxHeight: 1024,
    } as ViewStyle,

    center: {
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,

    paddingLR: (space: SpaceT): ViewStyle => ({
        paddingLeft: SPACES[space],
        paddingRight: SPACES[space],
    }),

    paddingTB: (space: SpaceT): ViewStyle => ({
        paddingTop: SPACES[space],
        paddingBottom: SPACES[space],
    }),
}