import React from 'react';
import { StyleSheet } from 'react-native';
import { usePaidFeature } from '@/store/hooks';
import Text from '../Text';
//import ExternalLink from '../ExternalLink';

interface IFeature {
    id: string;
}

export function Name({id}: IFeature) {
    const feature = usePaidFeature(id);
    return (
        <Text style={styles.name}>{feature.name}</Text>
    );
}

export default function Feature({id}: IFeature) {
    const feature = usePaidFeature(id);
    return (
        <Text style={styles.root}>{feature.name}</Text>
    );
}

Feature.Name = Name;

const styles = StyleSheet.create({
    root: {
    },
});






