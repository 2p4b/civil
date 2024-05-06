import { StyleSheet, View } from 'react-native';
import Login from '@/screens/Auth/Login';
import env from "@/env";

export default function LoginScreen() {
    //console.log(process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY);
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



