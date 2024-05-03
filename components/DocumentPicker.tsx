import React, {useMemo} from 'react';
import { StyleSheet, Pressable } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Picker from 'expo-document-picker';
import Button from './Button';
import { Resource } from '@/utils';

interface IDocumentPicker extends Pressable{
    disabled?: boolean;
    elevation?: number;
    onPick: (resources: Resource[]) => void;
}

export default function DocumentPicker({disabled=false, onPick, ...props}: IDocumentPicker) {

    async function handlePress(){
        try {
            const { type = '*/*', multiple = false, copyToCacheDirectory = true} = props;
            const options = {
                type, multiple, copyToCacheDirectory
            }
            const result = await Picker.getDocumentAsync(options);
            const resources = result.assets.map(asset => new Resource(asset));
            onPick(resources);
        } catch (error) {
            console.log("[DocumentPicker]", error)
        }
    }

    return (
        <Button {...props} disabled={disabled} onPress={onPick ? handlePress : undefined}>
            {props.children}
        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
    },
});

