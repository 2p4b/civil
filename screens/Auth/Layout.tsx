import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ExternalLink } from '@/components/ExternalLink';
import { Text, TextInput, Button } from '@/components';
import { useSession } from '@/store/hooks';

import Colors from '@/constants/Colors';

interface ILayout {
    caption?: string;
    subcaption?: string;
    style: React.CSSProperties;
    children: React.ReactNode | React.ReactNode[];
}

export default function Layout({ caption="Welcome", subcaption="Pick up where you left off", ...props}: ILayout) {
    const { user } = useSession();
    if(!user.is_anonymous){
        caption = `Welcome, ${user.username}`;
    }
    return (
        <View style={styles.root}>
            <View styles={styles.header}>
                <Text style={styles.caption}>{caption}</Text>
                <Text style={styles.subcaption}>{subcaption}</Text>
            </View>
            <View style={styles.main}>
                {props.children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'column',
    },
    caption: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    subcaption: {
        fontSize: 24,
        fontWeight: 'normal',
    },
    main:{
        flex: 1,
        flexDirection: 'column',
        JustifyContent: 'flex-end',
    },
});

