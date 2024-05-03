import { useMemo } from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import { useTheme } from "@/hooks"

export type TTextInput = UIMode & RNTextInput['props'];

export default function TextInput({style, placeholder="Please enter text here", keyboardType="ascii-capable", ...props}: TTextInput) {
    const theme = useTheme();

    const nstyle = useMemo(() => {
        const themeStyle = { 
            borderRadius: theme.radius,
            color: theme.palette.text.get(theme.variant.text),
            borderColor: theme.palette.text.get(theme.variant.border),
        }
        return [themeStyle, styles.input, style]
    }, [theme]);

    return <RNTextInput 
                keyboardType={keyboardType} 
                placeholder={placeholder} 
                placeholderTextColor={theme.palette.text.get(theme.variant.disabled)}
                style={[nstyle, style]} {...props}/>;
}

export const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
    }
});
