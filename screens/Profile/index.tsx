import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ExternalLink } from '@/components/ExternalLink';
import { Text, View, TextInput, Button, ListView } from '@/components';
import { useAuthUser } from '@/store/hooks';

import Colors from '@/constants/Colors';

interface ILayout {
    caption?: string;
    subcaption?: string;
    style: React.CSSProperties;
    children: React.ReactNode | React.ReactNode[];
}

function MediaRow(props) {
    return (
        <View style={styles.row}>
            <View style={[{width: props.width, height: props.height}, styles.media]}/>
            <View style={[{width: props.width, height: props.height}, styles.media]}/>
            <View style={[{width: props.width, height: props.height}, styles.media]}/>
        </View>
    );
}

export default function Profile({caption="Welcome", subcaption="Pick up where you left off", ...props}: ILayout) {

    const user = useAuthUser();

    function renderRow(data, layout) {
        return <MediaRow width={(layout.width/3)-5} height={layout.height/3}/>
    }

    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <View style={styles.avatar}/>
                <View style={styles.info}>
                    <View style={styles.info}>
                        <Text style={styles.username}>{user.username}</Text>
                        <Text style={styles.desc} numberOfLines={2} >{user.bio}</Text>
                    </View>
                    <View style={styles.stats}>
                        <View style={styles.stat}>
                            <Text style={styles.statlabel}>Follow</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ListView style={styles.main} data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} renderItem={renderRow}/>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        width: '100%',
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: "white",
    },
    info: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        paddingHorizontal: 4,
        justifyContent: 'center',
    },
    username: {
        paddingVertical: 2,
        fontWeight: 'bold',
        fontSize: 16,
    },
    desc: {

    },
    stats:{
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stat: {
        borderWidth: 2,
        borderRadius: 18,
        borderColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main:{
        flex: 1,
        paddingTop: 30,
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 4,
        justifyContent: 'space-between',
    },
    media: {
        borderRadius: 8,
        backgroundColor: 'white',
    }
});


