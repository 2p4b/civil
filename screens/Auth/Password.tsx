import React from 'react';
import Layout from "./Layout";
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { useSession } from '@/store/hooks';
import { Text, TextInput, Button } from '@/components';
import { router } from 'expo-router';


export default function Password() {
    const animation = React.useRef(null);
    const session = useSession();
    const [loading, setLoading] = React.useState(false);
    const [username, onUsernameChange] = React.useState('');
    const [password, onPasswordChange] = React.useState('');

    async function onLogin(){
        if(username.length > 3 && password.length > 5 && loading === false){
            try{
                setLoading(true);
                await session.loginWithPassword({username, password});
            }catch(e){
                // Report the error to the user.
                console.error('[Password] onLogin',e);

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
                    placeholder="Username or Email"
                />
            </View>
            <View style={styles.field}>
                <TextInput
                    value={password}
                    disabled={loading || session.auth.is_valid}
                    placeholder="Password"
                    onChangeText={onPasswordChange}
                />
            </View>
            <View style={[styles.field, styles.action]}>
                <Button 
                    disabled={loading || session.auth.is_valid}
                    style={styles.button} onPress={onLogin}>
                    Sign In
                </Button>
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
    link: {},
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


