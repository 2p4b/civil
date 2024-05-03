import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components';
import Settings from '@/screens/Settings';

export default function ModalScreen() {
    return (
        <View style={styles.container}>
            <Settings />
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        flex: 1,
    },
});
