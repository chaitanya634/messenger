import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, ActivityIndicator, TouchableOpacity, FlatList, TextInput, Alert } from "react-native";
import { ScreenParams } from "../../App";
import { sendMsg } from "../firestore_functions";
import CustomHeader from "../components/header";
import CustomButton from "../components/CustomButton";
import ComponentStyles from "../styles";
import firestore, { FirebaseFirestoreTypes, firebase } from '@react-native-firebase/firestore';

export function ChatScreen() {
    const navigation = useNavigation()
    const route = useRoute<RouteProp<ScreenParams, 'Chat'>>()

    const [msg, setMsg] = useState("")
    const [isSendBtnDisabled, setIsSendBtnDisabled] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, margin: 12 }}>
            <CustomHeader
                title={route.params.chatUserName}
                subtitle={route.params.chatUserEmail}
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
                <ActivityIndicator />
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
                        flex: 1
                    }}
                    placeholder="Please enter message"
                    onChangeText={(input) => setMsg(input)}
                    defaultValue={msg}
                />
                <CustomButton
                    text="Send"
                    isDisabled={isSendBtnDisabled}
                    onTap={() => {
                        if (msg.trim() == "") {
                            Alert.alert(
                                "Message not sent",
                                "Please enter the message",
                                undefined,
                                { cancelable: true }
                            )
                        }
                        else {
                            setIsSendBtnDisabled(true)

                            // add/update chat in sent msgs
                            const dbUsers = firestore().collection('users')
                            let chatDocId = ""
                            dbUsers.doc(route.params.userId)
                                .collection('chats').get()
                                .then((chatDocs) => {
                                    for (const doc of chatDocs.docs) {
                                        if (doc.data().chatUserEmail == route.params.chatUserEmail) {
                                            chatDocId = doc.id
                                            break
                                        }
                                    }
                                    if (chatDocId == "") {
                                        //chat didnt exist, so add new
                                        dbUsers.doc(route.params.userId)
                                            .collection('chats').add({
                                                chatUserEmail: route.params.chatUserEmail,
                                                chatUserName: route.params.chatUserName,
                                                chatUserId: route.params.chatUserId
                                            }).then((res) => {
                                                res.collection('sent messages').add({
                                                    content: msg,
                                                    dataTime: firebase.firestore.FieldValue.serverTimestamp()
                                                }).then((r) => {

                                                    //received msgs
                                                    let recvChatDocId = ""
                                                    dbUsers.doc(route.params.chatUserId)
                                                        .collection('chats').get()
                                                        .then((snapshot) => {
                                                            for (const doc of snapshot.docs) {
                                                                if (doc.data().chatUserEmail == route.params.userEmail) {
                                                                    recvChatDocId = doc.id
                                                                    break
                                                                }
                                                            }
                                                            if (recvChatDocId == "") {
                                                                dbUsers.doc(route.params.chatUserId)
                                                                    .collection('chats').add({
                                                                        chatUserId: route.params.userId,
                                                                        chatUserName: route.params.userName,
                                                                        chatUserEmail: route.params.userEmail
                                                                    }).then((ss1) => {
                                                                        ss1.collection('received messages').add({
                                                                            content: msg,
                                                                            dataTime: firebase.firestore.FieldValue.serverTimestamp()
                                                                        }).then((_)=>{
                                                                            setIsSendBtnDisabled(false)
                                                                        })
                                                                        
                                                                    })
                                                            } else {
                                                                dbUsers.doc(route.params.chatUserId)
                                                                    .collection('chats')
                                                                    .doc(recvChatDocId).
                                                                    collection('received messages').add({
                                                                        content: msg,
                                                                        dataTime: firebase.firestore.FieldValue.serverTimestamp()
                                                                    }).then((_)=>{
                                                                        setIsSendBtnDisabled(false)
                                                                    })
                                                            }
                                                        })
                                                })
                                            })
                                    } else {
                                    //chat exist so update it
                                        dbUsers.doc(route.params.userId)
                                            .collection('chats').doc(chatDocId).collection('sent messages').add({
                                                content: msg,
                                                dataTime: firebase.firestore.FieldValue.serverTimestamp()
                                            }).then((res) => {
                                                console.log("Updated chat and added new msg");

                                                //add to received msgs
                                                let recvChatDocId = ""
                                                dbUsers.doc(route.params.chatUserId)
                                                    .collection('chats').get()
                                                    .then((snapshot) => {
                                                        for (const doc of snapshot.docs) {
                                                            if (doc.data().chatUserEmail == route.params.userEmail) {
                                                                recvChatDocId = doc.id
                                                                break
                                                            }
                                                        }
                                                        if (recvChatDocId == "") {
                                                            dbUsers.doc(route.params.chatUserId)
                                                                .collection('chats').add({
                                                                    chatUserId: route.params.userId,
                                                                    chatUserName: route.params.userName,
                                                                    chatUserEmail: route.params.userEmail
                                                                }).then((ss1) => {
                                                                    ss1.collection('received messages').add({
                                                                        content: msg,
                                                                        dataTime: firebase.firestore.FieldValue.serverTimestamp()
                                                                    }).then((_)=>{
                                                                        setIsSendBtnDisabled(false)
                                                                    })
                                                                })
                                                        } else {
                                                            dbUsers.doc(route.params.chatUserId)
                                                                .collection('chats')
                                                                .doc(recvChatDocId).
                                                                collection('received messages').add({
                                                                    content: msg,
                                                                    dataTime: firebase.firestore.FieldValue.serverTimestamp()
                                                                }).then((_)=>{
                                                                    setIsSendBtnDisabled(false)
                                                                })
                                                        }
                                                    })
                                            })
                                    }
                                })
                        }
                    }}
                />
            </View>
        </SafeAreaView>
    );
}