import { StyleSheet } from 'react-native';
import Profile from '@/screens/Profile';
import { View } from '@/components';

export default function ProfileScreen() {
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
    }
});
