import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Text, View} from '@/components';
import Feed from '@/screens/Feed';

export default function FeedScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Civil",
                }}
            />
            <Feed/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

