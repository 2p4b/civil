import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { ExternalLink } from '@/components/ExternalLink';
import { Text, ListView, Subscription } from '@/components';
import { useAuthUser, usePaidPlans } from '@/store/hooks';

interface IScreen {
}


export default function SubscriptionScreen({}: IScreen) {

    const user = useAuthUser();

    const plans = usePaidPlans().toList().toArray();

    function renderRow(data, layout) {
        if(data.index === 0){
            return (
                <View style={[styles.plan, {paddingTop: 50}]}>
                    <Subscription.Plan id={data.item.id} layout={layout}/>
                </View>
            );
        }
        return (
            <View style={styles.plan}>
                <Subscription.Plan id={data.item.id} layout={layout}/>
            </View>
        );
    }

    return (
        <View style={styles.root}>
            <View style={styles.plan}>
                <Subscription.Plan.Full id={user.current_plan ?? "0"} selected={true}/>
            </View>
            <View style={styles.alt}>
                <ListView style={styles.main} data={plans} renderItem={renderRow}/>
            </View>
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
    alt:{
        flex: 1,
    },
    main:{
        flex: 1,
    },
    plan:{
        marginBottom: 10,
    }
});



