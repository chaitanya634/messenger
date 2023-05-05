import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { firebase } from '@react-native-firebase/firestore';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { ScreenParams, StackParams } from '../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ListItemType = {
    firstName: string,
    lastName: string,
    userName: string,
    id: string
}

const NewMsg = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [users, setUsers] = useState([])
    const route = useRoute<RouteProp<ScreenParams, 'NewMsg'>>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    const [myChatsUsername, setMyChatsUsername] = useState([])

    useEffect(() => {
        firebase.firestore()
            .collection('users').doc(route.params.myId)
            .collection('myChatRooms').get().then((val) => {
                const myChatsUsername: any = [];
                val.docs.forEach((doc) => {
                    myChatsUsername.push(doc.data().chatUserName)
                })
                setMyChatsUsername(myChatsUsername);

                firebase.firestore()
                .collection('users').where('userName','not-in',myChatsUsername)
                .onSnapshot(querySnapshot => {
                    const users: any = [];
                    querySnapshot.docs.forEach((doc) => {
                        const data = doc.data()
                        if (doc.id != route.params.myId) {
                            users.push({
                                firstName: data.firstName,
                                lastName: data.lastName,
                                userName: data.userName,
                                id: doc.id
                            })
                        }
                    })
                    setUsers(users);
                    setIsLoading(false);
                });
            })
    }, []);


    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator />
            </SafeAreaView>
        )
    }

    return (
        <FlatList
            data={users}
            keyExtractor={(item: ListItemType) => item.userName}
            renderItem={({ item }) => (
                <View style={{
                    paddingHorizontal: 4,
                    paddingVertical: 6,
                    borderBottomWidth: 1
                }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Chat', {
                            chatRoomId: null,
                            myId: route.params.myId,
                            myFirstName: route.params.myFirstName,
                            myLastName: route.params.myLastName,
                            myUserName: route.params.myUserName,
                            chatId: item.id,
                            chatFirstName: item.firstName,
                            chatLastName: item.lastName,
                            chatUserName: item.userName
                        })
                    }} >
                        <Text style={{ fontSize: 18, color: "#611313" }} >{item.firstName + " " + item.lastName}</Text>
                        <Text style={{ color: "#611313" }} >{item.userName}</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    )

}

export default NewMsg