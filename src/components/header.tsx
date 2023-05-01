import { View, Text, SafeAreaView, ActivityIndicator, FlatList, TouchableOpacity, GestureResponderEvent, StyleSheet } from "react-native"
import CustomButton from "./CustomButton";

type HeaderParams = {
    title: string,
    subtitle: string,
    action: {
        text: string,
        onPress: (event: GestureResponderEvent) => void | null
    }
};

const CustomHeader = (params: HeaderParams) => (
    <View style={{ flexDirection: "row", borderBottomWidth: 1, paddingBottom: 6 }}>
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>{params.title}</Text>
            <Text style={styles.subtitle}>{params.subtitle}</Text>
        </View>
        <View style={styles.buttonArea}>
            <CustomButton
                text={params.action.text}
                onTap={params.action.onPress}
            />
        </View>
    </View>
)

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "400",
        color: "#940000"
    },
    subtitle: {
        fontSize: 16,
        color: "#940000"
    },
    buttonArea: {
        justifyContent: "center", marginRight: 6
    }
})

export default CustomHeader;