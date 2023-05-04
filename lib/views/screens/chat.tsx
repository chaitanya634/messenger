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

    const [message, setMessage] = useState("")
    const [isSendBtnDisabled, setIsSendBtnDisabled] = useState(false)

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
                    onChangeText={(input) => {setMessage(input)}}
                    defaultValue={message}
                />
                <CustomButton
                    text="Send"
                    onTap={() => {
                        if(message.length == 0) {
                            Alert.alert("Cannot Send","Please enter message")
                        } else {
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
                        }
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

export default ChatScreen