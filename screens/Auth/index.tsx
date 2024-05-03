import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import OAuth from "./OAuth";
import Layout from "./Layout";
import Password from "./Password";
import LottieView from 'lottie-react-native';
import { useSession } from '@/store/hooks';
import { Text, Button } from '@/components';

const loginAnimation = require('@/assets/lottie/loggin_animation.json');

export default function Auth() {
    const session = useSession();
    const [loading, setLoading] = React.useState(false);

    async function doLogout(){
        if(session.auth.is_valid && loading === false){
            try{
                setLoading(true);
                await session.logout();
            }catch(e){
                // Report the error to the user.
                console.error('[Auth index.tsx] onLogout', e);

            }
            setLoading(false);
        }
    }

    return (
        <Layout>
            <View style={styles.presentation}>
                <LottieView style={{width: "100%", height: 300}} source={loginAnimation} autoPlay loop />
            </View>
            <View style={styles.logins}>
                {session.auth.is_valid ? (
                    <Button 
                        disabled={loading}
                        style={styles.button} onPress={doLogout}>
                        Sign Out
                    </Button>
                    ) : (
                    <View style={styles.auth}>
                        <Password/>
                        <OAuth/>
                    </View>
                )}
            </View>
            <View style={styles.footer}>
                {!session.auth.is_valid && (
                    <Text style={styles.footer}>
                        Don't already have an account? 
                        <Link style={styles.link} href="/profile">Signup</Link>
                    </Text>
                )}
            </View>
        </Layout>
    );
}


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        flexDirection: 'column',
        JustifyContent: 'flex-end',
    },
    presentation: {
        flex: 1,
        flexDirection: 'column',
    },
    logins:{
    },
    auth:{
    },
    link: {
        marginHorizontal: 10,
    },
    footer: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
});


