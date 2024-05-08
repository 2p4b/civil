import React from 'react';
import Layout from "../Layout";
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { useForm } from '@/hooks';
import { useSession } from '@/store/hooks';
import { Text, TextInput, Button } from '@/components';
import { router } from 'expo-router';
import z from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const loginDefaults = {
    email: process.env.EXPO_PUBLIC_DEV_LOGIN_EMAIL || "",
    password: process.env.EXPO_PUBLIC_DEV_LOGIN_PASSWORD || ""
}

export default function PasswordLogin() {
    const [form, {errors}] = useForm(schema, loginDefaults);
    const session = useSession();
    const [loading, setLoading] = React.useState(false);

    async function onLogin(){
        const username = form.email.value; 
        const password = form.password.value;
        if(Object.values(errors).length === 0 && loading === false){
            try{
                setLoading(true);
                await session.loginWithPassword({username, password});
            }catch(e){
                // Report the error to the user.
                console.error('[PasswordLogin] onLogin', e);

            }
            setLoading(_ => false);
        }
    }

    return (
        <View style={styles.form}>
            <View style={styles.field}>
                <TextInput
                    disabled={loading || session.auth.is_valid}
                    value={form.email.value}
                    onChangeText={form.email.setValue}
                    placeholder="Username or Email"
                    textContentType="username"
                />
            </View>
            <View style={styles.field}>
                <TextInput
                    value={form.password.value}
                    disabled={loading || session.auth.is_valid}
                    placeholder="Password"
                    textContentType="password"
                    secureTextEntry={true}
                    onChangeText={form.password.setValue}
                />
            </View>
            <View style={[styles.field, styles.action]}>
                <Button 
                    disabled={loading || session.auth.is_valid || Object.values(errors).length > 0}
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



