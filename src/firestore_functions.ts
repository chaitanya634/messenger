import firestore from '@react-native-firebase/firestore';

const users = firestore().collection('users');

export function addUserInUsers(userId: number, userName: string, userEmail: string) {
  users.doc(userId.toString()).set({
    id: userId,
    name: userName,
    email: userEmail
  })
}

export function addChatInChatsOfUser(userId:number, chatUserId: number, chatUserName: string, chatUserEmail: string){
    users.doc(userId.toString()).collection("chats").doc(chatUserId.toString()).set({
    chat_user_id: chatUserId,
    name: chatUserName,
    email:chatUserEmail
  })
}

export function sendMsg(userId: number, userName:string, userEmail:string, chatUserId: number, chatUserName:string, chatUserEmail:string, msgOrderId: number, msgContent: string){
  //sender
  addChatInChatsOfUser(userId,chatUserId,chatUserName,chatUserEmail)

    users.doc(userId.toString()).collection('chats')
  .doc(chatUserId.toString()).collection('sent_messages')
  .doc(msgOrderId.toString()).set({
    content: msgContent,
    date_time: firestore.FieldValue.serverTimestamp(),
    order_id: msgOrderId
  });

  //add to receiver
  addChatInChatsOfUser(chatUserId,userId,userName, userEmail)
  users.doc(chatUserId.toString()).collection('chats')
  .doc(userId.toString()).collection('received_messages')
  .doc(msgOrderId.toString()).set({
    content: msgContent,
    date_time: firestore.FieldValue.serverTimestamp(),
    order_id: msgOrderId
  });
}