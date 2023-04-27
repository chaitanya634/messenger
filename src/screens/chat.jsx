import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, ActivityIndicator, TouchableOpacity, FlatList, TextInput } from "react-native";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { addMsgInSentMsgs, sendMsg } from "../firestore_functions";

function Messages(props) {
    const [loading, setLoading] = useState(true); 
    const [users, setUsers] = useState([]);

    const [sentMsgs, setSentMsgs] = useState([]);
    const [receivedMsgs, setReceivedMsgs] = useState([]);

    useEffect(()=>{
        firestore().collection('users').doc(props.userId.toString()).collection('chats').doc(props.chatUserId.toString()).collection('sent_messages').onSnapshot((snapshot)=>{
            const tempSentMsgs = [];
            snapshot.docs.forEach((doc)=>{
                sentMsgs.push(doc.data())
            })
            setSentMsgs(tempSentMsgs)
        }
        );

        // firestore().collection('users').doc(props.userId.toString()).collection('chats').doc(props.chatUserId.toString()).collection('sent_messages').onSnapshot((snapshot)=>{
        //     snapshot.docs.forEach((doc)=>{
        //         console.log('==================###==================');
        //         console.log(doc.data());
        //         console.log('====================================');
        //     })
        // })
    },[]);
    
    // useEffect(() => {
    //     return firestore()
    //       .collection('users')
    //       .onSnapshot(querySnapshot => {
    //         const users = [];
    //         querySnapshot.docs.forEach((doc)=>{
    //             users.push(doc.data())            
    //         })
    //         setUsers(users);
    //         setLoading(false);
    //       });
    //   }, []);
    // if (loading) {
    //   return <ActivityIndicator />;
    // }
    //Uncomment this
    return (
            <FlatList
          data={sentMsgs}
          renderItem={({ item }) => {
            return (
              <View style={{ height: 52 , justifyContent: 'center', borderBottomWidth: 1 }}>
               
                  <Text style={{fontWeight: "500", fontSize:16}}>{item.name} </Text>
                  <Text style={{fontSize: 12}}>{item.email}</Text>
                
              </View>
            )
          }}
        />
      );
}

export function ChatScreen(){
    const navigation = useNavigation()
    const route = useRoute()
    const [msg, setMsg] = useState("")
    let msgCount = 0;

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
                        msgCount++;
                        const params = route.params;
                        sendMsg(params.userId, params.userName, params.userEmail, params.chatUserId, params.chatUserName, params.chatUserEmail, msgCount, msg);
                        setMsg("")
                    }}/>
                </View>

            </View>
        </SafeAreaView>
    );
}