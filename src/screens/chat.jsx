import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, ActivityIndicator, TouchableOpacity, FlatList, TextInput } from "react-native";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { addMsgInSentMsgs, sendMsg } from "../firestore_functions";

let msgCount = 0;


function Messages(props) {

    const [sentMsgs, setSentMsgs] = useState([]);
    const [receivedMsgs, setReceivedMsgs] = useState([]);

    useEffect(()=>{
        //sent msgs
         firestore().collection('users').doc(props.userId.toString()).collection('chats').doc(props.chatUserId.toString()).collection('sent_messages').onSnapshot((snapshot)=>{
            setSentMsgs([])
            const sentMsgs = [];
            snapshot.docs.forEach((doc)=>{
                sentMsgs.push(doc.data())            
            })
            setSentMsgs(sentMsgs);
        }
        );

        //received msgs
        firestore().collection('users').doc(props.userId.toString()).collection('chats').doc(props.chatUserId.toString()).collection('received_messages').onSnapshot((snapshot)=>{
            setReceivedMsgs([])
            const receivedMsgs = [];
            snapshot.docs.forEach((doc)=>{
                receivedMsgs.push(doc.data())            
            })
            setReceivedMsgs(receivedMsgs);
        }
        );
    },[]);

    console.log('====================================');
    console.log(sentMsgs);
    console.log('====================================');


    return (
            <FlatList
            inverted = {true}
          data={sentMsgs}
          renderItem={({ item }) => {
            return (
                <Text style={{
                    fontWeight: "500", 
                    fontSize:16, 
                    backgroundColor:"#90CFF8", 
                    alignSelf:"flex-end",
                    padding:12,
                    marginVertical:4,
                }}>{item.content} </Text>
            )
          }}
        />
      );
}

export function ChatScreen(){
    const navigation = useNavigation()
    const route = useRoute()
    const [msg, setMsg] = useState("")

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{marginHorizontal:12, flex:1}}>
            {/* header */}
                <View style={{flexDirection: "row", borderBottomWidth: 3, paddingBottom: 6}}>
                    <View style={{flex:1}}>
                        <Text style={{
                            fontSize:28,
                            fontWeight:"400"
                        }}>{route.params.chatUserName}</Text>
                        <Text>{route.params.chatUserEmail}</Text>
                    </View>
                    <View style={{justifyContent:"center", marginRight:6}}>
                        <Button title="Back" onPress={()=>{navigation.goBack()}}/>
                    </View>
                </View>
            {/* body */}
            
            {/* chats list */}
            <View style={{flex:1, justifyContent:"center"}}>
                <Messages 
                    userId={route.params.userId}
                    chatUserId={route.params.chatUserId}/>
            </View>
                {/* send msg area */}
                <View style={{borderTopWidth:3, flexDirection:"row", paddingTop: 8}}>
                <TextInput
                    style={{fontSize:18, flex:1}}
                    placeholder="Please enter message"
                    onChangeText={(text) => {setMsg(text)}}
                    defaultValue={msg}
                    />
                    <Button title="Send" onPress={()=>{
                        msgCount = msgCount + 1;
                        const params = route.params;
                        sendMsg(params.userId, params.userName, params.userEmail, params.chatUserId, params.chatUserName, params.chatUserEmail, msgCount, msg);
                        setMsg("")
                    }}/>
                </View>

            </View>
        </SafeAreaView>
    );
}