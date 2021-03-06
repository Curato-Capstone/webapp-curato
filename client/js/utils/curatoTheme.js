import {
    cyan500,
    cyan700,
    grey100,
    grey300,
    grey400,
    grey500,
    white,
    darkBlack,
    fullBlack,
} from 'material-ui/styles/colors';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';
import { primaryColor } from './colors';

const curatoTheme = {
    spacing: {
        iconSize: 24,
        desktopGutter: 24,
        desktopGutterMore: 32,
        desktopGutterLess: 16,
        desktopGutterMini: 8,
        desktopKeylineIncrement: 64,
        desktopDropDownMenuItemHeight: 32,
        desktopDropDownMenuFontSize: 15,
        desktopDrawerMenuItemHeight: 48,
        desktopSubheaderHeight: 48,
        desktopToolbarHeight: 56,
    },
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: '#FFFFFF',
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: primaryColor,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: ColorManipulator.fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: ColorManipulator.fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
};

export default curatoTheme;
