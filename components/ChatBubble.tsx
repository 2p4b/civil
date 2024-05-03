import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useTheme } from "@/hooks"
import moment from 'moment';
import Text from "./Text";
import View from "./View";
import Icon from "./Icon";
import Document from './Document';

interface IChatBubble{
    styles: Object;
    message: Object;
    reply: boolean;
    author: boolean; 
    attachment: boolean;
    flip?: boolean;
}

function resourceIcon(resource){
    const type = resource.type;

    if(type.includes("image"))
        return "file-image";

    if(type.includes("pdf"))
        return "file-pdf";

    return "file-circle-question"
}
export default function ChatBubble(props) {

    const theme = useTheme();

    const descriptionStyle = {
        fontSize: 12,
        color: theme.palette.text.get(400),
    }

    const replyStyle = {
        backgroundColor: theme.palette.primary.get(600),
    }

    const rootStyle = {
        backgroundColor: theme.palette.primary.get(800),
    }

    const flipstyles = props.flip ? lstyles : rstyles;

    function handleDownload(){
    }

    return (
        <View style={[flipstyles.root]}>
            <View style={[flipstyles.triangle, rootStyle]}/>
            <View style={[flipstyles.main, rootStyle]}>
                {props.message.attachment && (
                    <View style={styles.attachment}>
                        <Icon size={75} name={resourceIcon(props.message.attachment.resource)}/>
                        <View style={styles.attachmentMain}>
                            <Text ellipsizeMode="tail" numberOfLines={2}>
                                {props.message.attachment.resource.name}
                            </Text>
                            <View style={styles.attachmentInfo}>
                                <Text style={styles.size}>
                                    {props.message.attachment.resource.humanSize}
                                </Text>
                                <Pressable style={styles.download} onPress={handleDownload}>
                                    <Icon size={30} name="cloud-download"/>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                )}
                {props.message.reply && (
                    <View style={[styles.reply, replyStyle]}>
                        <Document {...props.message.reply.content}/>
                    </View>
                )}
                <View style={[flipstyles.content]}>
                    <Document {...props.message.content}/>
                </View>
                <View style={flipstyles.timestamp}>
                    <Text style={flipstyles.timestamp}>{moment(props.message.timestamp).fromNow()}</Text>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    reply:{
        marginTop: 5,
        padding: 10,
        borderRadius: 8,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderLeftColor: 'white',
        borderTopColor: 'white',
    },
    attachment:{
        overflow: 'hidden',
        marginTop: 5,
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    attachmentMain:{
        width: 150,
        paddingLeft: 10,
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    attachmentInfo:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },
    download:{
        marginTop: 10,
        marginLeft: 10
    }

});

const rstyles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 9,
    },
    main: {
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        maxWidth: '80%',
        borderWidth: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    content: {
        paddingVertical: 8,
        backgroundColor: 'transparent',
    },
    timestamp: {
        backgroundColor: 'transparent',
        top: -2,
        position: 'relative',
        fontSize: 12,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    triangle: {
        marginTop: 9,
        width: 10,
        height: 10,
        zIndex: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        position: 'absolute',
        right: 0,
        top: 0,
    }
});

const lstyles = StyleSheet.create({
    root:{
        flexDirection: 'row',
        padding: 9,
    },
    main:{
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        maxWidth: '80%',
        borderWidth: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    content:{
        backgroundColor: 'transparent',
        paddingVertical: 8,
    },
    timestamp:{
        backgroundColor: 'transparent',
        top: -3,
        fontSize: 12,
    },
    triangle:{
        marginTop: 9,
        width: 10,
        height: 10,
        zIndex: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        position: 'absolute',
        left: 0,
        top: 0,
    }
});


