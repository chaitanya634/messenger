import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { View, Text, SafeAreaView, ActivityIndicator, FlatList, TouchableOpacity, Button } from "react-native"
import { FirebaseFirestoreTypes, firebase } from '@react-native-firebase/firestore';
import { ScreenParams, StackParams } from '../../../App'
import CustomButton from '../components/CustomButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomHeader from '../components/header';
import OutlinedButton from '../components/OutlinedBtn';

type ChatItemType = {
    id: string, 
    title: string,
    subtitle: string
}

function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const route = useRoute<RouteProp<ScreenParams, 'Home'>>()

    const [isLoading, setIsLoading] = useState(true)
    const [chats, setChats] = useState([])

    useEffect(() => {
        firebase.firestore()
            .collection('users').doc(route.params.userId)
            .collection('myChatRooms').onSnapshot(querySnapshot => {
                const chats: any = [];
                querySnapshot.docs.forEach((doc) => {
                    chats.push(doc.data())
                })
                setChats(chats);
                setIsLoading(false);
            });
    }, []);

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

                <View>
                    <Text style={{ 
                            color:"#7C7C7C",
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
                            <ActivityIndicator/>
                        :
                        <FlatList
                            data={chats}
                            keyExtractor={(item: ChatItemType) => item.id}
                            renderItem={({ item }) => 
                                <View style={{
                                    paddingHorizontal: 4,
                                    paddingVertical: 6,
                                    borderBottomWidth: 1
                                }}>
                                    <TouchableOpacity onPress={() => {}} >
                                        <Text style={{ fontSize: 18, color: "#611313" }} >{item.title}</Text>
                                        <Text style={{ color: "#611313" }} >{item.subtitle}</Text>
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