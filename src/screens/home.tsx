import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { View, Text, SafeAreaView, Button, ActivityIndicator, FlatList, TouchableOpacity } from "react-native"
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ScreenParams } from '../../App';
import CustomButton from '../components/CustomButton';


type ListItemType = {
    userName: string,
    userEmail: string
}

function Users(props: any) {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .onSnapshot(querySnapshot => {
                const users: any = [];
                querySnapshot.docs.forEach((doc) => {
                    if (doc.id != props.userId) {
                        users.push(doc.data())
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
            keyExtractor={(item: ListItemType) => item.userEmail}
            renderItem={({ item }) => (
                <View style={{
                    paddingVertical: 6,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    borderBottomWidth: 1
                }}>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 18, color: "#611313"}} >{item.userName}</Text>
                        <Text style={{color: "#611313"}} >{item.userEmail}</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    );
}


export function HomeScreen() {
    const navigation = useNavigation()
    const route = useRoute<RouteProp<ScreenParams, 'Home'>>()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ margin: 12, flex: 1 }}>
                {/* header */}
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{
                            fontSize: 28,
                            fontWeight: "400",
                            color: "#940000"
                        }}>{route.params?.userName}</Text>
                        <Text style={{
                            fontSize: 16,
                            color: "#940000"
                        }}>{route.params.userEmail}</Text>
                    </View>
                    <View style={{ justifyContent: "center", marginRight: 6 }}>
                        <CustomButton
                            text='Logout'
                            onTap={() => navigation.goBack()}
                        />
                    </View>
                </View>

                {/* body */}
                <Text style={{ marginTop: 12, marginBottom: 8, fontSize: 18, fontWeight: "bold" }}>My Chats</Text>

                {/* chats list */}
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Users
                        userId={route.params.userId}
                        // userName={route.params.userName}
                        // userEmail={route.params.userEmail}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
