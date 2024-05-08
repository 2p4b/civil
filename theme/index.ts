import { Record } from "immutable";
import { createContext } from 'react';
import colors from './colors';

const tintColorLight = '#ccc';
const tintColorDark = '#fff';

export interface IThemePartial {
    mode: 'light' | 'dark';
    rounding: number;
}

export class Color extends Record(colors.blue, "primary"){};

export class Palette extends Record({ 
    text: new Color(colors.gray, "monochrome"),
    icon: new Color(colors.gray, "monochrome"),
    monochrome: new Color(colors.gray, "monochrome"),
    border: new Color(colors.gray, "border"), 
    primary: new Color(colors.blue, "primary"),
    disabled: new Color(colors.gray, "primary"),
    secondary: new Color(colors.red , "secondary"), 
    background: new Color(colors.gray, "background"), 
    placeholder: new Color(colors.red, "placeholder"), 
    active: new Color(colors.green, "active"), 
}){}

export class Variant extends Record({
    text: 800,
    icon: 600,
    disabled: 500,
    placeholder: 300,
    background: 50,
    border: 300,
    active: 700,
    tab: 950,
    pressed: 600,
}) {}

class Variants extends Record({
    light: new Variant(),
    dark: new Variant({background: 900, text: 100, icon: 100}),
}) {}


export class Colors extends Record({ 
    ...(Object.entries(colors).map(([key, value]) => [key, new Color(value, key)]).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {}))
}){}

// This is the theme object that will be passed to the ThemeProvider
export const theme = {
    mode: 'dark',
    radius: 12,
    direction: 'ltr',
    colors: new Colors(),
    palette: new Palette(),
    variants: new Variants(),
}

export const Context = createContext(theme);

export default class Theme extends Record(theme) {
    static Context = Context;

    get variant() {
        return this.variants[this.mode];
    }

    get is_dark() {
        return this.mode === 'dark';
    }

    get is_light() {
        return this.mode === 'light';
    }
}

