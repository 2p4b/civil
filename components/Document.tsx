import React from 'react';
import { StyleSheet } from 'react-native';
import Text from './Text';
import View from './View';
//import { useTheme } from "@/hooks"

interface IDocument{

}

export function createDocument(text){
    return {
        type: "root",
        children: [
            {
                type: "block",
                name: "paragraph",
                children: [ 
                    { 
                        type: "leaf", 
                        name: "text", 
                        value: text 
                    } 
                ]
            }
        ]
    }
}

export default function Document(props) {
    if(props.type === "root"){
        return (
            <View style={[styles.root, props.style]}>
                {props.children.map((child, index) => <Document key={String(index)} {...child}/>)}
            </View>
        );
    }
    if(props.type === "block"){
        return (
            <Text style={[styles.block, props.style]}>
                {props.children.map((child, index) => <Document key={String(index)} {...child}/>)}
            </Text>
        );
    }
    if(props.type === "leaf"){
        return <Text style={styles.leaf, props.style}>{props.value}</Text>;
    }
}


const styles = StyleSheet.create({
    root: {
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    block:{
        backgroundColor: 'transparent',
    },
    leaf:{
        backgroundColor: 'transparent',
    }
});





