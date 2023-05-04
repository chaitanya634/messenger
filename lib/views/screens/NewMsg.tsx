import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { firebase } from '@react-native-firebase/firestore';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { ScreenParams, StackParams } from '../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
        const subscriber = firebase.firestore()
            .collection('users')
            .onSnapshot(querySnapshot => {
                const users: any = [];
                querySnapshot.docs.forEach((doc) => {
                    if (doc.id != props.userId) {
                        users.push({
                            chatUserId: doc.id,
                            // chatUserName: doc.data().userName,
                            // chatUserEmail: doc.data().userEmail
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
                    
                        <Text style={{ fontSize: 18, color: "#611313" }} >{item.chatUserName}</Text>
                        <Text style={{ color: "#611313" }} >{item.chatUserEmail}</Text>
                    
                </View>
            )}
        />
    );
}

const NewMsg = () => {

    const route = useRoute<RouteProp<ScreenParams, 'NewMsg'>>()

    return (
        <SafeAreaView>
            <Text style={{ color: 'black' }}>
                New Msg
            </Text>
            <View style={{ flex: 1, justifyContent: "center" }}>
                    <Users
                        userId={route.params.userId}
                    />
            </View>
        </SafeAreaView>
    )
}

export default NewMsg