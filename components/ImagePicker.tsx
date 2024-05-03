import React, {useMemo} from 'react';
import { StyleSheet, Pressable } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Picker from 'expo-image-picker';
import { Resource } from '@/utils';
import Button from './Button';

interface IDocumentPicker extends Pressable{
    disabled?: boolean;
    mediaTypes?: Picker.MediaTypeOptions;
    allowsEditing?: boolean;
    aspect?: number[];
    quality?: number;
    elevation?: number;
    style?: React.CSSProperties;
    onPick: (resources: Resource[]) => void;
}


export default function ImagePicker({disabled=false, onPick, ...props}: IDocumentPicker) {

    async function handlePress(){
        const {
              mediaTypes = Picker.MediaTypeOptions.All,
              allowsEditing = true,
              aspect = [4, 3],
              quality =  1
        } = props

        const options = {
              mediaTypes,
              allowsEditing,
              aspect,
              quality
        }
        try { 
            const result = await Picker.launchImageLibraryAsync(options);
            const resources = await Promise.all(result.assets.map(async (asset) => {
                const {size} = await FileSystem.getInfoAsync(asset.uri, {size: true})
                asset.size = size
                return new Resource(asset);
            }));
            onPick(resources);
        } catch (error) {
            console.log("[ImagePicker]", error)
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


