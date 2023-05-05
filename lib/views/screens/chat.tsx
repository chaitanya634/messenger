import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, ActivityIndicator, TouchableOpacity, FlatList, TextInput, Alert } from "react-native";
import { ScreenParams, StackParams } from "../../../App";
import CustomHeader from "../components/header";
import CustomButton from "../components/CustomButton";
import ComponentStyles from "../styles/MyStylesheet";
import firestore, { FirebaseFirestoreTypes, firebase } from '@react-native-firebase/firestore';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type MsgItemType = {
    id: string,
    content: string,
    createdAt: FirebaseFirestoreTypes.Timestamp,
    senderFirstName: string,
    senderId: string
}

function ChatScreen() {
    const navigation = useNavigation()
    const route = useRoute<RouteProp<ScreenParams, 'Chat'>>()

    const [message, setMessage] = useState("")
    const [isSendBtnDisabled, setIsSendBtnDisabled] = useState(false)

    const [isLoading, setIsLoading] = useState(true)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        firebase.firestore()
            .collection('chatRooms').doc('4NZ6wXQJCZex3FgJcU69')
            .collection('messages').orderBy('createdAt','desc')
            .onSnapshot(querySnapshot => {
                const messages: any = [];
                querySnapshot.docs.forEach((doc) => {
                    const data = doc.data()
                    messages.push({
                        id: doc.id,
                        content: data.content,
                        createdAt: data.createdAt,
                        senderFirstName: data.senderFirstName,
                        senderId: data.senderId
                    })
                })
                setMessages(messages);
                setIsLoading(false);
            });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, margin: 12 }}>
            <CustomHeader
                title={route.params.chatFirstName+" "+route.params.chatLastName}
                subtitle={route.params.chatUserName}
                action={{
                    text: "Back",
                    onPress: () => navigation.goBack()
                }}
            />
            <View style={{
                    flex: 1,
                    marginVertical: 12,
                    justifyContent: "center"
                }}>
                    {
                        isLoading ?  
                        <ActivityIndicator /> : 
                        <FlatList
                            inverted={true}
                            data={messages}
                            keyExtractor={(item: MsgItemType) => item.id}
                            renderItem={({ item }) => {
                                if(item.senderId == route.params.myId)
                                    return (
                                        <View style={{
                                            alignSelf:"flex-end",
                                            backgroundColor: "#67D4FF",
                                            margin: 4,
                                            paddingHorizontal: 8,
                                            paddingVertical: 6,
                                            borderTopLeftRadius: 8,
                                            borderBottomLeftRadius: 8,
                                            borderBottomRightRadius: 8
                                        }}>
                                        <Text style={{fontSize: 16}}>
                                            {item.content}
                                        </Text>
                                        </View>
                                    )
                                return (
                                    <View style={{
                                        alignSelf:"flex-start",
                                        backgroundColor: "#55D4AE",
                                        margin: 4,
                                        paddingHorizontal: 8,
                                        paddingVertical: 6,
                                        borderTopRightRadius: 8,
                                        borderBottomLeftRadius: 8,
                                        borderBottomRightRadius: 8
                                    }}>
                                    <Text style={{fontSize: 16}} >
                                        {item.content}
                                    </Text>
                                    </View>
                                )
                            }}
                        />
                    }
               
            </View>

            {/* footer */}
            <View style={{ flexDirection: "row", alignItems: "center" }} >
                <TextInput
                    style={{
                        marginRight: 12,
                        fontSize: 18,
                        borderWidth: 2,
                        borderRadius: 12,
                        paddingHorizontal: 13,
                        borderColor: "#525252",
                        color: "#525252",
                        flex: 1,
                        height: 40
                    }}
                    placeholder="Please enter message"
                    placeholderTextColor="#A7A7A7"
                    onChangeText={(input) => {setMessage(input)}}
                    defaultValue={message}
                />
                <CustomButton
                    text="Send"
                    onTap={() => {
                        if(message.length == 0) {
                            Alert.alert("Cannot Send","Please enter message")
                        } else {
                            
                            //check if chat room exists
                            // firebase.firestore().collection('users').doc(route.params.myId).collection('myChatRooms').
                            /*
                            setIsSendBtnDisabled(true)
                            firebase.firestore().collection("chatRooms").doc("4NZ6wXQJCZex3FgJcU69")
                            .collection('messages').add({
                                content: message,
                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                senderFirstName: route.params.myFirstName,
                                senderId: route.params.myId
                            }).then((v)=>{
                                setIsSendBtnDisabled(false)
                                setMessage("")
                            })
                            */
                        }
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

export default ChatScreen