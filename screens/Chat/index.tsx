import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { faker } from '@faker-js/faker';
import { useTheme } from "@/hooks"
import * as utils from "@/utils"
import moment from 'moment';
import { Text, View, ListView, Icon, Triangle, TextInput, Button, ChatBubble, Document, DocumentPicker, ImagePicker } from '@/components';

interface IScreen{

}

function createDocument(text){
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

function createAttachment(resource){
    return {
        id: faker.string.numeric(5),
        type: "file",
        resource: resource,
    }
}

function makeArray(lenth, fn = (i) => i){
    return Array.from({length: lenth}, (_, i) => fn(i));
}

function makeAuthor(i){
    return {
        id: faker.string.numeric(5),
        avatar: faker.image.url(),    
        username: faker.internet.userName(),
        names : faker.person.firstName(),
        bio: faker.person.bio(),
        fields: []
    }
}

function makeReaction(i){
    return {
        id: faker.string.numeric(5),
        emoji: faker.internet.emoji(),
        users: makeArray(5, (i) => makeAuthor(i)) 
    }
}

function makeReply(i){
    const content = createDocument(faker.lorem.paragraph());
    return {
        id: String(i),
        author: makeAuthor(i),
        thread_id: String(i),
        content: content,
    }
}

function makeMessage(i, content, reply){
    reply = reply ? makeReply(i) : null;
    content = content ? content : createDocument(faker.lorem.paragraph());
    return {
        id: String(i),
        reply: reply,
        attachments: [],
        reactions: makeArray(2, (i) => makeReaction(i)),
        author: makeAuthor(i),
        thread_id: String(i),
        content: content,
        timestamp: faker.date.recent(),
    }
}


const messages = makeArray(1, (i) => makeMessage(i, null, true));

function resourceIcon(resource){
    const type = resource.type;

    if(type.includes("image"))
        return "file-image";

    if(type.includes("pdf"))
        return "file-pdf";

    return "file-circle-question"
}

function Form(props){

    const [attachments, setAttachments] = React.useState([]);
    const [text, setText] = React.useState('');

    function handlePress(){
        if(props.onSubmit && (text.length > 0 || attachments.length > 0 )){
            const content = createDocument(text);
            const [attachment, ...rest ] = attachments;
            props.onSubmit({content, attachment});
            setText('');
            setAttachments(rest);
        }
    }

    async function handlePick(resources){
        setAttachments(resources);
    }

    function handleRemove(index){
        return () => {
            setAttachments(attachments => attachments.filter((_, i) => i !== index));
        }
    }

    function renderAttachment(data){
        const index = data.index;
        const resource = data.item;
        if(!resource) return null
        const size = 75;
        return (
            <View key={String(index)} style={{flexDirection:"column", height: size, width: size}}>
                <Icon size={size} name={utils.icon(resource)}/>
                <Text ellipsizeMode="tail" numberOfLines={2} style={{padding: 5}}>
                    {resource.name}
                </Text>

                <Pressable style={styles.closeIcon} onPress={handleRemove(index)}>
                    <Icon size={20} name="close"/>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.form}>
            {attachments.length > 0 && (
                <View style={styles.attachments}>
                    <ListView style={{flex: 1}} horizontal={true} data={attachments} renderItem={renderAttachment}/>
                </View>
            )}
            <View style={styles.fmain}>
                <DocumentPicker onPick={handlePick} style={{root: styles.upload}}>
                    <Icon name="cloud-upload" size={15}/>
                </DocumentPicker>
                <ImagePicker style={{root: styles.camera}} onPick={handlePick} >
                    <Icon name="camera" size={15}/>
                </ImagePicker>
                <TextInput 
                    style={styles.input} 
                    value={text}
                    editable={true} 
                    maxLength={200} 
                    multiline={true} 
                    onChangeText={setText}
                    placeholder="Type a message" 
                    numberOfLines={1}/>
                <Button style={{root: styles.submit}} onPress={handlePress} >
                    <Icon name="send" size={15}/>
                </Button>
            </View>
        </View>
    );
}



export default function Chat(props: IScreen) {
    const [list, setList] = React.useState(null);
    const [ready, setReady] = React.useState(false);
    const [history, setHistory] = React.useState(messages);
    const [more, setMoreData] = React.useState([]);
    const [form, setForm] =  React.useState({});

    function renderItem(data, layout) {
        if(data.index == 0){
            // First message
            return <ChatBubble message={data.item} flip={data.index%2 === 0}/>
        }
        if(data.index == history.length - 1){
            // Last message
            return (
                <View style={styles.last}>
                    <ChatBubble message={data.item} flip={data.index%2 === 0}/>
                </View>
            );
        }
        return <ChatBubble message={data.item} flip={data.index%2 === 0}/>
    }

    function handleSubmit(form){
        message = makeMessage(history.length, form.content)
        if(form.attachment){
            message.attachment = createAttachment(form.attachment);
        }
        message.timestamp = moment().format();
        setHistory(more => [...more, message]);
    }

    React.useEffect(() => {
        if(list){
            const timeout = setTimeout(() => {
                list.scrollToEnd({animated: false});
                setReady(true);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [list]);

    React.useEffect(() => {
        if(ready && history.length > 0){
            const timeout = setTimeout(() => {
                list.scrollToEnd({animated: false});
                setReady(true);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [ready, history]);

    return (
        <View style={styles.root}>
            <View style={[styles.chat, ready === false ? {opacity: 0} : null]}>
                <ListView style={styles.history} data={history} renderItem={renderItem} ref={setList}/>
            </View>
            <Form form={form} onSubmit={handleSubmit} style={styles.form}/>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        paddingBottom: 15,
    },
    main:{
        flex: 1
    },
    input:{
        flex: 1
    },
    chat: {
        flex: 1,
    },
    history: {
        flex: 1,
    },
    last:{
        marginBottom: 60
    },
    form: {
        flexDirection: 'column',
    },
    attachments: {
        padding: 15,
        //backgroundColor: 'white',
        height: 150,
        borderRadius: 8,
        flexDirection: 'row',
    },
    input:{
        flex: 1,
        borderRadius: 20,
        paddingVertical: 6,
        marginHorizontal: 5,
    },
    upload:{
        marginHorizontal: 5,
        borderRadius: 100,
        paddingHorizontal: 12,
    },
    camera:{
        marginHorizontal: 5,
        borderRadius: 100,
        paddingHorizontal: 12,
    },
    submit: {
        marginHorizontal: 5,
        borderRadius: 100,
        paddingHorizontal: 12,
    },
    fmain: {
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    closeIcon:{
        position: 'absolute',
        backgroundColor: 'black',
        top: -1,
        right: 0,
        borderRadius: 100,
    }
});

