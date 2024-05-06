import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components';
import Subscription from '@/screens/Subscription';

export default function SubscriptionPage() {
    return (
        <View style={styles.container}>
            <Subscription/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        flex: 1,
    },
});

