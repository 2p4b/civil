import { StyleSheet, View } from 'react-native';
import Register from '@/screens/Auth/Register';
import Signup from '@/screens/Auth/Signup';

export default function SignupScreen() {
    return (
        <View style={styles.container}>
            <Register/>
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




