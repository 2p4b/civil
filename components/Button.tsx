import React, {useMemo} from 'react';
import Text from './Text';
import { StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/hooks';

interface IButton extends Pressable{
    name: string;
    disabled?: boolean;
    elevation?: number;
}

export default function Button({elevation=2, ...props}: Pressable) {
    const theme = useTheme();

    const disabled = props.disabled ?? false;

    const bstyle = useMemo(() => {
        const themeStyle = { 
            elevation: elevation,
            borderRadius: theme.radius,
            backgroundColor: theme.palette.primary.get(disabled ? theme.variant.disabled : theme.variant.active),
        }
        return [themeStyle, styles.button]
    }, [theme, disabled]);

    const tstyle = useMemo(() => {
        const themeStyle = { 
            color: disabled ? theme.palette.primary.get(200) : "white",
        }
        return [themeStyle]
    }, [theme, disabled]);

    const style = props.style ?? {};

    if(typeof props.children === 'string'){
        return (
            <Pressable {...props} style={[bstyle, style.root]}>
                <Text style={[tstyle, style.text]}>{props.children}</Text>
            </Pressable>
        );
    }

    return (
        <Pressable {...props} style={[bstyle, style.root]}>
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
