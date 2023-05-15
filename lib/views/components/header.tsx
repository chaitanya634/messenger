import { View, Text, SafeAreaView, ActivityIndicator, FlatList, TouchableOpacity, GestureResponderEvent, StyleSheet } from "react-native"
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../../../App";

type HeaderParams = {
    title: string,
    subtitle: string,
    action: {
        text: string,
        onPress: (event: GestureResponderEvent) => void | null,
        isDisabled: boolean
    },
    profile: {
        chatRoomId: string | null
        myId: string,
        myFirstName: string,
        myLastName: string,
        myUserName: string,
        chatId: string | null,
        chatFirstName: string | null,
        chatLastName: string | null,
        chatUserName: string | null,
        isNewChat: boolean,
        showMyProfile: boolean
    }
};


const CustomHeader = (params: HeaderParams) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Profile',{
                        chatRoomId: params.profile.chatRoomId,
                        myId: params.profile.myId,
                        myFirstName: params.profile.myFirstName,
                        myLastName: params.profile.myLastName,
                        myUserName: params.profile.myUserName,
                        chatId: params.profile.chatId,
                        chatFirstName: params.profile.chatFirstName,
                        chatLastName: params.profile.chatLastName,
                        chatUserName: params.profile.chatUserName,
                        isNewChat: params.profile.isNewChat,
                        showMyProfile: params.profile.showMyProfile
                    })
                }} >
                    <Text style={styles.title}>{params.title}</Text>
                    <Text style={styles.subtitle}>{params.subtitle}</Text>
                </TouchableOpacity>
            </View>
            <CustomButton
                text={params.action.text}
                onTap={params.action.onPress}
                isDisabled={params.action.isDisabled}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: "400",
        color: "#940000"
    },
    subtitle: {
        fontSize: 16,
        color: "#940000"
    },
})

export default CustomHeader;