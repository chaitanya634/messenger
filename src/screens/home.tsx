import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";

export function HomeScreen(){
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home</Text>
        </View>
    );
}