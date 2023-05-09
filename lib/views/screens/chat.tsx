import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, ActivityIndicator, TouchableOpacity, FlatList, TextInput, Alert, KeyboardAvoidingView, KeyboardAvoidingViewComponent, ScrollView, Platform } from "react-native";
import { ScreenParams, StackParams } from "../../../App";
import CustomHeader from "../components/header";
import CustomButton from "../components/CustomButton";
import ComponentStyles from "../styles/MyStylesheet";
import firestore, { FirebaseFirestoreTypes, firebase } from '@react-native-firebase/firestore';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ChatFooter from "../components/ChatFooter";
import { GiftedChat } from "react-native-gifted-chat";

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

    const [roomId, setRoomId] = useState(route.params.chatRoomId)

    const [isBottomLoading, setIsBottomLoading] = useState(true)
    const [isChatBlocked, setIsChatBlocked] = useState(false)
    const [showChatAck, setShowChatAck] = useState(false)
    const [showUnblockBtn, setShowUnblockBtn] = useState(false)

    useEffect(() => {
        firebase.firestore()
            .collection('chatRooms').doc(roomId ?? "")
            .collection('messages').orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages: any = []
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
                if (roomId != null) {
                    firebase.firestore().collection('chatRooms')
                        .doc(roomId).onSnapshot(snapshot => {
                            let roomData = snapshot.data()
                            //receiver acc & not accepted & not blocked
                            //show chat ack
                            if (roomData?.createdBy != route.params.myId
                                && !roomData?.isAccepted
                                && !roomData?.isBlocked
                            ) {
                                setIsBottomLoading(false)
                                setShowChatAck(true)
                            }
                            //receiver acc & accepted
                            else if (roomData?.createdBy != route.params.myId
                                && roomData?.isAccepted) {
                                setIsBottomLoading(false)
                            }
                            //receiver acc & blocked
                            else if (roomData?.createdBy != route.params.myId
                                && roomData?.isBlocked) {
                                setIsBottomLoading(false)
                                setShowUnblockBtn(true)
                            }
                            //sender acc & blocked
                            else if (roomData?.createdBy == route.params.myId && roomData?.isBlocked) {
                                setIsBottomLoading(false)
                                setIsChatBlocked(true)
                            }
                            //====
                            //sender acc & unblocked
                            else if (roomData?.createdBy == route.params.myId && roomData?.isBlocked == false && roomData?.isAccepted == true) {
                                setIsBottomLoading(false)
                                setIsChatBlocked(false)
                            }
                            //====
                            else {
                                //sender account
                                //
                                setIsBottomLoading(false)
                            }
                        })
                } else {
                    setIsBottomLoading(false)
                }
                setIsLoading(false);
                setMessages(messages);
            })
    }, [roomId])

    return (
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <SafeAreaView style={{ flex: 1, margin: 12 }}>
            <CustomHeader
                title={route.params.chatFirstName + " " + route.params.chatLastName}
                subtitle={route.params.chatUserName}
                action={{
                    text: "Back",
                    onPress: () => navigation.goBack()
                }}
                profile={{
                        showMyProfile: false,
                        chatRoomId: route.params.chatRoomId,
                        myId: route.params.myId,
                        myFirstName: route.params.myFirstName,
                        myLastName: route.params.myLastName,
                        myUserName: route.params.myUserName,
                        chatId: route.params.chatId,
                        chatFirstName: route.params.chatFirstName,
                        chatLastName: route.params.chatLastName,
                        chatUserName: route.params.chatUserName,
                        isNewChat: route.params.isNewChat,
                }}
            />
            {/* body */}
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
                                if (item.senderId == route.params.myId)
                                    return (
                                        <View style={{
                                            alignSelf: "flex-end",
                                            backgroundColor: "#67D4FF",
                                            margin: 4,
                                            paddingHorizontal: 8,
                                            paddingVertical: 6,
                                            borderTopLeftRadius: 8,
                                            borderBottomLeftRadius: 8,
                                            borderBottomRightRadius: 8
                                        }}>
                                            <Text style={{ fontSize: 16, color: "#000000" }}>
                                                {item.content}
                                            </Text>
                                        </View>
                                    )
                                return (
                                    <View style={{
                                        alignSelf: "flex-start",
                                        backgroundColor: "#55D4AE",
                                        margin: 4,
                                        paddingHorizontal: 8,
                                        paddingVertical: 6,
                                        borderTopRightRadius: 8,
                                        borderBottomLeftRadius: 8,
                                        borderBottomRightRadius: 8
                                    }}>
                                        <Text style={{ fontSize: 16, color: '#000000' }} >
                                            {item.content}
                                        </Text>
                                    </View>
                                )
                            }}
                        />
                }
            </View>
            {/* footer */}
            <ChatFooter
                isLoading={isBottomLoading}
                isBlocked={isChatBlocked}
                blockedMsg={`${route.params.chatFirstName} ${route.params.chatLastName} (${route.params.chatUserName}) has blocked this chat`}
                showUnblockBtn={showUnblockBtn}
                onUnblockBtnPressed={() => {
                    firebase.firestore().collection('chatRooms')
                        .doc(route.params?.chatRoomId ?? "").set({
                            createdBy: route.params.chatId,
                            isAccepted: true,
                            isBlocked: false
                        }).then((_) => {
                            setIsChatBlocked(false)
                            setShowChatAck(false)
                            setShowUnblockBtn(false)
                        })
                }}
                footer={{
                    defaultMsg: message,
                    onMsgTyped(msg) { setMessage(msg) },
                    onSendBtnPressed(event) {
                        if (message.length == 0) {
                            Alert.alert("Cannot Send", "Please enter message")
                        } else {
                            setIsSendBtnDisabled(true)
                            if (roomId == null) {
                                //create new room
                                console.log('create new room')
                                firebase.firestore().collection('chatRooms').add({
                                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                    createdBy: route.params.myId,
                                    isAccepted: false,
                                    isBlocked: false
                                }).then((res) => {
                                    //add room details to my account
                                    firebase.firestore().collection('users').doc(route.params.myId)
                                        .collection('myChatRooms').add({
                                            chatRoomId: res.id,
                                            myId: route.params.myId,
                                            myFirstName: route.params.myFirstName,
                                            myLastName: route.params.myLastName,
                                            myUserName: route.params.myUserName,
                                            chatId: route.params.chatId,
                                            chatFirstName: route.params.chatFirstName,
                                            chatLastName: route.params.chatLastName,
                                            chatUserName: route.params.chatUserName
                                        }).then((_) => {
                                            //add room details to chat account
                                            firebase.firestore().collection('users').doc(route.params.chatId)
                                                .collection('myChatRooms').add({
                                                    chatRoomId: res.id,
                                                    myId: route.params.chatId,
                                                    myFirstName: route.params.chatFirstName,
                                                    myLastName: route.params.chatLastName,
                                                    myUserName: route.params.chatUserName,
                                                    chatId: route.params.myId,
                                                    chatFirstName: route.params.myFirstName,
                                                    chatLastName: route.params.myLastName,
                                                    chatUserName: route.params.myUserName
                                                })
                                        }).then((_) => {
                                            //add message
                                            res.collection('messages').add({
                                                content: message,
                                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                                senderFirstName: route.params.myFirstName,
                                                senderId: route.params.myId
                                            }).then((_) => {
                                                setIsSendBtnDisabled(false)
                                                setMessage("")
                                                setRoomId(res.id)
                                            })
                                        })
                                })
                            } else {

                                firebase.firestore().collection("chatRooms").doc(roomId)
                                    .collection('messages').add({
                                        content: message,
                                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                        senderFirstName: route.params.myFirstName,
                                        senderId: route.params.myId
                                    }).then((v) => {
                                        setIsSendBtnDisabled(false)
                                        setMessage("")
                                    })
                            }
                        }
                    },
                }}
                chatDialog={{
                    showDialog: showChatAck,
                    dialogMsg: `Accept message request from ${route.params.chatFirstName} ${route.params.chatLastName} (${route.params.chatUserName}) ?`,
                    onBlockBtnPressed(event) {
                        firebase.firestore().collection('chatRooms')
                            .doc(route.params?.chatRoomId ?? "").set({
                                isBlocked: true,
                                isAccepted: false,
                                createdBy: route.params.chatId,
                            }).then((_) => {
                                setShowChatAck(false)
                                setShowUnblockBtn(true)
                            })
                    },
                    onDeleteBtnPressed(event) {
                        setIsBottomLoading(true)
                        const db = firebase.firestore()
                        //del room
                        db.collection('chatRooms').doc(roomId ?? '').delete().then((_)=>{
                            //del from my acc
                            db.collection('users').doc(route.params.myId)
                            .collection('myChatRooms').where('chatRoomId','==',roomId ?? '').get().then((val)=>{
                                db.collection('users').doc(route.params.myId).collection('myChatRooms').doc(val.docs[0].id).delete().then((_)=>{
                                    //del from recv acc
                                    db.collection('users').doc(route.params.chatId)
                                    .collection('myChatRooms').where('chatRoomId','==',roomId ?? '').get().then((val)=>{
                                        db.collection('users').doc(route.params.chatId).collection('myChatRooms').doc(val.docs[0].id).delete().then((_)=>{
                                            setIsBottomLoading(false) 
                                            navigation.goBack()
                                        })
                                    })
                                })
                            })
                        })
                    },
                    onAcceptBtnPressed(event) {
                        firebase.firestore().collection('chatRooms')
                            .doc(route.params?.chatRoomId ?? "").set({
                                isBlocked: false,
                                isAccepted: true,
                                createdBy: route.params.chatId,
                            }).then((_) => {
                                setShowChatAck(false)
                            })
                    },
                }}
            />            
        </SafeAreaView> 
        </KeyboardAvoidingView> 
    );

}

export default ChatScreen

