import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { View, Text, SafeAreaView, ActivityIndicator, FlatList, TouchableOpacity, Button } from "react-native"
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ScreenParams, StackParams } from '../../../App'
import CustomButton from '../components/CustomButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomHeader from '../components/header';
import OutlinedButton from '../components/OutlinedBtn';

/*
type ListItemType = {
    chatUserId: string,
    chatUserName: string,
    chatUserEmail: string
}

function Users(props: any) {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .onSnapshot(querySnapshot => {
                const users: any = [];
                querySnapshot.docs.forEach((doc) => {
                    if (doc.id != props.userId) {
                        users.push({
                            chatUserId: doc.id,
                            chatUserName: doc.data().userName,
                            chatUserEmail: doc.data().userEmail
                        })
                    }
                })
                setUsers(users);
                setLoading(false);
            });
        return () => subscriber();
    }, []);
    if (loading) {
        return <ActivityIndicator />;
    }
    
    return (
        <FlatList
            data={users}
            keyExtractor={(item: ListItemType) => item.chatUserEmail}
            renderItem={({ item }) => (
                <View style={{
                    paddingVertical: 6,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    borderBottomWidth: 1
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Chat',{
                        userId: props.userId,
                        userName: props.userName,
                        userEmail: props.userEmail,
                        chatUserId: item.chatUserId,
                        chatUserName: item.chatUserName,
                        chatUserEmail: item.chatUserEmail
                    })} >
                        <Text style={{ fontSize: 18, color: "#611313" }} >{item.chatUserName}</Text>
                        <Text style={{ color: "#611313" }} >{item.chatUserEmail}</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    );
}
*/
function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const route = useRoute<RouteProp<ScreenParams, 'Home'>>()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ margin: 12, flex: 1}}>
                <CustomHeader 
                    title={route.params.firstName+" "+route.params.lastName}
                    subtitle={route.params.userName}
                    action={{text:"Logout",onPress: () => navigation.goBack()}}
                />

                <View style={{flexDirection:'row', alignSelf:'center', marginTop: 8, marginBottom:4 }} >
                    <OutlinedButton 
                        text='Requests'
                        onTap={()=>{}}
                    />
                    <OutlinedButton 
                        text='New Group'
                        onTap={()=>{}}
                    />
                    <OutlinedButton 
                        text='New Message'
                        onTap={()=>{
                            navigation.navigate("NewMsg",{
                                myId: route.params.userId,
                                myFirstName: route.params.firstName
                            })
                        }}
                    />
                </View>

                {/* body */}
                <View style={{marginBottom: 8}}>
                    <Text style={{ 
                            color:"#7C7C7C",
                            fontSize: 18, 
                            fontWeight: "bold"
                        }}>
                            My Chats
                    </Text>
                </View>

                {/* chats list */}
                {/* <View style={{ flex: 1, justifyContent: "center" }}>
                    <Users
                        userId={route.params.userId}
                        userName={route.params.userName}
                        // userEmail={route.params.userEmail}
                    />
                </View> */}
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen