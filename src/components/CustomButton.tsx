import {
    TouchableOpacity,
    Text,
    View,
    GestureResponderEvent,
    StyleProp,
    TextStyle,
    ActivityIndicator
} from "react-native"

type Props = {
    onTap: (event: GestureResponderEvent) => void | null,
    style?: StyleProp<TextStyle>
    text: string
    isDisabled?: boolean
};

const CustomButton = (props: Props) => (
    <TouchableOpacity
        onPress={
            (props.isDisabled == null || props.isDisabled == false)
                ? props.onTap
                : () => { }
        }
        activeOpacity={
            (props.isDisabled == null || props.isDisabled == false)
                ? 0.6
                : 1
        }>
        <View style={
            (props.isDisabled == null || props.isDisabled == false)
                ? defaultEnableStyle
                : defaultDisableStyle
        } >
            {
                (props.isDisabled == null || props.isDisabled == false)
                ? <Text style={{
                    color: "#ffffff",
                    fontSize: 18
                }} >
                    {props.text}
                </Text>
                : <ActivityIndicator />
            }
        </View>
    </TouchableOpacity>
)


const defaultEnableStyle: StyleProp<TextStyle> = {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: "center",
    backgroundColor: "#525252",
}

const defaultDisableStyle: StyleProp<TextStyle> = {
    ...defaultEnableStyle,
    opacity: 0.6
}


export default CustomButton