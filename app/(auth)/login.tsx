import { StyleSheet, View } from 'react-native';
import Login from '@/screens/Auth/Login';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Login/>
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



