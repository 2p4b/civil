import React, {useState, useEffect } from 'react';
import { StyleSheet, Pressable, Switch as RNSwitch} from 'react-native';
import View from './View';
import Text from './Text';
import Icon from './Icon';
import { useTheme } from "@/hooks"

export interface IStyles {
    root?: React.CSSProperties;
    action?: React.CSSProperties;
    main?: React.CSSProperties;
    label?: React.CSSProperties;
    description?: React.CSSProperties;
}

export interface IItem {
    name: string;
    size: number;
    disabled?: boolean;
    description?: string;
    onPress?: () => void;
    styles?: IStyles;
}

export default function Item({name="Item name", disabled=false, ...props}: IItem) {

    const theme = useTheme();

    const descriptionStyle = {
        fontSize: 12,
        color: theme.palette.text.get(400),
    }

    const ustyle = props.styles ?? defaultStyles;

    return (
        <View style={[styles.root, ustyle.root]}>
            <View style={[styles.main, ustyle.main]} onPress={props.onPress}>
                <View style={[styles.label, ustyle.label]}>
                    {props.icon && (
                        <Icon name={props.icon} size={props.size} style={[styles.icon, ustyle.icon]}/>
                    )}
                    <Text style={[styles.name, ustyle.name]}>{name}</Text>
                </View>
                {props.description && (
                    <Text style={[styles.description, descriptionStyle, ustyle.description]}>
                        {props.description}
                    </Text>
                )}
            </View>
            <View style={[styles.right, ustyle.right]}>
                {props.right}
            </View>
        </View>
    );
}

const defaultStyles = StyleSheet.create({
    root: {
    },
    right: {
    },
    icon: {
    },
    main: {
    },
    label: {
    },
    name:{
    },
    description: {
    }
});

export const styles = StyleSheet.create({
    root: {
        paddingTop: 4,
        paddingBottom: 10,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent'
    },
    main:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent'
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'transparent'
    },
    description:{
        paddingHorizontal: 20,
    },
    label:{
        paddingLeft: 8,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    icon:{
        paddingLeft: 10,
    },
    right:{
        alignItems: 'center',
        paddingRight: 10,
        flexDirection: 'row',
        backgroundColor: 'transparent'
    }
});

