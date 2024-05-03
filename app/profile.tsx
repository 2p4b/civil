import { StyleSheet } from 'react-native';
import { Text, View } from '@/components';
import Profile from '@/screens/Profile';

export default function MProfile() {
    return (
        <View style={styles.container}>
            <Profile/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

