import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Icon, Item } from '@/components';

export interface IItem {
    name: string;
    disabled?: boolean;
    direction?: 'left' | 'right';
    onPress?: () => void;
    size?: number;
    style?: React.CSSProperties;
}

export default function Chevron({name="label", style={}, disabled=false, ...props}: IItem) {

    return (
        <Item name={name} disabled={disabled} style={style} right={
            <Pressable onPress={props.onPress} style={[styles.button, style.button]}>
                <Icon name={`chevron-${props.direction}`}/>
            </Pressable>
        }/>
    );
}

export const styles = StyleSheet.create({
    button:{
        paddingRight: 10,
        backgroundColor: 'transparent'
    },
});



