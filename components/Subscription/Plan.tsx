import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { usePaidPlan, useUserSubscription } from '@/store/hooks';
import Text from '../Text';
import Icon from '../Icon';
import Feature from './Feature';
//import ExternalLink from '../ExternalLink';

interface IPlan {
    id: string;
    active?: boolean;
    selected?: boolean;
    available?: boolean;
}

export default function Plan({id, selected=false, active=false, available=true}: IPlan) {
    const plan = usePaidPlan(id);

    async function onSubscribe(){
        subscription.subscribe(plan.id);
    }

    return (
        <View style={styles.root}>
            <Pressable style={styles.header}  onPress={onSubscribe}>
                <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail" >{plan.name}</Text>
                {(selected || active) && (
                    <View style={styles.check}>
                        <Icon size={25} name="check-circle"/>
                    </View>
                )}
            </Pressable>
            <Text style={styles.price}>{`${plan.price}/${plan.billing}`}</Text>
            <View style={styles.offers}>
                {plan.__offers.map((offer) => (
                    <View key={offer} style={styles.feature}>
                        <View style={styles.check}>
                            <Icon name="check"/>
                        </View>
                        <Feature.Name id={offer}/>
                    </View>
                ))}
            </View>
        </View>
    );
}

Plan.Full = Plan;

const styles = StyleSheet.create({
    root: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    check:{
        paddingTop: 5,
        paddingRight: 5,
    },
    feature:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    name:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    price:{
        fontSize: 14,
        fontWeight: 'bold',
        paddingVertical: 2,
    },
    billing:{
    },
    offers:{
    },
    offer:{
    },
});







