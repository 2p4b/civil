import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, ListView } from '@/components';

interface IScreen{
}

function Card(props) {
    return (
        <View style={[{width: props.width, height: props.height}, styles.card]}/>
    );
}

export default function Feed(props: IScreen) {

    function renderCard(data, layout) {
        return <Card width={layout.width} height={layout.height/2}/>
    }

    return (
        <View style={styles.root}>
            <ListView style={styles.main} data={[1, 2]} renderItem={renderCard}/>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        paddingTop: 10,
        flexDirection: 'column',
    },
    main:{
        flex: 1
    },
    card: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 4,
        borderRadius: 8,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
});


