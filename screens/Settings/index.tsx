import React, {useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Text, View, ScrollView } from '@/components';
import Section from "./Section";
import Switch from "./Switch";
import Chevron from "./Chevron";
import { useTheme } from "@/hooks"

interface ISettings{
}

const description = "Hello world i describe the function of the switch";

export default function Settings(props: IScreen) {

    const theme = useTheme();

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.main}>
                <Section style={sectionStyles} label="Home">
                    <Switch name="switch" description={description}/>
                    <Chevron name="chevron" description={description} direction="right"/>
                </Section>
                <Section style={sectionStyles} label="Recovery">
                    <Switch name="switch"/>
                    <Chevron name="chevron" direction="right"/>
                </Section>
            </ScrollView>
        </SafeAreaView>
    );
}

const sectionStyles = StyleSheet.create({
    root: {
    },
    label:{
    },
    main:{
    }
});

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        paddingTop: 10,
        flexDirection: 'column',
    },
    main:{
        flex: 1,
        padding: 10
    },
    section:{
        marginBottom: 10
    },
    item: {
    }

});


