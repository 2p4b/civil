import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import Layout from "./Layout";
import { useSession } from '@/store/hooks';
import { Text, Button } from '@/components';
import RegistrationForm from "./Forms/Registration";

export default function Register() {
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
            {session.auth.is_valid ? (
                <Button disabled={loading} onPress={doLogout}>
                    Sign Out
                </Button>
                ) : (
                <RegistrationForm/>
            )}
        </Layout>
    );
}


const styles = StyleSheet.create({
});



