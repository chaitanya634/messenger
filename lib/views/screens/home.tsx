import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import {
    View, Text, SafeAreaView, ActivityIndicator,
    FlatList, TouchableOpacity, Button, AppState, Platform
} from "react-native"
import { FirebaseFirestoreTypes, firebase } from '@react-native-firebase/firestore';
import { ScreenParams, StackParams } from '../../../App'
import CustomButton from '../components/CustomButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomHeader from '../components/header';
import OutlinedButton from '../components/OutlinedBtn';

type ChatItemType = {
    chatRoomId: string,
    chatId: string,
    chatUserName: string,
    chatFirstName: string,
    chatLastName: string,
    myId: string,
    myFirstName: string,
    myLastName: string,
    myUserName: string
}

function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const route = useRoute<RouteProp<ScreenParams, 'Home'>>()

    const [isLoading, setIsLoading] = useState(true)
    const [chats, setChats] = useState([])

    const [isLogoutBtnDisabled, setIsLogoutBtnDisabled] = useState(false)

    useEffect(() => {
        AppState.addEventListener('change', appState => {
            if (appState === 'active') {
                firebase.firestore().collection('activeUsers').add({ userId: route.params.myId })
            }
            else if (appState === 'background' || appState === 'inactive') {
                firebase.firestore().collection('activeUsers')
                    .where('userId', '==', route.params.myId).get()
                    .then((res) => {
                        res.docs.forEach((doc) => {
                            firebase.firestore().collection('activeUsers').doc(doc.id).delete()
                        })
                    })
            }
        })

        firebase.firestore()
            .collection('users').doc(route.params.myId)
            .collection('myChatRooms').onSnapshot(querySnapshot => {
                const chats: any = [];
                querySnapshot.docs.forEach((doc) => {
                    chats.push(doc.data())
                })
                setChats(chats);
                setIsLoading(false);
            });
        return () => {
            firebase.firestore().collection('activeUsers')
                .where('userId', '==', route.params.myId).get()
                .then((res) => {
                    res.docs.forEach((doc) => {
                        firebase.firestore().collection('activeUsers').doc(doc.id).delete()
                    })
                })
        }
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ margin: 12, flex: 1 }}>
                <CustomHeader
                    title={route.params.myFirstName + " " + route.params.myLastName}
                    subtitle={route.params.myUserName}
                    action={{
                        text: "Logout",
                        isDisabled: isLogoutBtnDisabled,
                        onPress: () => {
                            setIsLogoutBtnDisabled(true)
                            // firebase.firestore().collection('activeUsers')
                            // .doc(route.params.activeUsersDocId).delete()
                            // .then((_) => {
                            //     setIsLogoutBtnDisabled(false)
                            //     navigation.goBack()
                            // })
                            firebase.firestore().collection('activeUsers')
                                .where('userId', '==', route.params.myId).get()
                                .then((res) => {
                                    res.docs.forEach((doc) => {
                                        firebase.firestore().collection('activeUsers')
                                            .doc(doc.id).delete()
                                    })
                                }).then((_) => {
                                    setIsLogoutBtnDisabled(false)
                                    navigation.goBack()
                                })
                        }
                    }}
                    profile={{
                        showMyProfile: true,
                        chatRoomId: null,
                        myId: route.params.myId,
                        myFirstName: route.params.myFirstName,
                        myLastName: route.params.myLastName,
                        myUserName: route.params.myUserName,
                        chatId: null,
                        chatFirstName: null,
                        chatLastName: null,
                        chatUserName: null,
                        isNewChat: false,
                    }}
                />

                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 8, marginBottom: 4 }} >

                    <OutlinedButton
                        text='New Message'
                        onTap={() => {
                            navigation.navigate("NewMsg", {
                                myId: route.params.myId,
                                myFirstName: route.params.myFirstName,
                                myLastName: route.params.myLastName,
                                myUserName: route.params.myUserName,
                            })
                        }}
                    />
                </View>

                <View>
                    <Text style={{
                        color: "#7C7C7C",
                        fontSize: 18,
                        fontWeight: "bold"
                    }}>
                        My Chats
                    </Text>
                </View>

                {/* chats list */}
                <View style={{
                    flex: 1,
                    marginVertical: 2,
                    justifyContent: "center"
                }}>
                    {
                        isLoading
                            ?
                            <ActivityIndicator />
                            :
                            <FlatList
                                data={chats}
                                keyExtractor={(item: ChatItemType) => item.chatRoomId}
                                renderItem={({ item }) =>
                                    <View style={{
                                        paddingHorizontal: 4,
                                        paddingVertical: 6,
                                        borderBottomWidth: 1
                                    }}>
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('Chat', {
                                                chatRoomId: item.chatRoomId,
                                                myId: route.params.myId,
                                                myFirstName: route.params.myFirstName,
                                                myLastName: route.params.myLastName,
                                                myUserName: route.params.myUserName,
                                                chatId: item.chatId,
                                                chatFirstName: item.chatFirstName,
                                                chatLastName: item.chatLastName,
                                                chatUserName: item.chatUserName,
                                                isNewChat: false
                                            })
                                        }} >
                                            <Text style={{ fontSize: 18, color: "#611313" }} >{`${item.chatFirstName} ${item.chatLastName}`}</Text>
                                            <Text style={{ color: "#611313" }} >{item.chatUserName}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                    }

                </View>

            </View>
        </SafeAreaView>
    );
}

export default HomeScreen