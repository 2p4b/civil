import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { useSession } from '@/store/hooks';
import { Text, TextInput, Button } from '@/components';
import { router } from 'expo-router';
import Layout from "./Layout";


export default function Registration() {
    const session = useSession();
    const [loading, setLoading] = React.useState(false);
    const [email, onEmailChange] = React.useState('');
    const [username, onUsernameChange] = React.useState('');
    const [password, onPasswordChange] = React.useState('');

    async function onSignup(){
        if(username.length > 3 && password.length > 5 && loading === false){
            try{
                session.signup({username, email, password});
                setLoading(true);
            }catch(e){
                // Report the error to the user.
                console.error('[Signup] onSignup',e);
            }

            setTimeout(() => {
                setLoading(_ => false);
                router.push('/home')
            }, 500);
        }
    }

    return (
        <View style={styles.form}>
            <View style={styles.field}>
                <TextInput
                    disabled={loading || session.auth.is_valid}
                    value={username}
                    onChangeText={onUsernameChange}
                    textContentType="username"
                    placeholder="Username"
                />
            </View>
            <View style={styles.field}>
                <TextInput
                    disabled={loading || session.auth.is_valid}
                    value={email}
                    onChangeText={onEmailChange}
                    textContentType="emailAddress"
                    placeholder="Email"
                />
            </View>
            <View style={styles.field}>
                <TextInput
                    value={password}
                    disabled={loading || session.auth.is_valid}
                    placeholder="Password"
                    textContentType="password"
                    secureTextEntry={true}
                    onChangeText={onPasswordChange}
                />
            </View>
            <View style={styles.field}>
                <Button 
                    disabled={loading || session.auth.is_valid}
                    style={styles.button} onPress={onSignup}>
                    Register
                </Button>
            </View>
            <View style={styles.field}>
                <Text style={styles.label}>Already have an account?
                    <Link
                        href="/login"
                        disabled={loading || session.auth.is_valid}
                        style={styles.link}>
                        <Text style={styles.link}>login</Text>
                    </Link>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        flexDirection: 'column',
        JustifyContent: 'flex-end',
    },
    field: {
        flexDirection: 'column',
        marginVertical: 10,
    },
    form:{
        marginVertical: 10,
    },
    action:{
        marginVertical: 20,
    },
    link: {
        marginHorizontal: 20,
    },
    footer: {
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    label:{
        paddingVertical: 10,
        paddingHorizontal: 6,
    }
});




