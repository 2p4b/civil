import { StyleSheet, View } from 'react-native';
import Auth from '@/screens/Auth';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Auth
                providers={['google', 'username']}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 20,
    },
});


