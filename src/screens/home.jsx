import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from "@react-navigation/native"
import { View, Text, SafeAreaView, Button, ActivityIndicator, FlatList, TouchableOpacity } from "react-native"
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

function Users(props) {
    const [loading, setLoading] = useState(true); 
    const [users, setUsers] = useState([]);

    const navigation = useNavigation()
    
    // useEffect(() => {
    //     const subscriber = firestore()
    //       .collection('users')
    //       .onSnapshot(querySnapshot => {
    //         const users = [];
    //         querySnapshot.docs.forEach((doc)=>{
    //           if(doc.data().id != props.userId) {
    //             users.push(doc.data())
    //           }
    //         })
    //         setUsers(users);
    //         setLoading(false);
    //       });
    //     return () => subscriber();
    //   }, []);
    // if (loading) {
    //   return <ActivityIndicator />;
    // }
    return (
        <FlatList
          data={[]}
          renderItem={({ item }) => {
            return (
              <View style={{ height: 52 , justifyContent: 'center', borderBottomWidth: 1 }}>
                <TouchableOpacity onPress={()=>{
                  navigation.navigate('Chat', {
                    userName:props.userName,
                    userEmail:props.userEmail,
                    chatUserId: item.id,
                    chatUserName: item.name,
                    chatUserEmail: item.email
                  })
                }}>
                  <Text style={{fontWeight: "500", fontSize:16}}>{item.name} </Text>
                  <Text style={{fontSize: 12}}>{item.email}</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        />
      );
}

export function HomeScreen(){
    const navigation = useNavigation()
    const route = useRoute()
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{marginHorizontal:12, flex:1}}>
            {/* header */}
                <View style={{flexDirection: "row"}}>
                    <View style={{flex:1}}>
                        <Text style={{
                            fontSize:28,
                            fontWeight:"400"
                        }}>{route.params.user_name}</Text>
                        <Text>{route.params.user_email}</Text>
                    </View>
                    <View style={{justifyContent:"center", marginRight:6}}>
                        <Button title="Log out" onPress={()=>{navigation.goBack()}}/>
                    </View>
                </View>
            {/* body */}
            <Text style={{marginTop:12, marginBottom:8,fontSize:18, fontWeight:"bold"}}>My Chats</Text>
            
            {/* chats list */}
            <View style={{flex:1, justifyContent:"center"}}>
                <Users userId={route.params.user_id} userName={route.params.user_name} userEmail={route.params.user_email}/>
            </View>
            </View>
        </SafeAreaView>
    );
}
