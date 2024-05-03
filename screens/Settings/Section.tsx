import React, {useState, useEffect } from 'react';
import { useTheme } from "@/hooks"
import { StyleSheet, SafeAreaView } from 'react-native';
import { Text, View, ScrollView, Switch, Chevron } from '@/components';

export interface IStyles {
    root: React.CSSProperties;
    main: React.CSSProperties;
    divider: React.CSSProperties;
}

export interface ISection {
    radius?: number;
    label?: string;
    children?: any;
    style?: StyleSheet;
    styles?: IStyles;
}

function Divider(props){
    const theme = useTheme();
    const style = {
        //backgroundColor: theme.palette.background.get(800)
    }
    return (
        <View style={[styles.divider, style, props.styles.divider]}/>
    );
}

export default function Section(props: IScreen) {
    const theme = useTheme();

    const ustyles = props.styles ?? defaultStyles;

    const style = {
        borderRadius: theme.radius,
        backgroundColor: theme.palette.background.get(800)
    }

    if(Array.isArray(props.children)){
        return (
            <View style={[styles.root, ustyles.root]}>
                {props.label && (
                    <Text style={[styles.label, ustyles.label]}>{props.label}</Text>
                )}
                <View style={[styles.main, style, ustyles.main]}>
                    {props.children.map((child, index) => {
                        if(index > 0){
                            return (
                                <React.Fragment key={String(index)}>
                                    <Divider key={String(index)} styles={ustyles}/>
                                    <View style={[styles.item, ustyles.item]}>
                                        {child}
                                    </View>
                                </React.Fragment>
                            )
                        }
                        return <View key={String(index)} style={[styles.item, ustyles.item]}>{child}</View>
                    })}
                </View>
            </View>
        );
    }

    return (
        <View style={[styles.root, style, props.style]}>
            {props.children}
        </View>
    );
}

const defaultStyles = StyleSheet.create({
    root: {
    },
    main:{
    },
    label:{
    },
    divider:{
    },
    item: {
    }
});

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginBottom: 10,
        flexDirection: 'column',
    },
    main:{
        borderRadius: 0,
        marginBottom: 10,
        flexDirection: 'column',
    },
    label:{
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    divider:{
        width: '100%',
        height: 0.5,
    },
    item: {
        backgroundColor: 'transparent'
    }
});



