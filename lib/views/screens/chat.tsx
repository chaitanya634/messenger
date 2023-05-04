import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, ActivityIndicator, TouchableOpacity, FlatList, TextInput, Alert } from "react-native";
import { ScreenParams, StackParams } from "../../../App";
import CustomHeader from "../components/header";
import CustomButton from "../components/CustomButton";
import ComponentStyles from "../styles/MyStylesheet";
import firestore, { FirebaseFirestoreTypes, firebase } from '@react-native-firebase/firestore';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


function ChatScreen() {
    const navigation = useNavigation()
    const route = useRoute<RouteProp<ScreenParams, 'Chat'>>()

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
                        color: "#525252",
                        flex: 1,
                        height: 40
                    }}
                    placeholder="Please enter message"
                    placeholderTextColor="#A7A7A7"
                    onChangeText={(input) => {}}
                    defaultValue={""}
                />
                <CustomButton
                    text="Send"
                    onTap={() => {

                        /*
                        let msgOrderNum = messages.length + 1
                        
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
                                                    msgOrderNum: msgOrderNum
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
                                                                            msgOrderNum: msgOrderNum
                                                                        }).then((_) => {
                                                                            setMsg("")
                                                                            setIsSendBtnDisabled(false)
                                                                            setRefreshCount(refreshCount + 1)
                                                                        })

                                                                    })
                                                            } else {
                                                                dbUsers.doc(route.params.chatUserId)
                                                                    .collection('chats')
                                                                    .doc(recvChatDocId).
                                                                    collection('received messages').add({
                                                                        content: msg,
                                                                        msgOrderNum: msgOrderNum
                                                                    }).then((_) => {
                                                                        setMsg("")
                                                                        setIsSendBtnDisabled(false)
                                                                        setRefreshCount(refreshCount + 1)
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
                                                msgOrderNum: msgOrderNum
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
                                                                        msgOrderNum: msgOrderNum
                                                                    }).then((_) => {
                                                                        setMsg("")
                                                                        setIsSendBtnDisabled(false)
                                                                    })
                                                                })
                                                        } else {
                                                            dbUsers.doc(route.params.chatUserId)
                                                                .collection('chats')
                                                                .doc(recvChatDocId).
                                                                collection('received messages').add({
                                                                    content: msg,
                                                                    msgOrderNum: msgOrderNum
                                                                }).then((_) => {
                                                                    setMsg("")
                                                                    setIsSendBtnDisabled(false)
                                                                })
                                                        }
                                                    })
                                            })
                                    }
                                })
                        }
                        */

                    }}
                />
            </View>
        </SafeAreaView>
    );
}

export default ChatScreen