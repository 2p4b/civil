import React, {useMemo} from 'react';
import Text from './Text';
import { StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/hooks';

interface IButton extends Pressable{
    name: string;
    disabled?: boolean;
    elevation?: number;
}

export default function Button({elevation=2, disabled=false, ...props}: Pressable) {
    const theme = useTheme();

    const bstyle = useMemo(() => {
        const themeStyle = { 
            elevation: elevation,
            borderRadius: theme.radius,
            backgroundColor: theme.palette.primary.get(disabled ? theme.variant.disabled : theme.variant.active),
        }
        return [themeStyle, styles.button]
    }, [theme]);

    const tstyle = useMemo(() => {
        const themeStyle = { 
            color: theme.palette.text.get(theme.variant.text),
        }
        return [themeStyle]
    }, [theme]);

    const style = props.style ?? {};

    if(typeof props.children === 'string'){
        return (
            <Pressable style={[bstyle, style.root]} onPress={props.onPress}>
                <Text style={[tstyle, style.text]}>{props.children}</Text>
            </Pressable>
        );
    }

    return (
        <Pressable style={[bstyle, style.root]} onPress={props.onPress}>
            {props.children}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
    },
});
