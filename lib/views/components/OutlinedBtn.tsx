import { GestureResponderEvent, StyleProp, Text, TextStyle, TouchableOpacity } from "react-native";

type Props = {
    onTap: (event: GestureResponderEvent) => void | null,
    text: string
};

const OutlinedButton = (props: Props) =>
    <TouchableOpacity onPress={props.onTap} >
        <Text style={{ color: "blue", margin: 6, fontSize: 16, borderWidth: 1, paddingHorizontal: 6, 
        paddingVertical: 2,
        borderRadius: 8,
        borderColor:'#AF7AC5'
        }} >
            {props.text}
        </Text>
    </TouchableOpacity>

export default OutlinedButton