import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";

export function ChatScreen(){
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Chat</Text>
        </View>
    );
}