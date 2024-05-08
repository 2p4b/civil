import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Stack } from 'expo-router';
import { Text, View} from '@/components';
import { useStoreList } from '@/store/hooks';
import z from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export default function FeedScreen() {
    const loading = useStoreList("loading");

    function toggle(){
        if(loading.data.includes("user.schools")){
            loading.remove("user.schools");
        } else {
            loading.add("user.schools");
        }
    }
    
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Campus",
                }}
            />
            <Button title={loading.data.includes("user.schools") ? "drop" : "load" } onPress={toggle}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

