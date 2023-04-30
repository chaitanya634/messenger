import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { View, Text, SafeAreaView, Button, ActivityIndicator, FlatList, TouchableOpacity } from "react-native"
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ScreenParams } from '../../App';



export function HomeScreen(){
    const navigation = useNavigation()
    const route = useRoute<RouteProp<ScreenParams,'Home'>>()    

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{margin:12, flex:1}}>
            {/* header */}
                <View style={{flexDirection: "row"}}>
                    <View style={{flex:1}}>
                        <Text style={{
                            fontSize:28,
                            fontWeight:"400"
                        }}>{route.params?.userName}</Text>
                        {/* <Text>{route.params.user_email}</Text> */}
                    </View>
                    <View style={{justifyContent:"center", marginRight:6}}>
                        <Button title="Log out" onPress={()=>{navigation.goBack()}}/>
                    </View>
                </View>
            {/* body */}
            <Text style={{marginTop:12, marginBottom:8,fontSize:18, fontWeight:"bold"}}>My Chats</Text>
            
            {/* chats list */}
            <View style={{flex:1, justifyContent:"center"}}>
                {/* <Users userId={route.params.user_id} userName={route.params.user_name} userEmail={route.params.user_email}/> */}
            </View>
            </View>
        </SafeAreaView>
    );
}
