import React from 'react';
import Layout from "./Layout";
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '@/components';

//import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function OAuth() {
    return (
        <View style={styles.root}>
            <Button style={styles.button}>
                Google
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
    },
    button:{
    }
});



