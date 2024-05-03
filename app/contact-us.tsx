import { StyleSheet } from 'react-native';
import { Text, View } from '@/components';
import Chat from '@/screens/Chat';

export default function Thread() {
    return (
        <View style={styles.container}>
            <Chat/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


