import { ActivityIndicator, GestureResponderEvent, Text, TextInput, View } from "react-native"
import CustomButton from "./CustomButton";

type Props = {
    isLoading: boolean,
    isBlocked: boolean,
    blockedMsg: string,
    showUnblockBtn: boolean,
    onUnblockBtnPressed: (event: GestureResponderEvent) => void,
    footer: {
        defaultMsg: string
        onMsgTyped: ((text: string) => void)
        onSendBtnPressed: (event: GestureResponderEvent) => void
    },
    chatDialog: {
        showDialog: boolean,
        dialogMsg: string,
        onBlockBtnPressed: (event: GestureResponderEvent) => void,
        onDeleteBtnPressed: (event: GestureResponderEvent) => void,
        onAcceptBtnPressed: (event: GestureResponderEvent) => void,
    }
};

const ChatFooter = (props: Props) => {
    if (props.isLoading) {
        return <ActivityIndicator />
    }
    if (props.isBlocked) {
        return <Text style={{
            fontWeight: "bold",
            color: 'black',
            textAlign: "center",
            fontSize: 18
        }}>
            {props.blockedMsg}
        </Text>
    }
    if (props.showUnblockBtn) {
        return (
            <View>
                <Text style={{
                    fontWeight: "bold",
                    color: 'black',
                    textAlign: "center",
                    fontSize: 18,
                    marginBottom: 8,
                }}>
                    You have blocked this chat
                </Text>
                <CustomButton 
                    text="Unblock" 
                    onTap={props.onUnblockBtnPressed} 
                />
            </View>
        )
    }
    if (props.chatDialog.showDialog) {
        return (
            <View style={{ borderWidth: 1, padding: 6, borderRadius: 12 }}>
                <Text
                    style={{
                        alignSelf: "center",
                        textAlign: "center",
                        fontWeight: "bold",
                        color: 'black',
                        fontSize: 18,
                        paddingBottom: 12
                    }}>
                    {props.chatDialog.dialogMsg}
                </Text>
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <CustomButton text="Block" onTap={props.chatDialog.onBlockBtnPressed} />
                    <View style={{ marginHorizontal: 8 }} >
                        <CustomButton
                            text="Delete"
                            onTap={props.chatDialog.onDeleteBtnPressed}
                        />
                    </View>
                    <CustomButton text="Accept" onTap={props.chatDialog.onAcceptBtnPressed} />
                </View>
            </View>
        )
    }
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }} >
            <TextInput
                style={{
                    marginRight: 12,
                    fontSize: 18,
                    borderWidth: 2,
                    borderRadius: 12,
                    paddingHorizontal: 13,
                    borderColor: "#525252",
                    color: "#525252",
                    flex: 1,
                    height: 40
                }}
                placeholder="Please enter message"
                placeholderTextColor="#A7A7A7"
                onChangeText={props.footer.onMsgTyped}
                defaultValue={props.footer.defaultMsg}
            />
            <CustomButton
                text="Send"
                onTap={props.footer.onSendBtnPressed}
            />
        </View>
    )
}

export default ChatFooter